/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto@novalab.io>
 */

'use-strict'

// base libs
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import React, { Component } from 'react'

export default class List extends Component {
  keyExtractor = (item, index) => item

  render() {
    return (
      <FlatList
        {...this.props}
        data={this.props.data}
        style={[this.props.style]}
        keyExtractor={this.keyExtractor}
        renderItem={this.props.renderItem} />
    )
  }
}

List.propTypes = {
  data: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired
}