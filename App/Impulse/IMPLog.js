/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

import Config from '../Config'
import ANSI from 'ansi-styles'

import * as Lifecycle from './lib/Lifecycle'

export default class IMPLog {


  static log = (text, color) => {
        console.log(`${color.open}${text}${color.close}`)
  }

  static _asColumn = (text, width = 100) => {
    const n_spaces = width - text.length

    if(n_spaces < 0 )
      return text

    const spaces = Array(n_spaces).join(" ")
    return text + spaces
  }

  static react = (filename, event) => {

    if(Config.debug && Config.debugReact) {

      switch(event) {

        case Lifecycle.COMPONENT_WILL_MOUNT:
          IMPLog.log(
              IMPLog._asColumn(filename,20) + IMPLog._asColumn(event,event.length),
              ANSI.green
          )
          break

        case Lifecycle.COMPONENT_WILL_UNMOUNT:
          IMPLog.log(IMPLog._asColumn(filename,20) + IMPLog._asColumn(event,event.length), ANSI.red)
          break

        case Lifecycle.COMPONENT_WILL_FOCUS:
          IMPLog.log(IMPLog._asColumn(filename,20) + IMPLog._asColumn(event,event.length), ANSI.yellow)
          break

        case Lifecycle.COMPONENT_DID_FOCUS:
          IMPLog.log(IMPLog._asColumn(filename,20) + IMPLog._asColumn(event,event.length), ANSI.magenta)
          break

        case Lifecycle.COMPONENT_WILL_RECEIEVE_PROPS:
          IMPLog.log(IMPLog._asColumn(filename,20) + IMPLog._asColumn(event,event.length), ANSI.cyan)
          break

        case Lifecycle.RENDER:
          IMPLog.log(IMPLog._asColumn(filename,20) + IMPLog._asColumn(event,event.length), ANSI.gray)
          break

        case Lifecycle.COMPONENT_WILL_UPDATE:
          IMPLog.log(IMPLog._asColumn(filename,20) + IMPLog._asColumn(event,event.length), ANSI.blue)
          break

        case Lifecycle.COMPONENT_DID_UPDATE:
          IMPLog.log(IMPLog._asColumn(filename,20) + IMPLog._asColumn(event,event.length), ANSI.white)
          break


        default:
          IMPLog.log(IMPLog._asColumn(filename,20) + IMPLog._asColumn(event,event.length),ANSI.white)
          break

      }
    }
  }
}
// export default {
//   react
// }