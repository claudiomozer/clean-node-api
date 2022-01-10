import { InvalidParamError } from '../../errors'
import { Validation } from '../../protocols/validation'
import { EmailValidator } from '../../protocols/email-validator'

export class EmailValidation implements Validation {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly fieldName: string
  ) {}

  validate (input: any): Error | null {
    const isValid = this.emailValidator.isValid(input[this.fieldName])

    if (!isValid) {
      return new InvalidParamError('email')
    }
    return null
  }
}
