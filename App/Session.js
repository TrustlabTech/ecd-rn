/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Werner Roets <werner@io.co.za>
 */

import Config from './Config'

/**
 * A static class to store and retrieve a global state
 */
export default class Session {

  static changes = []
  static lastState = {}

  /**
   * Return an Object representing the current state
   * @returns {Object} data The current state held in the store
   */
  static getState() {
    // Merge changes since last retrieval into state
    const lastState = this.changes.reduce(
      (a, x) => Object.assign(a,x),
      this.lastState
    )
    // Reset array of changes
    this.changes = []
    this.lastState = lastState
    return lastState
  }
  /**
   * Update the current state
   * @param {Object} data Data to modify or put into the store
   * @returns {undefined}
   * @throws {string} Update only accepts objects
   */
  static update(data) {
    if(typeof data === 'object')
      this.changes.push(data)
    else
      throw 'Update only accepts objects'
  }

}

Object.defineProperty(Session, 'changes',{
  writable: false,
  enumerable: true
})
