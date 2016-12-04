//@flow
import React from 'react'
import IMPLog from './IMPLog'
import * as Lifecycle from './lib/Lifecycle'
import EventEmitter from 'EventEmitter'
// import Subscribable from 'Subscribable'

export default class IMPComponent extends React.Component {

  // Protected
  Filename = 'IMPComponent.js'
  navigator = null

  // Private
  _className = null


  navigator = {
    push: (route) => {
      // console.log('Push',{ source: this._className, target: this.getClassFromDisplayName(route.scene.displayName) })
      // this.props._eventEmitter.emit('Push', { source: this._className, target: this.getClassFromDisplayName(route.scene.displayName) })
      this.props.navigator.push({...route, source: this._className})

    },
    pop: () => {

      this.props.navigator.pop()

    }
  }
  /*
   * Parses the currentRoute string contained in
   * the navigator to determine class
   */
  getClassFromDisplayName = displayName => {
    if(displayName) {
      if(displayName.contains("Connect")) {
        // This component is connected to redux

        return displayName.substring(
          displayName.indexOf("(")+1,
          displayName.indexOf(")"))
      } else {
        // This component is not connected to redux
        return displayName
      }
    } else {
      throw "Could not parse displayName"
    }
  }

  /*
   * Parse fileName to get the class
   */
  getClassFromFilename = fileName => {
    if(fileName) {
      if(fileName.contains(".js")) {
        return fileName.substring(0,fileName.indexOf(".js"))
      } else {
        // invalid filetype
        throw "Invalid filetype. File must have the .js extension"
      }
    } else {
      throw "Could not parse fileName"
    }
  }

  constructor(props, filename) {
    super(props)

    IMPLog.react(this.Filename,Lifecycle.CONSTRUCTOR)
    this.Filename = filename
    this._className = this.getClassFromFilename(filename)

    navigator = this.props.navigator
    dispatch = this.props.dispatch

  }

  componentWillFocus(event, callback) {

    // if this is event source do callback // else do nothing
    console.log('EVENT SOURCE', event.source, 'CLASSNAME', this._className)
    if(event.source === this._className) {
      callback()

    }
    IMPLog.react(this.Filename,Lifecycle.COMPONENT_WILL_FOCUS)

    // else do nothing
  }

  // componentDidFocus(event,callback) {
  //   IMPLog.react(this.Filename, Lifecycle.COMPONENT_DID_FOCUS)

  // }

  componentWillMount() {
    IMPLog.react(this.Filename, Lifecycle.COMPONENT_WILL_MOUNT)
    this.props._eventEmitter.addListener('onWillFocus'+this._className, this.componentWillFocus, this)

  }

  componentDidMount() {
    IMPLog.react(this.Filename, Lifecycle.COMPONENT_DID_MOUNT)
    // this.props._eventEmitter.addListener('onDidFocus'+this._className,this.componentDidFocus, this)


  }

  componentWillReceiveProps() {
    IMPLog.react(this.Filename, Lifecycle.COMPONENT_WILL_RECEIEVE_PROPS)
  }

  shouldComponentUpdate(nextProps, nextState) {
    IMPLog.react(this.Filename, Lifecycle.SHOULD_COMPONENT_UPDATE)
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    IMPLog.react(this.Filename, Lifecycle.COMPONENT_WILL_UPDATE)
  }

  componentDidUpdate(preProps, prevState) {
    IMPLog.react(this.Filename, Lifecycle.COMPONENT_DID_UPDATE)
  }

  componentWillUnmount() {
    IMPLog.react(this.Filename, Lifecycle.COMPONENT_WILL_UNMOUNT)
    this.props._eventEmitter.removeListener('onWillFocus'+this._className, this.componentWillFocus, this)
    // this.props._eventEmitter.removeListener('onDidFocus'+this._className,this.componentDidFocus, this)
  }

  render() {
    IMPLog.react(this.Filename, Lifecycle.RENDER)
  }
}