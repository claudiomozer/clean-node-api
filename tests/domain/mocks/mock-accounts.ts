import { AccountModel } from '@/domain/models'
import { AddAccount, Authentication } from '@/domain/usecases'

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

export const mockFakeAuthentication = (): Authentication.Params => ({
  email: 'any_email@email.com',
  password: 'any_password'
})
