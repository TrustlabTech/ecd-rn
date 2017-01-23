/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native'
import { Button } from './'
import moment from 'moment'

export default class DatePicker extends Component {

  _friendlyDate() {
    if (this.props.dateOfBirth === null) {
      return 'Tap to select'
    } else {
      return moment(this.props.dateOfBirth).format('Do MMMM YYYY')
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginRight: 5, paddingTop: 5 }}>
          <View style={{
            flex: 1,
            height: 50,
            marginRight: 3,
            borderWidth: 1,
            borderStyle: 'solid',
            borderRadius: 5,
            paddingTop: 10
          }}>
            <Text style={{ marginLeft: 8, fontSize: 18 }}>
              {this._friendlyDate(this.props.dateOfBirth)}
            </Text>

          </View>

          <View style={{ paddingRight: 5, paddingLeft: 5 }}>
            <Button text="Select" width={100} onPress={() => this.props.onPress()} />
          </View>

        </View>
      </TouchableWithoutFeedback>
    )
  }
}

DatePicker.propTypes = {
  dateOfBirth: React.PropTypes.string,
  onPress: React.PropTypes.func
}
