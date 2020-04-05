import { StyleSheet } from 'react-native'

import { Constants, Colors, Utils } from '@common'

const { width, height } = Constants

const styles = (props) => StyleSheet.create({
  icon_bell: {
    color: Colors.White,
  },
  touchable_notif: {
    alignItems: 'center',
    flexDirection: 'row',
    height: width * 0.1,
    justifyContent: 'center',
    marginRight: width * 0.03,
    width: width * 0.1,
  },
  txt_notif_count: {
    color: Colors.Red,
    fontSize: Utils.scaledSize(12),
    fontWeight: '700',
  },
  view_notif_count: {
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderRadius: 10,
    bottom: width * 0.045,
    height: width * 0.055,
    justifyContent: 'center',
    position: 'absolute',
    right: width * -0.01,
    width: width * 0.055,
  },
})

export default styles
