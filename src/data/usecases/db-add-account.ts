import { AddAccount } from '@/domain/usecases'
import { Hasher } from '@/data/protocols/criptography'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols/db'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const alreadyExists = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)
    if (!alreadyExists) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const result = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
      return result
    }
    return false
  }
}
