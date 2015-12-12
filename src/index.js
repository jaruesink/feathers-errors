// import util from 'util';
import makeDebug from 'debug';

const debug = makeDebug('feathers-errors');

class AbstractError extends Error {
  constructor(msg, name, code, className, data) {
    msg = msg || 'Error';

    let errors;
    let message;

    if (msg instanceof Error) {
      message = msg.message || 'Error';

      // NOTE (EK): This is typically to handle errors
      // that are thrown from other modules. For example,
      // Mongoose validations can return multiple errors.
      if (msg.errors) {
        errors = msg.errors;
      }
    }
    // Support plain old objects
    else if (typeof msg === 'object') {
      message = msg.message || 'Error';
      errors = msg.errors ? msg.errors : msg;
    }
    // message is just a string
    else {
      message = msg;
    }

    super(message);

    // NOTE (EK): Babel doesn't support this so
    // we have to pass in the class name manually.
    // this.name = this.constructor.name;
    this.name = name;
    this.message = message;
    this.code = code;
    this.className = className;
    this.data = data;
    this.errors = errors;

    Error.captureStackTrace(this, this.name);
    
    debug(`${this.name}(${this.code}): ${this.message}`);
  }
}

class BadRequest extends AbstractError {
  constructor(message, data) {
    super(message, 'BadRequest', 400, 'bad-request', data);
  }
}

class NotAuthenticated extends AbstractError {
  constructor(message, data) {
    super(message, 'NotAuthenticated', 401, 'not-authenticated', data);
  }
}

class PaymentError extends AbstractError {
  constructor(message, data) {
    super(message, 'PaymentError', 402, 'payment-error', data);
  }
}

class Forbidden extends AbstractError {
  constructor(message, data) {
    super(message, 'Forbidden', 403, 'forbidden', data);
  }
}

class NotFound extends AbstractError {
  constructor(message, data) {
    super(message, 'NotFound', 404, 'not-found', data);
  }
}

class MethodNotAllowed extends AbstractError {
  constructor(message, data) {
    super(message, 'MethodNotAllowed', 405, 'method-not-allowed', data);
  }
}

class NotAcceptable extends AbstractError {
  constructor(message, data) {
    super(message, 'NotAcceptable', 406, 'not-acceptable', data);
  }
}

class Timeout extends AbstractError {
  constructor(message, data) {
    super(message, 'Timeout', 408, 'timeout', data);
  }
}

class Conflict extends AbstractError {
  constructor(message, data) {
    super(message, 'Conflict', 409, 'conflict', data);
  }
}

class Unprocessable extends AbstractError {
  constructor(message, data) {
    super(message, 'Unprocessable', 422, 'unprocessable', data);
  }
}

class GeneralError extends AbstractError {
  constructor(message, data) {
    super(message, 'GeneralError', 500, 'general-error', data);
  }
}

class NotImplemented extends AbstractError {
  constructor(message, data) {
    super(message, 'NotImplemented', 501, 'not-implemented', data);
  }
}

class Unavailable extends AbstractError {
  constructor(message, data) {
    super(message, 'Unavailable', 503, 'unavailable', data);
  }
}

var errors = {
  BadRequest,
  NotAuthenticated,
  PaymentError,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  NotAcceptable,
  Timeout,
  Conflict,
  Unprocessable,
  GeneralError,
  NotImplemented,
  Unavailable
};

var types = errors;

// // Abstract Error
// let AbstractError = (msg, constr, data) => {
//   Error.captureStackTrace(this, constr || this);

//   if (msg instanceof Error) {
//     this.message = msg.message;

//     if (msg.errors) {
//       this.errors = msg.errors;
//     }
//   }
//   else {
//     this.message = msg || 'Error';
//   }
  
//   this.data = data;
// };

// util.inherits(AbstractError, Error);
// AbstractError.prototype.name = 'Abstract Error';

// let createError = (errorName, code, className) => {
//   let errorFn = (msg, data) => {
//     debug(`Feathers Error: ${errorName}(${code}): ${msg}`);
//     errorFn.super_.call(this, msg, this.constructor, data);
//   };

//   util.inherits(errorFn, AbstractError);

//   errorFn.prototype.name = errorName;
//   errorFn.prototype.code = code;
//   errorFn.prototype.className = className;

//   errors[errorName] = errorFn;
// };

// createError('BadRequest', 400, 'bad-request');
// createError('NotAuthenticated', 401, 'not-authenticated');
// createError('PaymentError', 402, 'payment-error');
// createError('Forbidden', 403, 'forbidden');
// createError('NotFound', 404, 'not-found');
// createError('MethodNotAllowed', 405, 'method-not-allowed');
// createError('NotAcceptable', 406, 'not-acceptable');
// createError('Timeout', 408, 'timeout');
// createError('Conflict', 409, 'conflict');
// createError('Unprocessable', 422, 'unprocessable');
// createError('GeneralError', 500, 'error');
// createError('NotImplemented', 501, 'not-implemented');
// createError('Unavailable', 503, 'unavailable');

export { errors, types };
