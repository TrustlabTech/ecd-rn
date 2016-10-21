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

export default class WaitModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible || false,
      animating: props.animating || true
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      visible: props.visible,
      animating: props.animating
    })
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
        <TouchableHighlight onPress={ () => this.setState({visible: false}) }>
          <View style={{
            padding: 15,
            backgroundColor: Colours.secondary ,
            alignItems: 'center',
            justifyContent: 'center',
            width: 200
          }}>
            <Text style={{color: 'white'}}>Close</Text>
          </View>
        </TouchableHighlight>
    }
    return (
      <Modal
        ref="modal"
        animationType={"fade"}
        transparent={true}
        visible={this.state.visible}
        onRequestClose={ () => {
          console.log("Modal closed")
        }}
      >
        <View style={styles.entireModal}>
            <View style={styles.visibleModal}>
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
    height: 250,
    width: 250,
    backgroundColor: '#0f0f0f',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3
  },
  text: {
    color: 'white',
    fontSize: FontSizes.p,
    textAlign: 'center'
  }
})