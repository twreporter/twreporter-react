'use strict'
import ExtendableError from 'es6-error'

class FatalError extends ExtendableError {
  constructor(message) {
    super(message)
  }
}

class NotFoundError extends FatalError {
  constructor(props) {
    super(props)
    this.status = 404
  }
  getStatus() {
    return this.status
  }
}

class InternalServerError extends FatalError {
  constructor(props) {
    super(props)
    this.status = 500
  }
  getStatus() {
    return this.status
  }
}

export {  FatalError, InternalServerError, NotFoundError }
