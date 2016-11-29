import 'react-native'
import React from 'react'
import NavBar from '../NavBar'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <NavBar
      navigator={ {} }
      leftButtonText="Back"
      leftButtonAction={ () => ({}) }
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})