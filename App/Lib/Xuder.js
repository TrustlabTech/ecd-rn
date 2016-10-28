export default class Xuder {

  static updating = false

  // Prevents state update if already updating
  static setState(component, updates) {
    let begin = new Date().getTime()
    if(this.updating) return false // Not ready
    this.updating = true
    component.setState( updates, () => {
      this.updating = false
      console.log("XUDER setState Callback DONE:", new Date().getTime() - begin,"ms")
    })
    console.log("XUDER setState RUNTIME:", new Date().getTime() - begin,"ms")
    return true
  }


  static *statinator(data, component) {
    //queue state updates?
    while(true){
        yield this.setState(component, data)

    }
  }

}