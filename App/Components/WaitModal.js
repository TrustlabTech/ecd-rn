import React, { Component } from 'react'
import {
  Modal,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

export default class WaitModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible || false,
      animating: true
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      visible: props.visible
    })
  }

  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {alert("Modal has been closed.")}}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
            <View style={{
                height: 250,
                width: 250,
                backgroundColor: '#0f0f0f',
                justifyContent: 'center',
                borderRadius: 8,
                shadowColor: '#000000',
                shadowOpacity: 0.8,
                shadowRadius: 3
              }}
            >

              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  color: 'white',
                  fontSize: 20
                }}>
                  {this.props.text || "Loading"}
                </Text>
              </View>

              <ActivityIndicator
                animating={this.state.animating}
                style={{height: 80}}
                size="large"
              />
            </View>
        </View>
      </Modal>
    )
  }
}

var styles = StyleSheet.create({
  waitModalOuter: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#efefef",
    borderRadius: 8,
    margin: 15,
  },

  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white',
    borderRadius: 2
  }
})