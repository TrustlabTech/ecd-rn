import React, { Component } from 'react'
import {
  Modal,
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

export default class WaitModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible || false,
      text: props.text
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
        animationType={"slide"}
        transparent={true}
        visible={this.state.visible}
        onRequestClose={() => {alert("Modal has been closed.")}}
      >
        <View style={ styles.waitModalOuter }>
          <View style={ styles.waitModalInner }>
            <View style={ styles.textContainer }>
              <Text>{this.props.text}</Text>
              <Text>{this.props.subtext}</Text>
            </View>
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
    alignItems: 'center'
  },
  waitModalInner: {
    borderRadius: 2,
    padding: 5,
    width: 300,
    height: 350,
    backgroundColor: 'gray'
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 2
  }
})