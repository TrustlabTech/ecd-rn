// import mergeChange from 'immutability-helper'

export default class Session {

  static changes = []

  static getState() {
    return new Promise((resolve, reject) => {
      resolve(this.changes.reduce((a, x) => Object.assign(a,x),{}))
    })
  }

  static update(value) {
    this.changes.push(value)
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