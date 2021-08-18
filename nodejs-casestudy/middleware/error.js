const httpStatusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
   }

class BaseError extends Error {
    constructor (statusCode, message) {
    super(message);
   
    Object.setPrototypeOf(this, new.target.prototype)
        this.statusCode = statusCode || 400;
        Error.captureStackTrace(this)
    }
}

module.exports = BaseError;
   