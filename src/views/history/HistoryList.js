/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

// base libs
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
// components / views
import List from '../../components/List'
import Picker from '../../components/Picker'
// libs/functions
import { Request } from '../../libs/network'
// constants
import { COLORS, GET_ATTENDANCE_HISTORY } from '../../constants'

const MONTHS = [
  { id: '00', month: 'Select a month' },
  { id: '01', month: 'January' }, { id: '02', month: 'February' }, { id: '03', month: 'March' },
  { id: '04', month: 'April' }, { id: '05', month: 'May' }, { id: '06', month: 'June' },
  { id: '07', month: 'July' }, { id: '08', month: 'August' }, { id: '09', month: 'September' },
  { id: '10', month: 'October' }, { id: '11', month: 'November' }, { id: '12', month: 'December' },
]

export default class HistoryList extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      month: 0,
      attendances: [],
      loading: false,
    }

    this.onClassSelectedChange = this.onClassSelectedChange.bind(this)
  }

  async onClassSelectedChange(monthid) {
    this.setState({ loading: true })
    const
      request = new Request(),
      { session } = this.props,
      monthIndex = MONTHS.findIndex(f => f.id === monthid),
      { url, options } = GET_ATTENDANCE_HISTORY(session.token, session.user.centre_id,
                                                    new Date().getFullYear(), MONTHS[monthIndex].id)
    
    try {
      const attendances = await request.fetch(url, options)

      this.setState({ loading: false, month: monthIndex, attendances: attendances.filter(f => f.class_name === this.props.className) })
    } catch (e) {
      console.log(e) // eslint-disable-line no-console
      this.setState({ loading: false, month: monthIndex, attendances: [] })
    }
  }

  renderItem({ item }) {
    return (
      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.rowTextTitle}>{item.given_name} {item.family_name}</Text>
          <Text style={styles.rowTextDesc}>{item.attendance_date.split(' ')[0]}</Text>
        </View>
        <Text style={styles.rowTextTitle}>{item.attended === 1 ? 'Present' : 'Absent'}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Picker
          items={MONTHS}
          onValueChange={this.onClassSelectedChange}
          selectedValue={MONTHS[this.state.month].id}
          pickerLabelDataAttribute={(item) => item.month} />
          <List
            style={styles.list}
            renderItem={this.renderItem}
            data={this.state.attendances}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `att-${index}`} />
          {
            this.state.loading && (
              <ActivityIndicator
                animating
                size="large"
                style={{ height: 60, alignSelf: 'center' }} />
            )
          }
      </View>
    )
  }
}
HistoryList.propTypes = {
  session: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  classId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.greyWhite,
  },
  list: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  rowContainer: {
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    borderBottomColor: COLORS.lightGrey,
  },
  rowTextTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.darkGrey2,
  },
  rowTextDesc: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.grey,
  },
})
