export default class LoginLogic {


  static attempt(username, password) {
    // Here we return what we want to update in the state
    console.log('LoginLogic::attempting')
    return {
      attempting: true
    }
  }

  static success() {
    return {
      attempting: false
    }
  }

  static failure() {
    return {
      attempting: false
    }
  }
}
