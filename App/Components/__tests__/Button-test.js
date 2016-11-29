import 'react-native'
import React from 'react'
import Button from '../Button'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <Button text="Test" onPress={ () => {}}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})