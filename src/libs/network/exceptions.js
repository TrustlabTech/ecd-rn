/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

'use-strict'

// network not available
export const NET_UNAVAILABLE = 'NetworkUnavailableException'
export const NetworkUnavailableException = (message) => {
  this.name = NET_UNAVAILABLE
  this.message = message || 'Network unavailable'
}
NetworkUnavailableException.prototype = Error.prototype

// network available but server unreachable
export const INVALID_RESPONSE = 'InvalidResponseFormatException'
export function InvalidResponseFormatException(message) {
  this.name = INVALID_RESPONSE
  this.message = message || 'Invalid response'
}
InvalidResponseFormatException.prototype = Error.prototype

// 500
export const SERVER_ERROR = 'ServerErrorException'
export function ServerErrorException(message) {
  this.name = SERVER_ERROR
  this.message = message || 'Server error'
}
ServerErrorException.prototype = Error.prototype

// 400 || 422
export const BAD_REQUEST = 'BadRequestException'
export function BadRequestException(message) {
  this.name = BAD_REQUEST
  this.message = message || 'Invalid form data'
}
BadRequestException.prototype = Error.prototype

// 401
export const UNAUTHORIZED = 'UnauthorizedException'
export function UnauthorizedException(message) {
  this.name = UNAUTHORIZED
  this.message = message || 'Unauthorized'
}
UnauthorizedException.prototype = Error.prototype

// 404
export const RESOURCE_NOT_FOUND = 'ResourceNotFoundException'
export function ResourceNotFoundException(message) {
  this.name = RESOURCE_NOT_FOUND
  this.message = message || 'Resource not found'
}
ResourceNotFoundException.prototype = Error.prototype
