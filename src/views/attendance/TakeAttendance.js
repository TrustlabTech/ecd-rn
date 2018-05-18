/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

// base libs
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import CheckBox from 'react-native-check-box'
import buffer from 'buffer/'
const Buffer = buffer.Buffer
import {
    View,
    Text,
    Alert,
    Image,
    NetInfo,
    StyleSheet,
    ToastAndroid,
    ActivityIndicator,
    PermissionsAndroid,

} from 'react-native'
// components/views
import List from '../../components/List'
import Button from '../../components/Button'
// libs/functions
import Crypto from '../../libs/Crypto'
import { Request } from '../../libs/network'
// constants
import {
    ICONS,
    COLORS,
} from '../../constants'

import { updateAttendanceTime } from '../../actions'
import Utils from '../../libs/Utils'

class Attendance extends Component {
    constructor(props) {
        super(props)

        this.state = {
            error: '',
            present: {},
            children: [],
            isConnected: false,
            loadingChildren: false,
            submittingAttendance: false,
        }

        this.abort = false

        this.renderItem = this.renderItem.bind(this)
        this.confirmSubmit = this.confirmSubmit.bind(this)
        this.takeAttendance = this.takeAttendance.bind(this)
    }

    componentDidMount() {
        this.getChildren()
        this.verifyLocationPermissions()

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

    handleConnectionInfoChange = (isConnected) => {
        !this.abort && this.setState({
            isConnected,
        })
    }

    async verifyLocationPermissions() {
        try {
            if (!await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    ToastAndroid.show('Attendance feature will not work without access to geolocation services', ToastAndroid.LONG)
                }
            }
        } catch (e) {
            Alert.alert('Error', 'Failed to ask access to gelocation services, attendace feature will not work.')
        }
    }

    getChildren() {
        const { classObj } = this.props
        const children = Utils.getChildrenForClass(classObj.id, this.props)
        try {
            !this.abort && this.setState({ children: children.map(c => ({ ...c, checked: true })) })
        } catch (e) {
            !this.abort && this.setState({ error: e.message })
        }
    }

    toggleChildSelection(item, index) {
        let newState = this.state

        // flatlist need a new object for being able to re-render
        newState.children = [...this.state.children]

        newState.children[index].checked = !this.state.children[index].checked

        this.setState(newState)
    }

    confirmSubmit() {
        const attendanceChildren = this.state.children.filter(e => e.checked)
        const { pupils } = this.props;
        const message = Utils.checkChildrenAttendance(attendanceChildren, pupils);
        if (message) {
            Alert.alert('Duplicate', message)
        } else {
            Alert.alert(
                'Confirmation',
                `Are you sure you want to submit attendance with ${this.state.children.filter(f => !!f.checked).length} of ${this.state.children.length} children present?`,
                [
                    { text: 'Cancel' },
                    { text: 'Proceed', onPress: this.takeAttendance },
                ]
            )
        }
    }

    async takeAttendance() {
        console.log("props session", this.props)
        const { session, classObj } = this.props;

        this.setState({ submittingAttendance: true })

        let location = null
        try {
            location = await Utils.getCurrentPosition(navigator.geolocation)
        } catch (e) {
            this.setState({ submittingAttendance: false }, () => {
                // Alert.alert('Location unavailable', 'Your location could not be determined,\nplease ensure location is enabled.')
            })
            return false
        }

        const attendanceData = this.state.children.map(d => ({
            children_id: d.id, // eslint-disable-line camelcase
            latitude: location.coords.latitude.toString(),
            longitude: location.coords.longitude.toString(),
            attended: d.checked || false
        }))

         // check the net status of the app
         if (!this.state.isConnected) {
            this.setState({ submittingAttendance: false }, () => {
                Alert.alert('Unable to sync', 'your data will be stored and sent to servers when you sync manually via settings', [{ text: 'Ok', onPress: this.props.navigator.pop }])
            })
            this.props.storeAttendanceLocally({
                children: attendanceData,
                centre_class_id: classObj.id, // eslint-disable-line camelcase
            })
            return false
        }

        try {


            await Utils.takeAttendance(session, session.user.centre_id, attendanceData, location)

            this.setState({ submittingAttendance: false }, () => {
                ToastAndroid.show('All verifiable claims have been uploaded', ToastAndroid.LONG)
                this.props.navigator.pop()
                const attendanceChildren = this.state.children.filter(e => e.checked)
                this.props.updateAttendanceTime(attendanceChildren)
                Utils.cancelNotifyAttendance()
            })

        } catch(e) {
            this.setState({ submittingAttendance: false }, () => {
                Alert.alert(e.name, e.message, [{ text: 'Ok', onPress: this.props.navigator.pop }])
                if(e.name === "Unable to sync"){
                    this.props.storeAttendanceLocally({
                        children: attendanceData,
                        centre_class_id: classObj.id, // eslint-disable-line camelcase
                        centre_id: classObj.centre_id, // eslint-disable-line camelcase
                    })
                }
            })
            return false
        }
    }

