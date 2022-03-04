import { AccountModel } from '@/domain/models'
import { AddAccount, AuthenticationParams } from '@/domain/usecases'

export const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

export const mockFakeAuthentication = (): AuthenticationParams => ({
  email: 'any_email@email.com',
  password: 'any_password'
})
