/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Zayin Krige <zayin@krige.org>
 */

'use-strict'

var luhn = require('luhn-alg')
import { GET_CLASSES, GET_CHILDREN } from '../constants'
import { Request } from '../libs/network'

export default class Utils {

  static validSAIDNumber = (idNumber) => {
    let toRet = luhn(idNumber)
    return toRet
  }

  static getClasses = async (props) => {
    const { session } = props
    if (!session.token || !session.user) {
      return []
    }

    const
      { url, options } = GET_CLASSES(session.token, session.user.id),
      request = new Request()

    const classes = await request.fetch(url, options)
    props.storeClasses(classes)
    return classes
  }

  static getChildren = async (props) => {
    const { session } = props
    if (!session.token || !session.user) {
      return []
    }

    const
      { url, options } = GET_CHILDREN(session.token, session.user.id),
      request = new Request()

    const pupils = await request.fetch(url, options)
    props.storePupils(pupils)
    return pupils
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
}
