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

  static react = (filename, event) => {

    if(Config.debug && Config.debugReact) {

      switch(event) {

        case Lifecycle.COMPONENT_WILL_MOUNT:
          IMPLog.log(`${filename} : ${event}`,ANSI.green)
          break

        case Lifecycle.COMPONENT_WILL_UNMOUNT:
          IMPLog.log(`${filename} : ${event}`,ANSI.red)
          break

        case Lifecycle.COMPONENT_WILL_FOCUS:
          IMPLog.log(`${filename} : ${event}`,ANSI.yellow)
          break

        case Lifecycle.COMPONENT_DID_FOCUS:
          IMPLog.log(`${filename} : ${event}`,ANSI.magenta)
          break

        case Lifecycle.COMPONENT_WILL_RECEIEVE_PROPS:
          IMPLog.log(`${filename} : ${event}`,ANSI.cyan)
          break

        case Lifecycle.RENDER:
          IMPLog.log(`${filename} : ${event}`,ANSI.gray)
          break

        case Lifecycle.COMPONENT_WILL_UPDATE:
          IMPLog.log(`${filename} : ${event}`,ANSI.blue)
          break

        case Lifecycle.COMPONENT_DID_UPDATE:
          IMPLog.log(`${filename} : ${event}`, ANSI.white)
          break


        default:
          IMPLog.log(`${filename} : ${event}`,ANSI.white)
          break

      }
    }
  }
}
// export default {
//   react
// }