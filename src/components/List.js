/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

// base libs
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import React, { Component } from 'react'

export default class List extends Component {
  keyExtractor(item) { return item.id }

  render() {
    return (
      <FlatList
        {...this.props}
        data={this.props.data}
        style={this.props.style}
        renderItem={this.props.renderItem}
        keyExtractor={this.props.keyExtractor || this.keyExtractor} />
    )
  }
}

List.propTypes = {
  keyExtractor: PropTypes.func,
  data: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired
}
