import 'react-native'
import React from 'react'
import MainScene from '../MainScene'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <MainScene modal={jest.fn()} route={jest.fn()} navigator={jest.fn()} gaTrackers={{}}  />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})