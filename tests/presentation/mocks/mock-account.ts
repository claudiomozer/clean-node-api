import { mockAccountModel } from '@/tests/domain/mocks'
import { AccountModel } from '@/domain/models/account'
import { LoadAccountByToken, AddAccount, AddAccountParams, Authentication, AuthenticationParams } from '@/domain/usecases'
import { AuthenticationModel } from '@/domain/models/authentication'

export class AddAccountSpy implements AddAccount {
  account: AddAccountParams
  accountModel = mockAccountModel()
  async add (account: AddAccountParams): Promise<AccountModel | null> {
    this.account = account
    return await Promise.resolve(this.accountModel)
  }
}

export class AuthenticationSpy implements Authentication {
  authentication: AuthenticationParams
  authenticationModel = {
    accessToken: 'any_token',
    name: 'any_name'
  }

  async auth (authentication: AuthenticationParams): Promise<AuthenticationModel | null> {
    this.authentication = authentication
    return this.authenticationModel
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: string
  role: string | undefined
  accountModel = mockAccountModel()
  async load (accessToken: string, role?: string): Promise<AccountModel | null> {
    this.accessToken = accessToken
    this.role = role
    return await Promise.resolve(this.accountModel)
  }
}
