import { StyleSheet } from 'react-native'

import { Constants, Colors, Utils } from '@common'

const { width, height } = Constants

const styles = (props) => StyleSheet.create({
  container: {
    backgroundColor: Colors.BackgroundColorDark,
    flex: 1,
  },
  content: {
    backgroundColor: Colors.BackgroundColorDark,
    flex: 1,
    paddingVertical: height * 0.02,
  },
  txt_tab_name: {
    alignSelf: 'center',
    color: Colors.LimeGreen,
    fontSize: Utils.scaledSize(17),
  },
})

export default styles
