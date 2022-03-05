import { mockAccountModel } from '@/tests/domain/mocks'
import { LoadAccountByToken, AddAccount, Authentication } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  account: AddAccount.Params
  accountModel = mockAccountModel()
  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    this.account = account
    return await Promise.resolve(this.accountModel)
  }
}

export class AuthenticationSpy implements Authentication {
  authentication: Authentication.Params
  authenticationModel = {
    accessToken: 'any_token',
    name: 'any_name'
  }

  async auth (authentication: Authentication.Params): Promise<Authentication.Result | null> {
    this.authentication = authentication
    return this.authenticationModel
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: string
  role: string | undefined
  accountModel = mockAccountModel()
  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken
    this.role = role
    return await Promise.resolve(this.accountModel)
  }
}
