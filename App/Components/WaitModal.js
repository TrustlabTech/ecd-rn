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
  }


  // close() {
  //   this.props.dispatch(appActions.setModal({modalVisible: false}))
  // }

  onPositive(){
    if(this.props.onPositive)
      this.props.onPositive()
  }

  onNegative(){
    if(this.props.onNegative)
      this.props.onNegative()
  }


  render() {

    var SpinnyThing =
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
            <TouchableHighlight
              style={{ borderRadius: 5, marginLeft: 10 }}
              underlayColor={'white'}
              onPress={ () => this.onPositive() }
            >
              <View style={{
                padding: 15,
                borderRadius: 5,
                backgroundColor: Colours.primary ,
                alignItems: 'center',
                justifyContent: 'center',
                width: 110,
              }}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: FontSizes.p}}>
                  {this.props.modalPositiveText || "Yes"}
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={{ marginRight: 10, borderRadius: 5 }}
              underlayColor={'white'}
              onPress={ () => this.onNegative() }
            >
              <View style={{
                padding: 15,
                borderRadius: 5,
                backgroundColor: Colours.primary ,
                alignItems: 'center',
                justifyContent: 'center',
                width: 110,
              }}>
                <Text style={{color: Colours.offWhite, fontWeight: 'bold', fontSize: FontSizes.p}}>
                  {this.props.modalNegativeText || "No"}
                </Text>
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
            <TouchableHighlight style={{ borderRadius: 5 }}
              underlayColor={'white'}
              onPress={ () => this.onPositive() }
            >
              <View style={{
                padding: 15,
                borderRadius: 5,
                backgroundColor: Colours.primary ,
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
        animationType={"none"}
        transparent={true}
        visible={this.props.visible}
        onRequestClose={ () => alert('request modal close') }
      >
        <View style={ styles.entireModal }>
            <View style={ [styles.visibleModal] }>
              <View style={ { flex: 1, justifyContent: 'space-between'} }>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={ [styles.text] }>
                    { this.props.text || "NO_TEXT_GIVEN" }
                  </Text>
                </View>
                  {SpinnyThing}
                <View style={{flex: 1}}>
                  {Buttons}
                </View>
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
    flexDirection: 'column',
    padding: 20
  },
  visibleModal: {
    borderColor: Colours.secondary,
    borderWidth: 1,
    elevation: 3,
    height: 240,
    width: 250,
    backgroundColor: Colours.secondary,
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
