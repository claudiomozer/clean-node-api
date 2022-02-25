import { HashComparer, Hasher, Encrypter, Decrypter } from '@/data/protocols/criptography'
import faker from '@faker-js/faker'

export class HasherSpy implements Hasher {
  value: string
  encrypted = faker.datatype.uuid()
  async hash (value: string): Promise<string> {
    this.value = value
    return await Promise.resolve(value)
  }
}

export class HashComparerSpy implements HashComparer {
  value: string
  hash: string
  async compare (value: string, hash: string): Promise<boolean> {
    this.value = value
    this.hash = hash
    return true
  }
}

export class EncrypterSpy implements Encrypter {
  value: string
  token = faker.datatype.uuid()
  async encrypt (value: string): Promise<string> {
    this.value = value
    return this.token
  }
}

export class DecrypterSpy implements Decrypter {
  value: string
  decrypted = faker.random.word()
  async decrypt (value: string): Promise<string | null> {
    this.value = value
    return await Promise.resolve('decrypted')
  }
}
