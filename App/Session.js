// import mergeChange from 'immutability-helper'

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


/*
usage:
  const userId = Session.get().userId

*/