import React from 'react'
import { StatusBar, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {
  Container, Header, Title, View,
} from 'native-base'
import { NotificationBell } from '@components'
import { Colors, Constants } from '@common'
import reactotron from 'reactotron-react-native'
import styles from './styles'

const NavigationHeader = ({
  route, scene, previous, navigation,
}) => {
  const { options } = scene.descriptor;
  const title = options?.headerTitle || options?.title || scene?.route?.name

  const openNotifications = () => {
    reactotron.log('Openning Notifs: ')
    navigation.navigate(Constants.Scenes.Notifications)
  }

  return (
    <Header style={styles().header_container}>
        <LinearGradient
          style={styles().header_gradient}
          colors={[Colors.PrimaryGradientStart, Colors.PrimaryGradientStop]}
          start={{ x: 0, y: 0.1 }}
          end={{ x: 1, y: 0.1 }}
        >
        <View style={styles().view_header_title}>
          <Title style={styles().txt_header_title} >{title}</Title>
        </View>
        <TouchableOpacity style={styles().touchable_notifications} onPress={openNotifications}>
          <NotificationBell count={route?.params?.unread_notifications_count} />
        </TouchableOpacity>
      </LinearGradient>
      <StatusBar barStyle="light-content" backgroundColor={Colors.PrimaryGradientStart} />
    </Header>
  )
}
export default NavigationHeader
