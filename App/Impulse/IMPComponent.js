/**
 * (c)2016 IO Digital
 * @author Werner Roets <cobolt.exe@gmail.com>
 */

import React, { Component } from 'react'
import { Modal } from 'react-native'
import IMPLog from './IMPLog'
import * as Lifecycle from './lib/Lifecycle'
import EventEmitter from 'EventEmitter'
import Sentry from '../Sentry'
import Config from '../Config'

export default class IMPComponent extends Component {

  // Private
  _fileName
  _className

  // Public
  navigator


  constructor(props) {
    super(props)
    this._fileName = this.constructor.name+'.js'
    this._className = this.constructor.name

    this.navigator = this.props.navigator

    this.props._navigationEventEmitter.addListener('onWillFocus'+this._className, this.componentWillFocus, this)
    this.props._navigationEventEmitter.addListener('onDidFocus'+this._className, this.componentDidFocus, this)

    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._className, Lifecycle.CONSTRUCTOR)
    }
  }

  setModal(options) {
    this.props._modalEventEmitter.emit('modal', options)
  }

  componentWillFocus() {
    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._className, Lifecycle.COMPONENT_WILL_FOCUS)
    }
  }

  componentDidFocus() {
    if(Config.debug) {
      if(Config.debugReact) {
        IMPLog.react(this._className, Lifecycle.COMPONENT_DID_FOCUS)
      }
    } else {
      this.props.gaTrackers.tracker1.trackScreenView(this._className)
    }
  }

  componentWillMount() {
    if(Config.debug && Config.debugReact) {
      IMPLog.react(this._className, Lifecycle.COMPONENT_WILL_MOUNT)
    } else {
      Sentry.addBreadcrumb(this._className, Lifecycle.COMPONENT_WILL_MOUNT)
    }

  }

  componentDidMount() {
    if(Config.debug) {
      if(Config.debugReact) {
        IMPLog.react(this._className, Lifecycle.COMPONENT_DID_MOUNT)
      }
    } else {
      this.props.gaTrackers.tracker1.trackScreenView(this._className)
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
      IMPLog.react(this._className, Lifecycle.RENDER)
    }
  }
}
