/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

export default class Session {

  static changes = []
  static lastState = {}

  static getState() {
    const lastState = this.changes.reduce(
      (a, x) => Object.assign(a,x),
      this.lastState
    )
    this.changes = []
    this.lastState = lastState
    return lastState
  }

  static update(value) {
    if(typeof value === 'object')
      this.changes.push(value)
    else
      throw 'Update only accepts objects'
  }

  static showChanges() {
    this.changes.forEach((x)=> console.log(x))
  }
}

Object.defineProperty(Session, 'changes',{
  writable: false,
  enumerable: true
})
