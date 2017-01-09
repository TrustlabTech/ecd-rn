/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import {
  View,
  Modal,
  Dimensions
} from 'react-native'
import * as Progress from 'react-native-progress'
import Config from '../Config'

export default class LoadingModal extends Component {


  constructor(props) {
    super(props)
    const windowWidth = Dimensions.get('window').width
    this.state = {
      width: windowWidth
    }
  }

  componentDidMount() {
    const windowWidth = Dimensions.get('window').width
    this.setState( { width: windowWidth } )
  }

  componentWillReceiveProps() {
    const windowWidth = Dimensions.get('window').width
    this.setState( { width: windowWidth } )
  }

  render = () => (
    <Modal
      animationType={"none"}
      transparent={true}
      visible={this.props.visible}
      onRequestClose={ () => console.log('FIXME: modal request close')}
    >
      <Progress.Bar
        indeterminate={true}
        width={this.state.width}
        color={Config.progressBarColor}
        borderWidth={0}
      />

    </Modal>

  )
}