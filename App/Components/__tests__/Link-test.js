/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import 'react-native'
import React from 'react'
import Link from '../Link'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <Link text="Test link" onPress={() => ({})} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
