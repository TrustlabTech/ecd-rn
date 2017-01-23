/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

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