    renderItem({ item, index }) {
        return (
            <View style={styles.rowContainer}>
                <View>
                    <Text style={styles.rowTextTitle}>{item.given_name} {item.family_name}</Text>
                    <Text style={styles.rowTextDesc}>ID: {item.id_number ? item.id_number : 'N/D'}</Text>
                </View>
                <CheckBox checkBoxColor={COLORS.darkGrey2} isChecked={!!item.checked} onClick={() => this.toggleChildSelection(item, index)} />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container} collapsable={true}>

                <View style={styles.infoContainer} collapsable={true}>
                    <View style={styles.infoInnerContainer} collapsable={true}>
                        <Image source={ICONS.people20} style={[styles.infoIcon, { marginRight: 5 }]} resizeMode={'contain'} />
                        <Text style={styles.infoText}>{this.state.children.length} Children</Text>
                    </View>
                    <View style={styles.infoInnerContainer} collapsable={true}>
                        <Text style={styles.infoText}>{this.state.children.filter(f => !!f.checked).length} Present</Text>
                        <Image source={ICONS.checkBox20} style={[styles.infoIcon, { marginLeft: 5, }]} resizeMode={'contain'} />
                    </View>
                </View>

                <List
                    style={styles.list}
                    data={this.state.children}
                    renderItem={this.renderItem}
                    showsVerticalScrollIndicator={false}
                    /*ListHeaderComponent={<Text style={styles.headerText}>Children</Text>}*/ />

                {
                    this.state.submittingAttendance ? (
                        <ActivityIndicator
                            animating
                            size="large"
                            style={styles.activityIndicator} />
                    ) : (
                        <Button style={styles.button} nativeFeedback={true} onPress={this.confirmSubmit}>
                            <Text style={styles.buttonText}>Take Attendance</Text>
                        </Button>
                    )
                }
            </View>
        )
    }
}

Attendance.propTypes = {
    session: PropTypes.object.isRequired,
    classObj: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    storeAttendanceLocally: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.greyWhite,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoInnerContainer: {
        flex: 0.4,
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoIcon: {
        width: 20,
        height: 20,
    },
    infoText: {
        fontSize: 14,
        fontWeight: '200',
        color: COLORS.grey,
    },
    list: {
        flex: 1,
        padding: 10,
        marginTop: 10,
        borderRadius: 8,
        backgroundColor: COLORS.white,
    },
    /*headerText: {
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'center',
    },*/
    rowContainer: {
        padding: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'space-between',
        borderBottomColor: COLORS.lightGrey,
    },
    rowTextTitle: {
        fontSize: 18,
        fontWeight: '400',
        color: COLORS.darkGrey2,
    },
    rowTextDesc: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: '200',
        color: COLORS.grey,
    },
    rowCheckbox: {
        borderColor: COLORS.lightGrey,
    },
    button: {
        marginTop: 20,
        borderRadius: 8,
        alignSelf: 'center',
        paddingVertical: 8,
        paddingHorizontal: 50,
        backgroundColor: COLORS.brandFirst,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.white,
    },
    activityIndicator: {
        height: 60,
        alignSelf: 'center',
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        updateAttendanceTime: (pupils) => dispatch(updateAttendanceTime(pupils)),
    }
}

const mapStoreToProps = (store) => {
    return {
        pupils: store.pupils
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Attendance)
