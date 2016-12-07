/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */

export default class Util {

  /*
    * Takes a React.Component.displayName
    * and returns the class name of the component
    */
  static getClassFromDisplayName = displayName => {
    if(displayName && (typeof displayName) === 'string') {
      if(displayName.indexOf("Connect" !== -1)) {
        // This component is connected to redux

        return displayName.substring(
          displayName.indexOf("(")+1,
          displayName.indexOf(")"))
      } else {
        // This component is not connected to redux
        return displayName
      }
    } else {
      throw "Could not parse displayName"
    }
  }

  /*
    * Parse fileName to get the class
    */
  static getClassFromFileName = fileName => {
    if(fileName) {
      if(fileName.contains(".js")) {
        return fileName.substring(0,fileName.indexOf(".js"))
      } else {
        // invalid filetype
        throw "Invalid filetype. File must have the .js extension"
      }
    } else {
      throw "Could not parse fileName"
    }
  }

}
