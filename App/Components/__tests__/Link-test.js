import 'react-native'
import React from 'react'
import Link from '../Link'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <Link text="Test link" onPress={() => ({}) }/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})