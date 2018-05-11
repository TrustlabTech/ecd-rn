/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Zayin Krige <zayin@krige.org>
 */
'use-strict'

import Crypto from "./Crypto";
import { Alert } from 'react-native'
import { GET_CLASSES, GET_CHILDREN_FOR_CENTER, SUBMIT_ATTENDANCE, SUBMIT_ATTENDANCE_CLAIMS, GET_CHILDREN } from '../constants'
import { Request } from '../libs/network'
import CodePush from 'react-native-code-push'
import PushNotification from 'react-native-push-notification'
let jwtDecode = require('jwt-decode')
import buffer from 'buffer/'
const Buffer = buffer.Buffer

const KEY_NOTIFICATION_ATTENDANCE = '0'

const templateUrl = 'https://raw.githubusercontent.com/TrustlabTech/amply_schemas/3a656ea/org_ecd_draft.json'
const createBulkAttendanceClaim = (template, singleClaims, location, digitalIds) => {
    return new Promise((resolve, reject) => {
        const date = new Date().toISOString()
        // JSON.parse(JSON.stringify()) is a tmp workaround for a tedious object reference issue
        const
            claimObjectSample = JSON.parse(JSON.stringify(template.claim)),
            verifiableClaimSample = JSON.parse(JSON.stringify(template))

        let claimObject = claimObjectSample
        claimObject.id = digitalIds.practitioner
        claimObject.deliveredService.practitioner = digitalIds.practitioner
        claimObject.deliveredService.geo.latitude = location.coords.latitude
        claimObject.deliveredService.geo.longitude = location.coords.longitude
        claimObject.deliveredService.attendees = singleClaims

        Crypto.sign(new Buffer(JSON.stringify(claimObject))).then(signature => {
            let verifiableClaim = verifiableClaimSample
            verifiableClaim.issuer = digitalIds.centre
            verifiableClaim.issued = date
            verifiableClaim.claim = claimObject
            verifiableClaim.signature.created = date
            verifiableClaim.signature.signatureValue = signature

            resolve(verifiableClaim)
        }).catch(e => {
            reject(e)
        })
    })
}


export default class Utils {

    static checkForUpdate() {
        CodePush.sync({
            updateDialog: true,
            installMode: CodePush.InstallMode.ON_NEXT_RESTART
        }, (status) => {
            if (status === CodePush.SyncStatus.UPDATE_INSTALLED) {
                Alert.alert('Success', 'Update installed, please restart app')
            }
        })
    }

