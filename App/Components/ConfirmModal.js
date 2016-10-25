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
export default class ConfirmModal extends Component {
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
    this.setState({
      visible: false
    })
    if(this.props.popOnClose){
      this.props.navigator.pop()
    }
  }

  okay() {
    this.setState({
      visible: false
    })
    this.props.onOkay()
  }

render() {
    console.log()
    var centerComponent =
      <ActivityIndicator
        animating={this.state.animating}
        style={{height: 80}}
        size="large"
      />
    let cancelButton
    if(!this.state.animating) {
      centerComponent =
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5
        }}>

        <TouchableHighlight onPress={ () => this.okay() }>
            <View style={{
              marginRight: 5,
              padding: 15,
              borderRadius: 5,
              backgroundColor: Colours.secondary ,
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 100
            }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: FontSizes.p}}>Okay</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={ () => this.close() }>
            <View style={{
              marginLeft: 5,
              padding: 15,
              borderRadius: 5,
              backgroundColor: Colours.secondary ,
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 100
            }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: FontSizes.p}}>Cancel</Text>
            </View>
          </TouchableHighlight>

        </View>
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