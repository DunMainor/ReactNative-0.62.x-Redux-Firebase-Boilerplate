import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, Icon, View } from 'native-base'
import { Constants } from '@common'
import styles from './styles'

const NotificationBell = ({ navigation, count }) => (
  <View style={styles().touchable_notif} >
    <Icon style={styles().icon_bell} name='bell-outline' type='MaterialCommunityIcons'/>
    <View style={styles().view_notif_count} ><Text style={styles().txt_notif_count} >{count}</Text></View>
  </View>
)
export default NotificationBell
