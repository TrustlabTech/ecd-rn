/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import 'react-native'
import React from 'react'
import Button from '../Button'

import renderer from 'react-test-renderer'

it('renders correctly minimal', () => {
  const tree = renderer.create(
    <Button text="Test" onPress={ () => {}}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly disabled', () => {
  const tree = renderer.create(
    <Button text="Test" disabled={true} onPress={ () => {}}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
