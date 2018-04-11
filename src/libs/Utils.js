/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Zayin Krige <zayin@krige.org>
 */

'use-strict'
import { Alert } from 'react-native';
import { GET_CLASSES, GET_CHILDREN, GET_CHILDREN_FOR_CENTER } from '../constants'
import { Request } from '../libs/network'
import CodePush from 'react-native-code-push'
let jwtDecode = require('jwt-decode');

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

    static checkChildrenAttendance(attendanceChild, puplis) {
        let message;
        attendanceChild.forEach(element => {
            const user = puplis.find(e => e.id === element.id);
            if (user && user.attendanceTime) {
                const currentTime = new Date()
                const date = new Date(user.attendanceTime)
                if (currentTime.toDateString() === date.toDateString()) {
                    message = 'Child already attended this class today'
                }
            }
        });
        return message;
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
}
