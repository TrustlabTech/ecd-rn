import Config from './Config'

export default {
  login: (phoneNumber, pin) => {

    const formData = new FormData()
    formData.append('username', phoneNumber)
    formData.append('password', pin)

    return fetch(Config.http.baseUrl + 'staff/login',{
      method: 'POST',
      body: formData
    })

    // Response received
    .then((response) => {
      return response.json()
    })

    // On reject
    .catch( (error) => {
      console.log('API:login', error)
      throw error.toString()
    })
  },

  register: (phoneNumber, pin, pinConfirm, firstName, lastName) => {
    const formData = new FormData()
    formData.append('username', phoneNumber)
    formData.append('password',pin)

    return fetch(Config.http.baseUrl + 'staff/register',{
      method: 'POST',
      body: formData
    }).then((response) => {
      return response.json()
    }).catch( (error) => {
      console.log("API:register", error)
      throw error.toString()
    })


  }
}