    static async getClasses(props) {
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

    static async getChildren(props) {
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
            return child.centre_class_id === classid
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

    static async getCurrentPosition(geolocation) {
        const options = {
            enableHighAccuracy: false,
            timeout: 1000 * 10, //wait 10s to get location
            maximumAge: 1000 * 60 * 10 //10 minutes old
        }
        return new Promise((resolve, reject) => {
            geolocation.getCurrentPosition(resolve, reject, options)
        }).then(resp => {
            console.log('getCurrentPosition', resp)
            return resp
        }).catch(error => {
            console.log('getCurrentPosition error', error)
            Alert.alert('Location unavailable', error.message || 'Your location could not be determined,\nplease ensure location is enabled.')
            return Promise.reject(error)
        })
    }

    static hasTokenExpired(token) {
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

    static timerNotifyAttendance(day = 0) {
        let dtAlarm = Utils.getDateNotification(day)
        let dtNow = new Date()

        if (dtAlarm - dtNow > 0) {
            PushNotification.localNotificationSchedule({
                id: KEY_NOTIFICATION_ATTENDANCE,
                autoCancel: false,
                message: 'Please take attendance',
                date: dtAlarm,
                repeatType: 'day'
            });
        }
    }

    static cancelNotifyAttendance() {
        PushNotification.cancelLocalNotifications({ id: KEY_NOTIFICATION_ATTENDANCE })
        Utils.timerNotifyAttendance(1)
    }

    static timerNotifySync(props) {
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
            date: date
        }
        PushNotification.localNotificationSchedule(details)
        props.storeNotifications({ syncNotification: true })
    }

    static removeSyncNotification(props) {
        PushNotification.cancelLocalNotifications({ id: '123' })
        props.removeNotifications()

    }

    static createAttendanceClaim(childData, digitalIds, template, location) {
        const date = new Date().toISOString()
        return new Promise((resolve, reject) => {
            // JSON.parse(JSON.stringify()) is a tmp workaround for a tedious object reference issue
            const
                attendee = JSON.parse(JSON.stringify(template.claim.deliveredService.attendees)),
                claimObjectSample = JSON.parse(JSON.stringify(template.claim)),
                verifiableClaimSample = JSON.parse(JSON.stringify(template))
            // subject portion
            attendee.id = childData.id
            attendee.date = date
            attendee.attended = childData.checked || false
            // claim portion
            let claimObject = claimObjectSample
            claimObject.id = digitalIds.practitioner
            claimObject.deliveredService.practitioner = digitalIds.practitioner
            claimObject.deliveredService.geo.latitude = location.coords.latitude
            claimObject.deliveredService.geo.longitude = location.coords.longitude
            claimObject.deliveredService.attendees[0] = attendee

            Crypto.sign(new Buffer(JSON.stringify(claimObject))).then(signature => {
                // verifiable claim portion
                let verifiableClaim = verifiableClaimSample
                verifiableClaim.issuer = digitalIds.centre
                verifiableClaim.issued = date
                verifiableClaim.claim = claimObject
                verifiableClaim.signature.created = date
                verifiableClaim.signature.signatureValue = signature

                resolve(verifiableClaim)
            }).catch(e => {
                reject(e)
            })
        })
    }

    

    static async takeAttendence(session, classObj, attendance, location, isSync = false) {

        const centre_class_id = isSync ? attendance.centre_class_id : classObj.id
        const centre_id = isSync ? attendance.centre_id : classObj.centre_id
        console.log("session", session)
        try {
            const
                request = new Request(),
                { url, options } = SUBMIT_ATTENDANCE(session.token, {
                    children: attendance,
                    centre_class_id: centre_class_id, // eslint-disable-line camelcase
                    centre_id: centre_id, // eslint-disable-line camelcase
                })
            await request.fetch(url, options)
        } catch (e) {
            console.log("request error: ", e);
            let error
            if(isSync){
                error =  new Error("Error",'Failed to submit attendace, try again later.');
            } else {
                error = new Error()
                error.name = "Unable to sync"
                error.message = 'your data will be stored and sent to servers when you sync manually via settings'   
            }

            throw error
        }

        // get template from IPD
        let template = {}
        try {
            const templateResponse = await fetch(templateUrl) // eslint-disable-line no-undef
            template = await templateResponse.json()
        } catch (e) {
            throw new Error('Error','Failed to get Verifiable Claim template, try again later.')
        }

        // digital IDs of the involved entities from api v2 response
        const digitalIds = {
            practitioner: session.user.did,
            centre: session.user.centre.did,
        } 
        
        // create all single verifiable claims
        
        if(isSync){
            attendance = attendance.children
        }
        const promises = attendance.map(childData => {
            return this.createAttendanceClaim(childData, digitalIds, template, location)
        })

        // group all signed verifiable claims for creating the bulk claim
        let singleClaims = []

        try {
            singleClaims = await Promise.all(promises)
        } catch (e) {
            throw new Error('Error','Failed to create children Verifiable Claims.')
        }

        // create bulk attendence verifiable claim
        let bulkAttendanceClaim = {}
        try {
            bulkAttendanceClaim = await createBulkAttendanceClaim(template, singleClaims, location, digitalIds)
        } catch (e) {
            throw new Error('Error', 'Failed to create bulk Verifiable Claim.')
        }

        const
            claimsRequest = new Request(),
            claimsRequestParams = SUBMIT_ATTENDANCE_CLAIMS(session.token, {
                centreId: centre_id,
                bulkClaim: bulkAttendanceClaim,
                singleClaims
            })

         // submit the verifiable claims to api v2
        try {
            const res = await claimsRequest.fetch(claimsRequestParams.url, claimsRequestParams.options)
        } catch (e) {
            throw new Error('Error', 'Failed to submit Verifiable Claims.')
        }   

        return true
    }
}
