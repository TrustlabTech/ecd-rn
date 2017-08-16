/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

export * from './exceptions'

import * as Excpetions from './exceptions'

export class Request {

  constructor(returnParsedResponse = true) {
    this.error = {}
    this.response = {}
    this.parsedResponse = {}
    this.returnParsedResponse = returnParsedResponse
  }

  fetch = async (url, options) => {
    console.log(url) // eslint-disable-line no-console
    options.body && console.log(options.body) // eslint-disable-line no-console
    try {
      this.response = await fetch(url, options)
    } catch (e) {
      this.error = e
      console.log(e) // eslint-disable-line no-console
      throw new Excpetions.NetworkUnavailableException()
    }

    if (!this.response.ok) {
      if (this.response.status === 400 || this.response.status === 422)
        throw new Excpetions.BadRequestException()
      else if (this.response.status === 401)
        throw new Excpetions.UnauthorizedException()
      else if (this.response.status === 404)
        throw new Excpetions.ResourceNotFoundException()
      else
        throw new Excpetions.ServerErrorException()
    }

    try {
      this.parsedResponse = await this.response.json()
      return this.returnParsedResponse ? this.parsedResponse : true
    } catch (e) {
      console.log(e) // eslint-disable-line no-console
      throw new Excpetions.InvalidResponseFormatException('Invalid response. If you are connected to a public network or Hotspot, try to login first')
    }
  }

  getResponse = () => {
    return this.response
  }

  getError = () => {
    return this.error
  }
}