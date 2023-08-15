/**
 * Object type for Custom errors
 * @typedef {Object} CustomError Object
 * @property {string} name - class of error from outside.
 * @property {string} internalName - class of error from inside (like BadRequest, etc.).
 * @property {string} methodPath - method origin of the error
 * @property {string} message - detail of error text
 * @property {string} stack - Stack call trace from base code call
 */
export class CustomError extends Error {
  internalName: any;
  method: any;
  /**
   * @constructs CustomError
   * @param {Error} err inherited error class
   * @param {string} methodPath  method origin of the error
   * @param {string} classError class of error from our code
   */
  constructor(err: any, methodPath: any, classError: any) {
    super();
    const { name, message, stack } = err;

    // eslint-disable-next-line
    this.name = name;
    // eslint-disable-next-line
    this.message = message;
    // eslint-disable-next-line
    this.stack = stack;
    // eslint-disable-next-line
    this.internalName = classError;
    // eslint-disable-next-line
    this.method = methodPath;
  }
}
