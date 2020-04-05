import React from 'react'
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  Analytics, Colors, Images, Constants,
} from '@common'
import { Icon } from 'native-base'
import * as Services from '@services'

// Intro
import Splash from '../Scenes/Splash'

// Header
import NavigationHeader from '../Components/NavigationHeader'

// Tabs: Home
import Home from '../Scenes/Home'
import Notifications from '../Scenes/Notifications'

// Tabs: Downloads
import Downloads from '../Scenes/Downloads'

// Tabs: Support
import Support from '../Scenes/Support'

const { width, height } = Constants

const tabsScreensOptions = {
  headerShown: true,
  headerTintColor: Colors.White,
}

const setScreenOptions = (route) => ({ title: '', header: ({ scene, previous, navigation }) => <NavigationHeader route={route} scene={scene} previous={previous} navigation={navigation} /> })


const Stack = createStackNavigator()
const BottomTabs = createBottomTabNavigator()

const IntroStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} >
    <Stack.Screen component={Splash} name='Splash' options={{}} />
  </Stack.Navigator>
)

const HomeTabStack = () => (
  <Stack.Navigator screenOptions={tabsScreensOptions}>
    <Stack.Screen component={Home} name='Home' options={({ route }) => setScreenOptions(route) } />
    <Stack.Screen component={Notifications} name='Notifications' options={({ route }) => setScreenOptions(route) } />
  </Stack.Navigator>
)

const DownloadsTabStack = () => (
  <Stack.Navigator screenOptions={tabsScreensOptions}>
    <Stack.Screen component={Downloads} name='Downloads' options={({ route }) => setScreenOptions(route) } />
  </Stack.Navigator>
)

const SupportTabStack = () => (
  <Stack.Navigator screenOptions={tabsScreensOptions}>
    <Stack.Screen component={Support} name='Support' options={({ route }) => setScreenOptions(route) } />
  </Stack.Navigator>
)

const MainTabs = () => (
  <BottomTabs.Navigator
    tabBarOptions= {{
      showLabel: true,
      showIcon: true,
      allowFontScaling: false,
      keyboardHidesTabBar: true,
      activeTintColor: Colors.LimeGreen,
      inactiveTintColor: Colors.LightGray,
      activeBackgroundColor: Colors.BackgroundColor,
      inactiveBackgroundColor: Colors.White,
      tabStyle: { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
      style: { backgroundColor: Colors.PrimaryTeal, borderTopLeftRadius: 0, borderTopRightRadius: 0 },
    }}
    backBehavior={'initialRoute'}
  >
    <BottomTabs.Screen
      component={HomeTabStack}
      name='Home'
      options={{ tabBarIcon: ({ focused }) => (<Icon style={{ color: focused ? Colors.LimeGreen : Colors.LightGray }} name='home-outline' type='MaterialCommunityIcons'/>) }} />
    <BottomTabs.Screen
      component={DownloadsTabStack}
      name='Downloads'
      options={{ tabBarIcon: ({ focused }) => (<Icon style={{ color: focused ? Colors.LimeGreen : Colors.LightGray }} name='download' type='MaterialCommunityIcons'/>) }} />
    <BottomTabs.Screen
      component={SupportTabStack}
      name='Support'
      options={{ tabBarIcon: ({ focused }) => (<Icon style={{ color: focused ? Colors.LimeGreen : Colors.LightGray }} name='face-agent' type='MaterialCommunityIcons'/>) }} />
  </BottomTabs.Navigator>
)

const getActiveRouteName = (navigationState) => {
  if (!navigationState) { return null }
  const route = navigationState.routes[navigationState.index]
  // dive into nested navigators
  if (route.routes) { return getActiveRouteName(route) }
  return route.routeName
}
// Analytics.set_screen_name(currentState.routes) }

const reportCurrentScreenToAnalytics = (state, routeNameRef) => {
  const previousRouteName = routeNameRef.current
  const currentRouteName = getActiveRouteName(state)
  if (previousRouteName !== currentRouteName) {
    Analytics.set_screen_name(currentRouteName, currentRouteName)
  }
}

export default () => {
  const routeNameRef = React.useRef()
  return (
  <NavigationContainer ref={Services?.navigationRef} onStateChange={(currentState) => reportCurrentScreenToAnalytics(currentState, routeNameRef)} >
    <Stack.Navigator initialRouteName='Intro' screenOptions={{ headerShown: false }} >
      <Stack.Screen name='Intro' component={IntroStack} options={{}}/>
      <Stack.Screen name='Tabs' component={MainTabs} options={{}}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}
