/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import 'react-native'
import React from 'react'
import ScrollableWaitableView from '../ScrollableWaitableView'

import renderer from 'react-test-renderer'

it('renders correctly loaded', () => {
  const tree = renderer.create(
    <ScrollableWaitableView loaded={true}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly not loaded', () => {
  const tree = renderer.create(
    <ScrollableWaitableView loaded={false}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
