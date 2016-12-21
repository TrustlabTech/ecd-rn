/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native'
import HistoryChildItem from './HistoryChildItem'
import { FontSizes, Colours} from '../../GlobalStyles'
import moment from 'moment'

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

  _toggleChildItemsVisible = () => {
    if(this.props.absentChildren.length > 0)
      this.setState({childItemsVisible: !this.state.childItemsVisible})
  }




  makeHistoryChildItems = absentChildren =>
    this.state.childItemsVisible ?
      (<View>
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
    :
      null



  render() {
    return (
      <View style={{marginBottom: 5}}>

        <View>
          <TouchableHighlight onPress={() => this._toggleChildItemsVisible() }>
            <View style={{flex: 1}}>
              <Text style={{fontSize: FontSizes.h5, backgroundColor: Colours.sceneBackgroundColour}}>
                {this.props.day + " " + moment(new Date(0,this.props.month - 1)).format("MMMM")} ({ (this.props.totalChildren - this.props.absentChildren.length )+"/"+(this.props.totalChildren) })
              </Text>
            </View>
          </TouchableHighlight>
        </View>


        <View style={{marginLeft: 10}}>
          {this.makeHistoryChildItems(this.props.absentChildren)}

        </View>

      </View>
    )
  }
}