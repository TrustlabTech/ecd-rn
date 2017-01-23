/**
 * @copyright 2016 IO Digital
 * 33 Loop Street, Cape Town, South Africa
 * @author Werner Roets <werner@io.co.za>
 */

import ANSI from 'ansi-styles'
import * as Lifecycle from './lib/Lifecycle'

/** Provides a wide variety of logging features */
export default class IMPLog {

  /**
   * Log something with a prefix, forground and background colour
   * @private
   * @param {string} Prefix
   * @param {string} Text
   * @param {Ansi.color} Foreground colour
   * @param {Ansi.bgColor} Background colour
   * @returns {undefined}
   */
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

  // TODO: We can use this in session now instead of for redux
  static store = (data) => {
    const prefix = `${ANSI.magenta.open}[ST]${ANSI.magenta.close}`
    // adding color destroys prettyprint
    console.log(prefix)
    console.log(data)
  }

  /**
   * Log an AsyncStorage action
   * @param {string} filename
   * @returns {undefined}
   */
  static async = message => {
    const prefix = `${ANSI.cyan.open}[AS]${ANSI.cyan.close} `
    IMPLog._log(prefix, message, ANSI.yellow)
  }

  /**
   * Log a network request
   * @param {string} method
   * @param {string} timestamp
   * @param {string} route
   * @returns {undefined}
   */
  static networkRequest = (method, timestamp, route) => {
    const prefix = `${ANSI.blue.open}[NW]${ANSI.blue.close}`
    const method_color = `${ANSI.bold.open}${ANSI.green.open}${method}${ANSI.green.close}${ANSI.bold.close}`
    const timestamp_color = `${ANSI.gray.open}${ANSI.underline.open}${timestamp}${ANSI.underline.close}${ANSI.gray.close}`
    const route_color = `${ANSI.white.open}${route}${ANSI.white.close}`
    console.log(`${prefix} ${method_color} ${IMPLog._asColumn(timestamp_color,64)} ${route_color}`)
  }

  /**
   * Log a network response
   * @param {string} response status
   * @param {string} timestamp
   * @param {any} data
   * @returns {undefined}
   */
  static networkResponse = (status, timestamp, data) => {
    const prefix = `${ANSI.blue.open}[NW]${ANSI.blue.close}`

    const codes = [
      {code: 200, color: ANSI.green},
      {code: 401, color: ANSI.yellow},
      {code: 500, color: ANSI.red },
      {code: 404, color: ANSI.yellow }
    ].find( item => status === item.code ? item.color : false) ||
    {code: status || "unknown", color: ANSI.white }

    const timestamp_color = `${ANSI.gray.open}${ANSI.underline.open}${timestamp}${ANSI.underline.close}${ANSI.gray.close}`

    const status_color = `${codes.color.open}${status}${codes.color.close}`
    console.log(`${prefix} ${status_color} ${timestamp_color}`)
    console.log(data)

  }

  /**
   * Log an error
   * @param {string} message
   * @param {string} filename
   * @returns {undefined}
   */
  static error = (message, fileName) => {
    const prefix = `${ANSI.bgRed.open}${ANSI.white.open}[ER]${ANSI.white.close}${ANSI.bgRed.close}`
    const fileName_color = `${ANSI.green.open}${fileName}${ANSI.green.close}`
    console.log(`${prefix} ${fileName} ${ANSI.red.open} ${message}${ANSI.red.close}`)
  }

  /**
   * Log a React lifecycle method
   * @param {string} filename
   * @param {string} event
   * @returns {undefined}
   */
  static react = (filename, event) => {

    const prefix = `${ANSI.red.open}[LC]${ANSI.red.close} `

    switch(event) {
      case Lifecycle.CONSTRUCTOR:
        IMPLog._log(prefix, IMPLog._asColumn(filename, 30) + IMPLog._asColumn(event, 30), ANSI.white, ANSI.bgBlack)
        break

      case Lifecycle.COMPONENT_WILL_MOUNT:
        IMPLog._log(prefix, IMPLog._asColumn(filename, 30) + IMPLog._asColumn(event, 30), ANSI.black, ANSI.bgGreen)
        break

      case Lifecycle.COMPONENT_WILL_FOCUS:
        IMPLog._log(prefix, IMPLog._asColumn(filename, 30) + IMPLog._asColumn(event, 30), ANSI.green, ANSI.bgBlack)
        break

      case Lifecycle.COMPONENT_DID_MOUNT:
        IMPLog._log(prefix, IMPLog._asColumn(filename, 30) + IMPLog._asColumn(event, 30), ANSI.black, ANSI.bgYellow)
        break

      case Lifecycle.COMPONENT_DID_FOCUS:
        IMPLog._log(prefix, IMPLog._asColumn(filename, 30) + IMPLog._asColumn(event, 30), ANSI.magenta)
        break

      case Lifecycle.COMPONENT_WILL_RECEIEVE_PROPS:
        IMPLog._log(prefix, IMPLog._asColumn(filename, 30) + IMPLog._asColumn(event, 30), ANSI.cyan)
        break

      case Lifecycle.SHOULD_COMPONENT_UPDATE:
        IMPLog._log(prefix, IMPLog._asColumn(filename, 30) + IMPLog._asColumn(event, 30), ANSI.gray, ANSI.bgWhite)
        break

      case Lifecycle.COMPONENT_WILL_UPDATE:
        IMPLog._log(prefix, IMPLog._asColumn(filename, 30) + IMPLog._asColumn(event, 30), ANSI.magenta, ANSI.bgWhite)
        break

      case Lifecycle.COMPONENT_DID_UPDATE:
        IMPLog._log(prefix, IMPLog._asColumn(filename, 30) + IMPLog._asColumn(event, 30), ANSI.blue, ANSI.bgWhite)
        break

      case Lifecycle.RENDER:
        IMPLog._log(prefix, IMPLog._asColumn(filename, 30) + IMPLog._asColumn(event, 30), ANSI.gray, ANSI.bgBlack)
        break

      case Lifecycle.COMPONENT_WILL_UNMOUNT:
        IMPLog._log(prefix, IMPLog._asColumn(filename, 30) + IMPLog._asColumn(event, 30), ANSI.black, ANSI.bgRed)
        break

      default:
        IMPLog._log(prefix, IMPLog._asColumn(filename, 30) + IMPLog._asColumn(event, 30), ANSI.black, ANSI.bgWhite)
        break

    }
  }
}
