//@flow
import React from 'react'
import { Modal } from 'react-native'
import IMPLog from './IMPLog'
import * as Lifecycle from './lib/Lifecycle'
import EventEmitter from 'EventEmitter'
import Sentry from '../Sentry'
import Config from '../Config'

export default class IMPComponent extends React.Component {

  // Private
  _fileName = null
  _className = null

  // Public
  navigator = null



  setModal(options) {
    this.props._modalEventEmitter.emit('modal', options)
  }

  constructor(props, context) {
    super(props, context)
    this._fileName = this.constructor.name+'.js'
    this._className = this.constructor.name

    this.navigator = this.props.navigator
    this.dispatch = this.props.dispatch

    this.props._navigationEventEmitter.addListener('onWillFocus'+this._className, this.componentWillFocus, this)
    this.props._navigationEventEmitter.addListener('onDidFocus'+this._className, this.componentDidFocus, this)

    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._className, Lifecycle.CONSTRUCTOR)
    }
  }

  componentWillFocus() {
    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._className, Lifecycle.COMPONENT_WILL_FOCUS)
    }
  }

  componentDidFocus(event,callback) {
    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._className, Lifecycle.COMPONENT_DID_FOCUS)
    }
  }

  componentWillMount() {
    console.log('COAL')
    debugger
    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._className, Lifecycle.COMPONENT_WILL_MOUNT)
    } else {
      Sentry.addBreadcrumb(this._className, Lifecycle.COMPONENT_WILL_MOUNT)
    }

  }

  componentDidMount() {
    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._className, Lifecycle.COMPONENT_DID_MOUNT)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._className, Lifecycle.COMPONENT_WILL_RECEIEVE_PROPS)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._className, Lifecycle.SHOULD_COMPONENT_UPDATE)
    }

    // Must return true
    return true
  }

  componentWillUpdate(nextProps, nextState) {
    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._className, Lifecycle.COMPONENT_WILL_UPDATE)
    }
  }

  componentDidUpdate(preProps, prevState) {
    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._className, Lifecycle.COMPONENT_DID_UPDATE)
    }
  }

  componentWillUnmount() {
    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._className, Lifecycle.COMPONENT_WILL_UNMOUNT)
    }

    // Remove event listeners
    this.props._navigationEventEmitter.removeListener('onWillFocus'+this._className, this.componentWillFocus, this)
    this.props._navigationEventEmitter.removeListener('onDidFocus'+this._className,this.componentDidFocus, this)
  }

  render() {
    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._className, Lifecycle.COMPONENT_DID_UPDATE)
    }
  }
}

IMPComponent.contextTypes = {
  store: React.PropTypes.object.isRequired
}