import React, { Component } from 'react'
import {
  Modal,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

import { Colours, FontSizes } from '../GlobalStyles'
/*
  Usage:

  <WaitModal
    animating= boolean
    visible= boolean
    text= string
    ref= string
    popOnclose= boolean
  />

*/
export default class WaitModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible || false,
      animating: props.animating || true,
      error: null
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      visible: props.visible,
      animating: props.animating,
      error: props.error || null
    })
  }

  close(){
    this.props.onPressClose()
    if(this.props.popOnClose){
      this.props.navigator.pop()
    }
  }

  render() {
    var centerComponent =
      <ActivityIndicator
        animating={this.state.animating}
        style={{height: 80}}
        size="large"
      />
    if(!this.state.animating) {
      centerComponent =
        <TouchableHighlight onPress={ () => {this.close()} }>
          <View style={{
            padding: 15,
            borderRadius: 5,
            backgroundColor: Colours.secondary ,
            alignItems: 'center',
            justifyContent: 'center',
            width: 200
          }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: FontSizes.p}}>Close</Text>
          </View>
        </TouchableHighlight>
    }
    return (
      <Modal
        ref="modal"
        onClose={ this.props.onClose }
        animationType={"fade"}
        transparent={true}
        visible={this.state.visible}
        onRequestClose={ () => {
          console.log("This is required. But does this do anything?")
        }}
      >
        <View style={styles.entireModal}>
            <View style={[styles.visibleModal] }>
                <Text style={styles.text}>
                  {this.props.text || "Loading"}
                </Text>
                {centerComponent}
            </View>
        </View>
      </Modal>
    )
  }
}

var styles = StyleSheet.create({
  entireModal: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column'
  },
  visibleModal: {
    borderColor: Colours.secondary,
    borderWidth: 1,
    elevation: 3,
    height: 250,
    width: 250,
    backgroundColor: '#0f0f0f',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 8
  },
  text: {
    color: 'white',
    padding: 15,
    fontSize: FontSizes.h5,
    textAlign: 'center'
  }
})