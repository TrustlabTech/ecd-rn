//@flow
import React from 'react'
import IMPLog from './IMPLog'
import * as Lifecycle from './lib/Lifecycle'
import EventEmitter from 'EventEmitter'
// import Subscribable from 'Subscribable'

export default class IMPComponent extends React.Component {

  // Protected
  _fileName = 'IMPComponent.js'
  navigator = null

  // Private
  _className = null


  navigator = {
    push: (route) => {

      this.props.navigator.push(route)

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
  getClassFromFileName = fileName => {
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

  constructor(props, fileName) {
    super(props)
    this._fileName = this.constructor.name+'.js'
    this._className = this.constructor.name

    navigator = this.props.navigator
    dispatch = this.props.dispatch
    this.props._eventEmitter.addListener('onWillFocus'+this._className, this.componentWillFocus, this)

    IMPLog.react(this._fileName,Lifecycle.CONSTRUCTOR)
  }

  componentWillFocus() {

    IMPLog.react(this._fileName,Lifecycle.COMPONENT_WILL_FOCUS)
  }

  // componentDidFocus(event,callback) {
  //   IMPLog.react(this._fileName, Lifecycle.COMPONENT_DID_FOCUS)

  // }

  componentWillMount() {
    IMPLog.react(this._fileName, Lifecycle.COMPONENT_WILL_MOUNT)

  }

  componentDidMount() {
    IMPLog.react(this._fileName, Lifecycle.COMPONENT_DID_MOUNT)
  }

  componentWillReceiveProps() {
    IMPLog.react(this._fileName, Lifecycle.COMPONENT_WILL_RECEIEVE_PROPS)
  }

  shouldComponentUpdate(nextProps, nextState) {
    IMPLog.react(this._fileName, Lifecycle.SHOULD_COMPONENT_UPDATE)
    return true
  }

  componentWillUpdate(nextProps, nextState) {
    IMPLog.react(this._fileName, Lifecycle.COMPONENT_WILL_UPDATE)
  }

  componentDidUpdate(preProps, prevState) {
    IMPLog.react(this._fileName, Lifecycle.COMPONENT_DID_UPDATE)
  }

  componentWillUnmount() {
    IMPLog.react(this._fileName, Lifecycle.COMPONENT_WILL_UNMOUNT)
    this.props._eventEmitter.removeListener('onWillFocus'+this._className, this.componentWillFocus, this)
    // this.props._eventEmitter.removeListener('onDidFocus'+this._className,this.componentDidFocus, this)
  }

  render() {
    IMPLog.react(this._fileName, Lifecycle.RENDER)
  }
}