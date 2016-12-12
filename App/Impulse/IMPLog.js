/**
 * (c)2016 IO Digital
 * @author Werner Roets <cobolt.exe@gmail.com>
 */

import ANSI from 'ansi-styles'

import * as Lifecycle from './lib/Lifecycle'

export default class IMPLog {


  static _log = (prefix, text, fgColor, bgColor = ANSI.bgBlack) => {
    console.log(`${prefix}${bgColor.open}${fgColor.open}${text}${fgColor.close}${bgColor.close}`)
  }

  static _asColumn = (text, width = 100) => {
    const n_spaces = width - text.length

    if(n_spaces < 0 )
      return text

    const spaces = Array(n_spaces).join(" ")
    return text + spaces
  }

  static store = (data) => {
    const prefix = `${ANSI.magenta.open}[ST]${ANSI.magenta.close}`
    // adding color destroys prettyprint
    console.log(prefix)
    console.log(data)
  }

  static async = (filename, message) => {
    const prefix = `${ANSI.cyan.open}[AS]${ANSI.cyan.close} `
    IMPLog._log(prefix, message, ANSI.yellow)
  }

  static networkRequest = (method, timestamp, route) => {
    const prefix = `${ANSI.blue.open}[NW]${ANSI.blue.close}`
    const method_color = `${ANSI.bold.open}${ANSI.green.open}${method}${ANSI.green.close}${ANSI.bold.close}`
    const timestamp_color = `${ANSI.gray.open}${ANSI.underline.open}${timestamp}${ANSI.underline.close}${ANSI.gray.close}`
    const route_color = `${ANSI.white.open}${route}${ANSI.white.close}`
    // console.log(prefix+method_color+timestamp_color+route_color)
    console.log(`${prefix} ${method_color} ${IMPLog._asColumn(timestamp_color,64)} ${route_color}`)
  }

  static networkResponse = (status, timestamp , data) => {
    const prefix = `${ANSI.blue.open}[NW]${ANSI.blue.close}`

    const codes = [
      {code: 200, color: ANSI.green},
      {code: 401, color: ANSI.yellow},
      {code: 500, color: ANSI.red }
    ].find((item) => status === item.code ? item.color : false) ||
    {code: item.code, color: ANSI.white }

    const timestamp_color = `${ANSI.gray.open}${ANSI.underline.open}${timestamp}${ANSI.underline.close}${ANSI.gray.close}`

    const status_color = `${codes.color.open}${status}${codes.color.close}`
    console.log(`${prefix} ${status_color} ${timestamp_color}`)
    console.log(data)

    // const status_color = `${ANSI.bold.open}${ANSI.green.open} ${status} ${ANSI.green.close}${ANSI.bold.close}`
  }

  static error = (message, fileName) => {
    const prefix = `${ANSI.bgRed.open}${ANSI.white.open}[ER]${ANSI.white.close}${ANSI.bgRed.close}`
    const fileName_color = `${ANSI.green.open}${fileName}${ANSI.green.close}`
    console.log(`${prefix} ${fileName} ${ANSI.red.open} ${message}${ANSI.red.close}`)
  }

  static react = (filename, event) => {

    const prefix = `${ANSI.red.open}[LC]${ANSI.red.close} `

    switch(event) {
      case Lifecycle.CONSTRUCTOR:
        IMPLog._log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.white, ANSI.bgBlack)
        break

      case Lifecycle.COMPONENT_WILL_MOUNT:
        IMPLog._log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.black, ANSI.bgGreen)
        break

      case Lifecycle.COMPONENT_WILL_FOCUS:
        IMPLog._log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.green, ANSI.bgBlack)
        break

      case Lifecycle.COMPONENT_DID_MOUNT:
        IMPLog._log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.black, ANSI.bgYellow)
        break

      case Lifecycle.COMPONENT_DID_FOCUS:
        IMPLog._log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.magenta)
        break

      case Lifecycle.COMPONENT_WILL_RECEIEVE_PROPS:
        IMPLog._log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.cyan)
        break

      case Lifecycle.SHOULD_COMPONENT_UPDATE:
        IMPLog._log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.gray, ANSI.bgWhite)
        break

      case Lifecycle.COMPONENT_WILL_UPDATE:
        IMPLog._log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.magenta, ANSI.bgWhite)
        break

      case Lifecycle.COMPONENT_DID_UPDATE:
        IMPLog._log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.blue, ANSI.bgWhite)
        break

      case Lifecycle.RENDER:
        IMPLog._log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.gray, ANSI.bgBlack)
        break

      case Lifecycle.COMPONENT_WILL_UNMOUNT:
        IMPLog._log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30), ANSI.black, ANSI.bgRed)
        break

      default:
        IMPLog._log(prefix, IMPLog._asColumn(filename,30) + IMPLog._asColumn(event,30),ANSI.black, ANSI.bgWhite)
        break

    }
  }
}
