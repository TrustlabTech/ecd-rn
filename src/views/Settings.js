/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

// base libs
import codePush from 'react-native-code-push'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import buffer from 'buffer/'
const Buffer = buffer.Buffer
import {
    View,
    Text,
    Image,
    Alert,
    NetInfo,
    StyleSheet,
    AsyncStorage,
    ToastAndroid,
} from 'react-native'
// components/views
import Button from '../components/Button'
// redux actions
import { setSession, removeAttendancesLocally, storeClasses, storePupils, removeNotifications } from '../actions'
// libs/functions
import Crypto from '../libs/Crypto'
import { Request } from '../libs/network'
// constants
import {
    ICONS,
    COLORS,
    API_HOST,
    AS_USERNAME,
    APP_VERSION,
    BUNDLE_VERSION,
    SUBMIT_ATTENDANCE,
    SUBMIT_ATTENDANCE_CLAIMS,
} from '../constants'
import { SID_LOGIN } from '../screens'
import Utils from '../libs/Utils'

class Settings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isConnected: false,
            submittingAttendance: false
        }

        this.abort = false

        this.onSyncPress = this.onSyncPress.bind(this)
        this.onLogoutPress = this.onLogoutPress.bind(this)
        this.onUpdatePress = this.onUpdatePress.bind(this)
        this.takeAttendance = this.takeAttendance.bind(this)
        this.takeAttendances = this.takeAttendances.bind(this)

    }

    componentDidMount() {
        // this.verifyLocationPermissions()

        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleConnectionInfoChange
        )

        NetInfo.isConnected.fetch().done(
            (isConnected) => { !this.abort && this.setState({ isConnected }) }
        )

    }

    componentWillUnmount() {
        this.abort = true
        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            this.handleConnectionInfoChange
        )

    }

    async onLogoutPress() {
        const username = await AsyncStorage.getItem(AS_USERNAME)
        this.props.navigator.showModal({
            title: 'Login',
            screen: SID_LOGIN,
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true,
            },
            passProps: {
                username: username || ''
            },
            overrideBackPress: true,
        })
        this.props.setSession()

        setTimeout(() => {
            this.props.navigator.switchToTab({ tabIndex: 0 })
        }, 500)
    }

    handleConnectionInfoChange = (isConnected) => {
        !this.abort && this.setState({
            isConnected,
        })
    }

    onSyncPress() {
        Alert.alert(
            'Confirmation',
            'Are you sure to sync the attendances data?',
            [
                { text: 'Cancel' },
                { text: 'Proceed', onPress: this.takeAttendances },
            ]
        )
    }

    onUpdatePress() {
        Utils.checkForUpdate()
    }

    async takeAttendances() {

        // check the net status of the app
        if (!this.state.isConnected) {
            this.setState({ submittingAttendance: false }, () => {
                Alert.alert('Device Offline', 'Please, find a network conncection to send data to our systems.', [{ text: 'Ok', onPress: this.props.navigator.pop }])
            })
            return false
        }
        
        Utils.getClasses(this.props)
        Utils.getChildren(this.props)

        const promises = this.props.attendances.map(attendance => {
            return new Promise((resolve, reject) =>
                resolve(this.takeAttendance(attendance))
                    .catch(e => reject(e)))
        })

        let res = []
        try {
            res = await Promise.all(promises)
        } catch (e) {
            console.log(e)
        }

        // check if a takeAttendance is unsuccessful
        let check = true
        res.forEach(v => {
            if (!v) {
                check = false
            }
        })

        check && this.props.removeAttendancesLocally()

        Utils.removeSyncNotification(this.props)
        Alert.alert('Success', 'Attendances successfully synced with server', [{ text: 'Ok', onPress: this.props.navigator.pop }])

    }

    async takeAttendance(attendance) {
        let location = null
        try {
            location = await Utils.getCurrentPosition(navigator.geolocation)
        } catch (e) {
            this.setState({ submittingAttendance: false })
            return false
        }

        try {
            const { session } = this.props;

            await Utils.takeAttendence(session, null, attendance, location, true)

            this.setState({ submittingAttendance: false }, () => {
                ToastAndroid.show('All verifiable claims have been uploaded', ToastAndroid.LONG)
                // this.props.navigator.pop()
                // const attendanceChildren = this.state.children.filter(e => e.checked)

                // console.log('attendanceChildren', attendanceChildren)                
                // this.props.updateAttendanceTime(attendanceChildren)
                Utils.cancelNotifyAttendance()
            })
            

        } catch(e) {
            this.setState({ submittingAttendance: false }, () => {
                Alert.alert('Error', e.message, [{ text: 'Ok', onPress: this.props.navigator.pop }])
            })
        }

        return true
    }

    render() {
        return (
            <View style={styles.container}>
                {/* Logout */}
                <Button style={styles.button} nativeFeedback={true} onPress={this.onLogoutPress}>
                    <Text style={styles.buttonTextTitle}>Logout</Text>
                    <Image source={ICONS.exitToApp12} style={styles.rowImage} />
                </Button>
                <Button style={styles.button} nativeFeedback={true} onPress={this.onSyncPress}>
                    <Text style={styles.buttonTextTitle}>Sync</Text>
                    <Image source={ICONS.sync12} style={styles.rowImage} />
                </Button>
                <Button style={styles.button} nativeFeedback={true} onPress={this.onUpdatePress}>
                    <Text style={styles.buttonTextTitle}>Check for updates</Text>
                    <Image source={ICONS.sync12} style={styles.rowImage} />
                </Button>
                <View style={styles.appInfoContainer}>
                    <Text style={styles.appInfoText}>{APP_VERSION} ({BUNDLE_VERSION})</Text>
                    <Text style={styles.appInfoText}>{API_HOST}</Text>
                </View>
            </View>
        )
    }
}
Settings.propTypes = {
    session: PropTypes.object.isRequired,
    setSession: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
    removeAttendancesLocally: PropTypes.func.isRequired,
    removeNotifications: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.greyWhite,
    },
    button: {
        padding: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'space-between',
        borderBottomColor: COLORS.lightGrey,
    },
    buttonTextTitle: {
        fontSize: 18,
        fontWeight: '400',
        color: COLORS.darkGrey2,
    },
    rowImage: {
        width: 12,
        height: 12,
    },
    appInfoContainer: {
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        justifyContent: 'space-between',
    },
    appInfoText: {
        fontSize: 12,
        fontWeight: '300',
        color: COLORS.grey,
    },
})

const mapDispatchToProps = (dispatch) => ({
    setSession: () => dispatch(setSession()),
    removeAttendancesLocally: () => dispatch(removeAttendancesLocally()),
    storeClasses: (classes) => dispatch(storeClasses(classes)),
    storePupils: (pupils) => dispatch(storePupils(pupils)),
    removeNotifications: () => dispatch(removeNotifications()),
})

const mapStoreToProps = (store) => {
    return {
        session: store.session,
        attendances: store.offline.attendances
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Settings)
