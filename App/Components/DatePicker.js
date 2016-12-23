import React, { Component } from 'react'
import {
  View,
  Text,
  DatePickerAndroid
} from 'react-native'
import moment from 'moment'

export default class DatePicker extends Component {

  constructor(props) {
    super(props)
  }

  _friendlyDate() {
    if(this.state.dateOfBirth === null) {
      return ''
    } else {
      return moment(this.state.dateOfBirth).format('Do MMMM YYYY')
    }
  }

  render() {
    return (<View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginRight: 5}}>
              <View style={{
                width: 220,
                height: 50,
                marginRight: 3,
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: 5,
                paddingTop: 10
              }}>
                <Text style={{marginLeft: 8, fontSize: 20}}>
                  {this._friendlyDate(this.state.dateOfBirth)}
                </Text>

              </View>

              <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 5, paddingLeft: 5}}>
                <Button text="Select" width={80} onPress={ () => this._pickDateOfBirth() }/>
              </View>

            </View>)
    }
}