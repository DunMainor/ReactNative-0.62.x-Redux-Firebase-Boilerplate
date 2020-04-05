import { StyleSheet } from 'react-native'

import { Constants, Colors, Utils } from '@common'

const { width, height } = Constants

const styles = (props) => StyleSheet.create({
  bg_gradient: {
    flex: 1,
    height,
    paddingTop: height * 0.1,
    width,
  },
  container: {
    backgroundColor: Colors.Transparent,
    flex: 1,
    height,
    justifyContent: 'center',
    width,
  },
  img_splash_logo: {
    alignSelf: 'center',
    width: width * 0.3,
  },
})

export default styles
