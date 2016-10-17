import { StyleSheet } from 'react-native'

// our colours
// http://colorschemedesigner.com/csd-3.5/#3s21.tmE7FDYL
export default StyleSheet.create({
  // Text
  h1: {
    fontSize: 46,
    color: '#2f4f4f'
  },
  h2: {
    fontSize: 38
  },
  h3: {
    fontSize: 32,
    color: '#3f3f3f'
  },
  h4: {
    fontSize: 26
  },
  h5: {
    fontSize: 20
  },
  inputLabel: {
    fontSize: 20,
    color: 'dimgray'
  },
  // Views
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  //Components
  textInput : {
    borderColor: 'gainsboro',
    borderRadius: 5,
    borderWidth: 2,
    height: 40,
    paddingLeft: 10
  }
})