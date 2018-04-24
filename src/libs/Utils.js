/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Zayin Krige <zayin@krige.org>
 */

'use-strict'
import { Alert } from 'react-native'
import { GET_CLASSES, GET_CHILDREN, GET_CHILDREN_FOR_CENTER } from '../constants'
import { Request } from '../libs/network'
import CodePush from 'react-native-code-push'
import PushNotification from 'react-native-push-notification'
let jwtDecode = require('jwt-decode')

const KEY_NOTIFICATION_ATTENDENCE = '0'

export default class Utils {

    static async checkForUpdate() {
        CodePush.sync({
            updateDialog: true,
            installMode: CodePush.InstallMode.ON_NEXT_RESTART
        },(status) => {
            if (status === CodePush.SyncStatus.UPDATE_INSTALLED) {
                Alert.alert('Success', 'Update installed, please restart app')
            }
        })

    }

    static getClasses = async (props) => {
        const { session } = props
        if (!session.token || !session.user) {
            return []
        }
        try {
            const
                { url, options } = GET_CLASSES(session.token, session.user.id),
                request = new Request()

            const classes = await request.fetch(url, options)
            props.storeClasses(classes)
            return classes
        } catch (error) {
            console.log('getClasses Error:', error)
            return error
        }
    }

    static getChildren = async (props) => {
        const { session } = props
        if (!session.token || !session.user) {
            return []
        }

        const
            { url, options } = GET_CHILDREN_FOR_CENTER(session.token, session.user.centre_id),
            request = new Request()

        const pupils = await request.fetch(url, options)
        props.storePupils(pupils)
        return pupils
    }

    static getChildrenForClass(classid, props) {
        let children = props.pupils
        children = children.filter((child) => {
            return child.centre_class_id == classid
        })
        return children
    }

    static checkChildrenAttendance(attendanceChild, pupils) {
        let message
        attendanceChild.forEach(element => {
            const user = pupils.find(e => e.id === element.id)
            if (user && user.attendanceTime) {
                const currentTime = new Date()
                const date = new Date(user.attendanceTime)
                if (currentTime.toDateString() === date.toDateString()) {
                    message = 'Child already attended this class today'
                }
            }
        })
        return message
    }

    static async getCurrentPosition() {
        const options = {
            enableHighAccuracy: false,
            timeout: 1000 * 10, //wait 10s to get location
            maximumAge: 1000 * 60 * 10 //10 minutes old
        }
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, options)
        }).then(resp => {
            console.log('getCurrentPosition', resp)
            return resp
        }).catch(error => {
            console.log('getCurrentPosition error', error)
            Alert.alert('Location unavailable', error.message || 'Your location could not be determined,\nplease ensure location is enabled.')
            return Promise.reject(error)
        })
    }

    static hasTokenExpired = (token) => {
        let decoded = jwtDecode(token)
        let { exp } = decoded
        let d = new Date().getTime() / 1000
        return d > exp
    }

    static getDateNotification(day) {
        const time = {
            hours: 10,
            minutes: 30,
            seconds: 0
        }
        let dtAlarm = new Date()
        dtAlarm.setHours(time.hours)
        dtAlarm.setMinutes(time.minutes)
        dtAlarm.setSeconds(time.seconds)
        if (day > 0) {
            dtAlarm.setDate(dtAlarm.getDate() + day)
        }
        return dtAlarm
    }

    static timerNotifyAttendance = (day = 0) => {
        let dtAlarm = Utils.getDateNotification(day)
        let dtNow = new Date()

        if (dtAlarm - dtNow > 0) {
            PushNotification.localNotificationSchedule({
                id: KEY_NOTIFICATION_ATTENDENCE,
                autoCancel: false,
                message: 'Please take attendance',
                date: dtAlarm,
                repeatType: 'day'
            });
        }
    }

    static cancelNotifyAttendance = () => {
        PushNotification.cancelLocalNotifications({id: KEY_NOTIFICATION_ATTENDENCE})
        Utils.timerNotifyAttendence(1)
    }

    static timerNotifySync = (props) => {
        const notifications = props.notifications
        const syncNotification = notifications.syncNotification
        if (syncNotification !== undefined) {
            return
        }

        //remove any existing notification
        this.removeSyncNotification(props)

        //setup new sync notification
        let date = new Date(Date.now())
        date.setDate(date.getDate() + 2)

        const details = {
            id: "123",
            title: "Sync",
            message: "Please remember to sync your data",
            playSound: true,
            soundName: 'default',
            date : date
        }
        PushNotification.localNotificationSchedule(details)
        props.storeNotifications({syncNotification:true})
    }

    static removeSyncNotification = (props) => {
        PushNotification.cancelLocalNotifications({id: '123'})
        props.removeNotifications()

    }
}
