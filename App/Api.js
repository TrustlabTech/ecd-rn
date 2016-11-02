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

  register: (textFieldValues) => {

    const formData = new FormData()
    formData.append('phone_number', textFieldValues['phoneNumber'])
    formData.append('password',textFieldValues['pin'])
    formData.append('password_confirmation',textFieldValues['pinConfirm'])

    formData.append('did','UNKNOWN')
    formData.append('za_id_number','9106275014085')
    formData.append('family_name', textFieldValues['lastName'])
    formData.append('given_name',textFieldValues['firstName'])
    formData.append('principle', 0)
    formData.append('practitioner', 0)
    formData.append('volunteer', 0)
    formData.append('cook', 0)
    formData.append('other',1)
    formData.append('registration_latitude','31.71291600')
    formData.append('registration_longitude','-168.07973000')
    formData.append('ecd_qualification_id',1)
    formData.append('centre_id',1)



    return fetch(Config.http.baseUrl + 'staff/register',{
      method: 'POST',
      body: formData
    }).then((response) => {
      return response.json()
    }).catch( (error) => {
      console.log("API:register", error)
      throw error.toString()
    })


  },

  fetchCentres: () => {
    return fetch(Config.http.baseUrl + 'centre',{
      method: 'GET'
    }).then((response) => {
      return response.json()
    }).catch( (error) => {
      console.log("API:fetchCentres",error)
      throw error.toString()
    })
  }
}