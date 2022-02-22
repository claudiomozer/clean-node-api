import { Validation } from '@/presentation/protocols/validation'

export class ValidationSpy implements Validation {
  input: any
  validate (input: any): Error | null {
    this.input = input
    return null
  }
}
