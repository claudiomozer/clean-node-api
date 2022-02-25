import { AccountModel } from '@/domain/models'
import { LoadAccountByToken } from '@/domain/usecases'
import { Decrypter } from '@/data/protocols/criptography'
import { LoadAccountByTokenRepository } from '@/data/protocols/db'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel | null> {
    let tokenDecrypted: string | null
    try {
      tokenDecrypted = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }
    if (tokenDecrypted) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
