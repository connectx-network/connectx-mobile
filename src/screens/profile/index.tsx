import {IconApp} from '@assets/icons';
import {getSize} from '@base/common/responsive';
import {hapticFeedback} from '@base/utils/Utils';
import {TabBar} from '@components';
import {UserInfo} from '@model/user';
import {
  checkCanGoBack,
  goBack,
  openDrawer,
  reset,
} from '@navigation/navigationService';
import {
  DRAWER_STACK,
  LOGIN_SCREEN,
  ProfileScreenRouteProp,
} from '@navigation/routes';
import {UserState} from '@redux/slices/userSlice';
import {IRootState} from '@redux/stores';
import {uStateUser} from '@redux/stores/selection';
import {FetchInfoUser} from '@services/user.service';
import {useQuery} from '@tanstack/react-query';
import {TColors} from '@theme/Theme';
import {useStyle} from '@theme/useStyle';
import {AxiosResponse} from 'axios';
import {FC, useCallback, useState} from 'react';
import {LayoutChangeEvent, StyleSheet} from 'react-native';
import {TabBarProps, Tabs} from 'react-native-collapsible-tab-view';
import {TabName} from 'react-native-collapsible-tab-view/lib/typescript/src/types';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import AboutTab from './AboutTab';
import EventTab from './EventTab';
import ActionRightTabBar from './components/ActionRightTabBar';
import InfoUser from './components/InfoUser';
import TabBarCustom from './components/TabBarCustom';

interface IProps {
  route: ProfileScreenRouteProp;
}

const ProfileScreen: FC<IProps> = ({route: {params}}) => {
  const {top} = useSafeAreaInsets();
  const styles = useStyle(getStyles);
  const [heightHeader, setHeightHeader] = useState<number>(0);
  const infoUser = useSelector<IRootState, UserState>(uStateUser);
  const idUser = params?.id || infoUser.id;
  const isMe = !params?.id || params.id === infoUser.id;

  const {data, refetch} = useQuery<AxiosResponse<UserInfo>, Error>({
    queryKey: ['fetchInfoUser', {idUser}],
    queryFn: () => FetchInfoUser(idUser),
  });

  const onLayoutHeader = useCallback(
    ({nativeEvent: {layout}}: LayoutChangeEvent) => {
      setHeightHeader(layout.height);
    },
    [],
  );

  const renderHeader = useCallback(() => {
    return (
      <InfoUser
        fullName={data?.data?.fullName}
        avatarUrl={data?.data?.avatarUrl}
        isMe={isMe}
        followers={data?.data?.followers}
        following={data?.data?.following}
        refetch={refetch}
        id={params?.id}
        company={data?.data?.company}
        isLogged={infoUser.isLogged}
        onLayoutHeader={onLayoutHeader}
      />
    );
  }, [
    data?.data?.fullName,
    data?.data?.avatarUrl,
    params?.id,
    data?.data?.following,
    data?.data?.followers,
    refetch,
    isMe,
    data?.data?.company,
    infoUser.isLogged,
    onLayoutHeader,
  ]);

  const renderTabBar = useCallback((props: TabBarProps<TabName>) => {
    return <TabBarCustom {...props} />;
  }, []);

  const handleBack = useCallback(() => {
    if (checkCanGoBack()) {
      return goBack();
    }
    reset(infoUser.isLogged ? DRAWER_STACK : LOGIN_SCREEN);
  }, [infoUser.isLogged]);

  const handleDrawer = useCallback(() => {
    openDrawer();
    hapticFeedback();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <TabBar
        title=""
        leftIcon={
          !params?.id ? (
            <IconApp
              name={'menu'}
              {...styles.iconDrawer}
              size={getSize.m(18)}
            />
          ) : null
        }
        customActionRight={() => <ActionRightTabBar />}
        hideRightIcon={!isMe}
        handleLeftIcon={!params?.id ? handleDrawer : handleBack}
        styleContainer={StyleSheet.flatten([styles.tabBar, {paddingTop: top}])}
      />
      <Tabs.Container
        headerContainerStyle={styles.headerContainerStyle}
        allowHeaderOverscroll={true}
        headerHeight={heightHeader + 100}
        renderHeader={renderHeader}
        renderTabBar={renderTabBar}>
        <Tabs.Tab name="ABOUT">
          {/*// @ts-ignore */}
          <Tabs.ScrollView
            keyboardShouldPersistTaps="handled"
            scrollEnabled={!!data}>
            <AboutTab
              isMe={isMe}
              description={data?.data?.description}
              userInterests={data?.data?.userInterests}
              refetch={refetch}
            />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="EVENT">
          <EventTab
            scrollEnabled={!!data}
            userId={data?.data?.id || params?.id}
          />
        </Tabs.Tab>
        {/* <Tabs.Tab name="REVIEWS">
          <ReviewsTab scrollEnabled={!!data} />
        </Tabs.Tab> */}
      </Tabs.Container>
    </SafeAreaView>
  );
};

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    tabBar: {
      zIndex: 100,
      backgroundColor: colors.mainBackground,
    },
    headerContainerStyle: {
      backgroundColor: colors.mainBackground,
      shadowOpacity: 0,
      elevation: 0,
    },
    iconDrawer: {
      color: colors.mainForeground,
    },
  });

export default ProfileScreen;
