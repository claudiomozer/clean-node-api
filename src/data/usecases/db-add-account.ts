import { AddAccount } from '@/domain/usecases'
import { Hasher } from '@/data/protocols/criptography'
import { AddAccountRepository, LoadAccountByEmailRepository } from '@/data/protocols/db'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const result = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
      return result
    }
    return false
  }
}
