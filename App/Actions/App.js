/*
 * Early Childhood Development
 * (c) 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * Author: Werner Roets <werner@io.co.za>
 */


import Config from '../Config'

debugAction = (action, data) => {
  console.log(action, data)
}

export const AppActions = {
  APP_SET_USER: 'APP_SET_USER',
  APP_SET_CENTRE: 'APP_SET_CENTRE',
  APP_SET_CLASS: 'APP_SET_CLASS',
  APP_SET_MODAL: 'APP_SET_MODAL'
}

export function setUser(userData) {

  if(Config.debug && Config.debugAction)
    debugAction(AppActions.APP_SET_USER, userData)

  return {
    type: 'APP_SET_USER',
    userData: userData
  }
}

export function setCentre(centreData) {

  if(Config.debug && Config.debugAction)
    debugAction(AppActions.APP_SET_CENTRE, centreData)

  return {
    type: 'APP_SET_CENTRE',
    centreData: centreData
  }
}

export function setClass(classData) {

  if(Config.debug && Config.debugAction)
    debugAction(AppActions.APP_SET_CLASS, classData)

  return {
    type: 'APP_SET_CLASS',
    classData: classData
  }
}

export function setModal(modalOptions) {

  if(Config.debug && Config.debugAction)
    debugAction (AppActions.APP_SET_MODAL, modalOptions)


  return {
    type: 'APP_SET_MODAL',
    modalOptions: modalOptions
  }
}