import React, { Component } from 'react'
import {
  Modal,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import * as appActions from '../Actions/App'
import { Colours, FontSizes } from '../GlobalStyles'
/*
  Usage:

  <WaitModal
    mode= enum (WAITING, OKAY, CONFIRM)
    text= string
    onPositive= function
    onNegative= function
    textPositive= string
    textNegative= string
  />

*/

export const ModalMode = {
  WAITING: 3,
  OKAY: 1,
  CONFIRM: 2
}

export default class WaitModal extends Component {



  constructor(props) {
    super(props)
    // this.state = {
    //   visible: props.visible || false
    // }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('kok',nextProps)
  //   if(nextProps.visible !== this.state.visible )
  //     this.setState({ visible: nextProps.visible })
  // }

  close() {
    this.props.dispatch(appActions.setModal({'modalVisible': false}))
  }

  onPositive(){
    if(this.props.onPositive())
      this.props.onPositive()

    this.close()
  }

  onNegative(){
    if(this.props.onNegative)
      this.props.onNegative()
    this.close()
  }


  render() {

    var SpinnyThing = null

    var Buttons = null

    switch(this.props.mode) {

      case ModalMode.CONFIRM:

        Buttons =
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <TouchableHighlight onPress={ () => this.onPositive() }>
              <View style={{
                padding: 15,
                borderRadius: 5,
                backgroundColor: Colours.secondary ,
                alignItems: 'center',
                justifyContent: 'center',
                width: 110,
                marginLeft: 10
              }}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: FontSizes.p}}>{this.props.modalPositiveText}</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={ () => this.onNegative() }>
              <View style={{
                padding: 15,
                borderRadius: 5,
                backgroundColor: Colours.secondary ,
                alignItems: 'center',
                justifyContent: 'center',
                width: 110,
                marginRight: 10
              }}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: FontSizes.p}}>{this.props.modalNegativeText}</Text>
              </View>
            </TouchableHighlight>
          </View>

          break

      case ModalMode.OKAY:

        Buttons =
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableHighlight onPress={ () => this.onPositive() }>
              <View style={{
                padding: 15,
                borderRadius: 5,
                backgroundColor: Colours.secondary ,
                alignItems: 'center',
                justifyContent: 'center',
                width: 200
              }}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: FontSizes.p}}>Okay</Text>
              </View>
            </TouchableHighlight>
          </View>

          break

      case ModalMode.WAITING:

        SpinnyThing =
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <ActivityIndicator
              animating={ true }
              style={{height: 80}}
              size="large"
            />
          </View>

        break
    }

    return (
      <Modal
        ref="modal"
        animationType={"fade"}
        transparent={true}
        visible={this.props.visible}
        onRequestClose={ this.close }
      >
        <View style={ styles.entireModal }>
            <View style={ [styles.visibleModal] }>
              <View style={ { flex: 1, justifyContent: 'space-between'} }>

                <Text style={ styles.text }>
                  { this.props.text || "NO_TEXT_GIVEN" }
                </Text>

                {SpinnyThing}

                {Buttons}

              </View>
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
    backgroundColor: '#5f5f5f',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 8
  },
  text: {
    color: 'white',
    padding: 15,
    fontSize: FontSizes.h6,
    textAlign: 'center'
  }
})
