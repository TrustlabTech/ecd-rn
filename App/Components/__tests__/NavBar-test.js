/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import 'react-native'
import React, { Component } from 'react'
import { StatusBar } from 'react-native'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  // Waiting for StatusBarManager mock
  // https://github.com/facebook/react-native/commit/39554ab32cdeaab4bbb48d98215ccf2413721b85
  const tree = renderer.create(
    <StatusBar
      backgroundColor="silver"
      barStyle="default"
    />
  )

  expect(tree).toMatchSnapshot()
})
