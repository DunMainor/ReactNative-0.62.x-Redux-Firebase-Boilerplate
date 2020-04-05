import { Dimensions } from 'react-native'

const Constants = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  Routes: {
    Intro: 'Intro',
    Tabs: 'Tabs',
  },
  Scenes: {
    Splash: 'Splash',
    Home: 'Home',
    Notifications: 'Notifications',
    Downloads: 'Downloads',
    Support: 'Support',
  },
}
export default Constants
