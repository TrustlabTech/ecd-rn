import 'react-native'
import React from 'react'
import SceneHeading from '../SceneHeading'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <SceneHeading text="Test SceneHeading"/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})