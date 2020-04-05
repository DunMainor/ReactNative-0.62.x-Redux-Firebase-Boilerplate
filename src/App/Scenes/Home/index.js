import React from 'react'
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import { bindActionCreators } from 'redux'
import * as ActionCreators from '@actions'
import * as ActionTypes from '@actions/ActionTypes'
import { Container, Text, Content } from 'native-base'
import { Colors } from '@common'
import AwesomeAlert from 'react-native-awesome-alerts'
import { CommonActions } from '@react-navigation/native'


import styles from './styles'

class Home extends React.Component {
    state = {
      showAlert: false,
      alert: {
        title: '', message: '', confirmText: 'Close', showLoading: false,
      },
    }

    render = () => {
      const { showAlert, alert } = this.state
      return (
        <Container style={styles().container}>
            <Content contentContainerStyle={styles().content}>
                <Text style={styles().txt_tab_name}>Home</Text>
            </Content>
            <AwesomeAlert
              show={showAlert}
              showProgress={alert.showLoading}
              title={alert.title}
              message={alert.message}
              closeOnTouchOutside
              closeOnHardwareBackPress
              showConfirmButton={!alert.showLoading}
              confirmText={alert.confirmText}
              confirmButtonColor={Colors.LimeGreen}
              onConfirmPressed={this.hideAlert}
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
            />
        </Container>
      )
    }

    hideAlert = () => this.setState({ showAlert: false })

    showAlert = (title, message, confirmText, showLoading, callback) => {
      this.setState({
        showAlert: true,
        alert: {
          title,
          message,
          confirmText,
          showLoading,
        },
      }, () => callback())
    }

    componentDidMount = () => {
      const { navigation, unread_notifications, route } = this.props
      const unread_notifications_count = unread_notifications ? Object.keys(unread_notifications)?.length : 0
      navigation.dispatch(CommonActions.setParams({ unread_notifications_count }))
    }

    componentDidUpdate = (prevProps) => {
      const { navigation, unread_notifications, route } = this.props
      const unread_notifications_count = unread_notifications ? Object.keys(unread_notifications)?.length : 0
      if (unread_notifications_count !== Object.keys(prevProps?.unread_notifications || {})?.length) {
        navigation.dispatch(CommonActions.setParams({ unread_notifications_count }))
      }
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {

    }
}

const mapStateToProps = ({ AuthReducer, FirebaseReducer }) => ({
  // Auth
  auth_type: AuthReducer?.type,
  auth_error: AuthReducer?.error,
  // Firebase
  firebase_type: FirebaseReducer?.type,
  firebase_error: FirebaseReducer?.error,
  unread_notifications: FirebaseReducer?.unread_notifications,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
