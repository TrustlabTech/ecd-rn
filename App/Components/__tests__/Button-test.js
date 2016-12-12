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