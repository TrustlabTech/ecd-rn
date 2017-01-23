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
  TouchableNativeFeedback,
  ToastAndroid
} from 'react-native'
import { HistoryChildItem } from './'
import { FontSizes } from '../GlobalStyles'
import moment from 'moment'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class HistoryDayItem extends Component {
  /*
    absentChildren : array
    date : string
    totalChildren : number
  */
  constructor(props) {
    super(props)
    this.state = {
      childItemsVisible: false
    }
  }

  _toggleChildItemsVisible() {
    if (this.props.absentChildren.length > 0) {
      this.setState({ childItemsVisible: !this.state.childItemsVisible })
    } else {
      ToastAndroid.show('Nobody absent on this day', ToastAndroid.SHORT)
    }
  }

  makeHistoryChildItems(absentChildren) {
    return this.state.childItemsVisible
      ? (
        <View>
          <Text>Absent:</Text>
          {absentChildren.map((x, i) =>
            (<HistoryChildItem
              key={i}
              index={i + 1}
              givenName={x.given_name}
              familyName={x.family_name}
              className={x.class_name}
            />)
          )}
        </View>)
      : null
  }

  render() {
    return (
      <View style={{ marginBottom: 5 }}>

        <View style={{ flexDirection: 'row' }}>
          <TouchableNativeFeedback onPress={() => this._toggleChildItemsVisible()}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                {
                  this.state.childItemsVisible
                  ? <Icon name="chevron-down" size={25} />
                  : <Icon name="chevron-right" size={25} />
                }
              </View>
              <View>
                <Text style={{ fontSize: FontSizes.h5 }}>
                  {this.props.day + ' ' + moment(new Date(0, this.props.month - 1)).format('MMMM')}
                  ({ (this.props.totalChildren - this.props.absentChildren.length) + '/ ' + (this.props.totalChildren) })
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
          <View style={{ flex: 2 }} />
        </View>


        <View style={{ marginLeft: 10 }}>
          {this.makeHistoryChildItems(this.props.absentChildren)}

        </View>

      </View>
    )
  }
}

HistoryDayItem.propTypes = {
  month: React.PropTypes.number,
  day: React.PropTypes.number,
  absentChildren: React.PropTypes.array,
  totalChildren: React.PropTypes.number
}
