import {IconApp} from '@assets/icons';
import {getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {TabBar} from '@components';
import {UserInfo} from '@model/user';
import {goBack, openDrawer} from '@navigation/navigationService';
import {ProfileScreenRouteProp} from '@navigation/routes';
import {UserState} from '@redux/slices/userSlice';
import {IRootState} from '@redux/stores';
import {uStateUser} from '@redux/stores/selection';
import {FetchInfoUser} from '@services/user.service';
import {useQuery} from '@tanstack/react-query';
import Color from '@theme/Color';
import {AxiosResponse} from 'axios';
import {FC, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {TabBarProps, Tabs} from 'react-native-collapsible-tab-view';
import {TabName} from 'react-native-collapsible-tab-view/lib/typescript/src/types';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import AboutTab from './AboutTab';
import EventTab from './EventTab';
import InfoUser from './components/InfoUser';
import TabBarCustom from './components/TabBarCustom';

interface IProps {
  route: ProfileScreenRouteProp;
}

const ProfileScreen: FC<IProps> = ({route: {params}}) => {
  const {top} = useSafeAreaInsets();
  const infoUser = useSelector<IRootState, UserState>(uStateUser);
  const idUser = params?.id || infoUser.id;
  const isMe = !params?.id || params.id === infoUser.id;

  const {data, refetch} = useQuery<AxiosResponse<UserInfo>, Error>({
    queryKey: ['fetchInfoUser', {idUser}],
    queryFn: () => FetchInfoUser(idUser),
  });

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
  ]);

  const renderTabBar = useCallback((props: TabBarProps<TabName>) => {
    return <TabBarCustom {...props} />;
  }, []);

  return (
    <SafeAreaView style={Styles.container} edges={[]}>
      <TabBar
        title=""
        leftIcon={
          !params?.id ? (
            <IconApp name={'menu'} color={Color.WHITE} size={getSize.m(18)} />
          ) : null
        }
        hideRightIcon
        handleLeftIcon={!params?.id ? openDrawer : goBack}
        styleContainer={StyleSheet.flatten([styles.tabBar, {paddingTop: top}])}
      />
      <Tabs.Container
        headerContainerStyle={styles.headerContainerStyle}
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

const styles = StyleSheet.create({
  tabBar: {
    zIndex: 100,
    backgroundColor: Color.BACKGROUND,
  },
  headerContainerStyle: {
    backgroundColor: Color.BACKGROUND,
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default ProfileScreen;
