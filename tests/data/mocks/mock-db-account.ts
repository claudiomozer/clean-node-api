import { AddAccountRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository, CheckAccountByEmailRepository } from '@/data/protocols/db'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/'
import { mockAccountModel } from '@/tests/domain/mocks'

export class AddAccountRepositorySpy implements AddAccountRepository {
  result = true
  addAccountParams: AddAccountRepository.Params
  async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.addAccountParams = account
    return await Promise.resolve(this.result)
  }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: string
  exists = false
  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return await Promise.resolve(this.exists)
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  accountModel = mockAccountModel()
  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return await Promise.resolve(this.accountModel)
  }
}

export class LoadNullAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  accountModel = null
  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return await Promise.resolve(this.accountModel)
  }
}

export class UpdateAcessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  token: string
  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  token: string
  role: string | undefined
  account = mockAccountModel()
  async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    this.token = token
    this.role = role
    return await Promise.resolve(this.account)
  }
}
