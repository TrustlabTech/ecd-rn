import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import HistoryChildItem from './HistoryChildItem'

export default class HistoryDayItem extends Component {
  /*
    absentChildren : array
    date : string
    totalChildren : number
  */
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <View>
          <Text>{this.props.date} ({ (this.props.totalChildren - this.props.absentChildren.length )+"/"+(this.props.totalChildren) })</Text>
        </View>
        <View>
          {this.props.absentChildren.map( (x, i ) => (<HistoryChildItem key={i} givenName={x.given_name} familyName={x.family_name} className={x.class_name}/>)) || null}
        </View>
      </View>
    )
  }
}