export default class AppError extends Error {
  constructor (message, codeTxt, code) {
    super(message)
    this.codeTxt = codeTxt
    this.code = code
  }
}
