/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

import ANSI from 'ansi-styles'

import * as Lifecycle from './lib/Lifecycle'

export default class IMPLog {


  static log = (prefix, text, fgColor, bgColor = ANSI.bgBlack) => {
    console.log(`${prefix}${bgColor.open}${fgColor.open}${text}${fgColor.close}${bgColor.close}`)



  }

  static _asColumn = (text, width = 100) => {
    const n_spaces = width - text.length

    if(n_spaces < 0 )
      return text

    const spaces = Array(n_spaces).join(" ")
    return text + spaces
  }

  static react = (filename, event) => {

    const prefix = `${ANSI.red.open}[LC]${ANSI.red.close} `

    switch(event) {
      case Lifecycle.CONSTRUCTOR:
        IMPLog.log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.white, ANSI.bgBlack)
        break

      case Lifecycle.COMPONENT_WILL_MOUNT:
        IMPLog.log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.black, ANSI.bgGreen)
        break

      case Lifecycle.COMPONENT_WILL_FOCUS:
        IMPLog.log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.green, ANSI.bgBlack)
        break

      case Lifecycle.COMPONENT_DID_MOUNT:
        IMPLog.log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.black, ANSI.bgYellow)
        break

      case Lifecycle.COMPONENT_DID_FOCUS:
        IMPLog.log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.magenta)
        break

      case Lifecycle.COMPONENT_WILL_RECEIEVE_PROPS:
        IMPLog.log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.cyan)
        break

      case Lifecycle.SHOULD_COMPONENT_UPDATE:
        IMPLog.log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.gray, ANSI.bgWhite)
        break

      case Lifecycle.COMPONENT_WILL_UPDATE:
        IMPLog.log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.magenta, ANSI.bgWhite)
        break

      case Lifecycle.COMPONENT_DID_UPDATE:
        IMPLog.log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.blue, ANSI.bgWhite)
        break

      case Lifecycle.RENDER:
        IMPLog.log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.gray, ANSI.bgBlack)
        break

      case Lifecycle.COMPONENT_WILL_UNMOUNT:
        IMPLog.log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.black, ANSI.bgRed)
        break

      default:
        IMPLog.log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30),ANSI.black, ANSI.bgWhite)
        break

    }
  }
}
