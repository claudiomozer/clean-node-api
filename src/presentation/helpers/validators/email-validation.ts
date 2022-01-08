import { InvalidParamError } from '../../errors'
import { Validation } from './validation'
import { EmailValidator } from '../../protocols/email-validator'

export class EmailValidation implements Validation {
  private readonly fieldName: string
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator, fieldName: string) {
    this.fieldName = fieldName
    this.emailValidator = emailValidator
  }

  validate (input: any): Error | null {
    const isValid = this.emailValidator.isValid(input[this.fieldName])

    if (!isValid) {
      return new InvalidParamError('email')
    }
    return null
  }
}
