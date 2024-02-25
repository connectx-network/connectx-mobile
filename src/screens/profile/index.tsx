import Styles from '@base/common/styles';
import {TabBar} from '@components';
import Color from '@theme/Color';
import {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {TabBarProps, Tabs} from 'react-native-collapsible-tab-view';
import {TabName} from 'react-native-collapsible-tab-view/lib/typescript/src/types';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import AboutTab from './AboutTab';
import EventTab from './EventTab';
import ReviewsTab from './ReviewsTab';
import InfoUser from './components/InfoUser';
import TabBarCustom from './components/TabBarCustom';
import {IconApp} from '@assets/icons';
import {getSize} from '@base/common/responsive';
import {goBack, openDrawer} from '@navigation/navigationService';

const ProfileScreen = () => {
  const {top} = useSafeAreaInsets();
  const isMe = true;

  const renderHeader = useCallback(() => {
    return <InfoUser isMe={isMe} />;
  }, []);

  const renderTabBar = useCallback((props: TabBarProps<TabName>) => {
    return <TabBarCustom {...props} />;
  }, []);

  return (
    <SafeAreaView style={Styles.container} edges={[]}>
      <TabBar
        title=""
        leftIcon={
          isMe ? (
            <IconApp name={'menu'} color={Color.WHITE} size={getSize.m(18)} />
          ) : null
        }
        handleLeftIcon={isMe ? openDrawer : goBack}
        styleContainer={StyleSheet.flatten([styles.tabBar, {paddingTop: top}])}
      />
      <Tabs.Container
        headerContainerStyle={styles.headerContainerStyle}
        renderHeader={renderHeader}
        renderTabBar={renderTabBar}>
        <Tabs.Tab name="ABOUT">
          {/*// @ts-ignore */}
          <Tabs.ScrollView>
            <AboutTab isMe={isMe} />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="EVENT">
          <EventTab />
        </Tabs.Tab>
        <Tabs.Tab name="REVIEWS">
          <ReviewsTab />
        </Tabs.Tab>
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
