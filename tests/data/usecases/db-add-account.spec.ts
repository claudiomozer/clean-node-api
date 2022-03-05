import { DbAddAccount } from '@/data/usecases'
import { mockAccountModel, mockAddAccountParams, throwError } from '@/tests/domain/mocks'
import { AddAccountRepositorySpy, HasherSpy, LoadNullAccountByEmailRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  loadNullAccountByEmailRepositorySpy: LoadNullAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const loadNullAccountByEmailRepositorySpy = new LoadNullAccountByEmailRepositorySpy()
  const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, loadNullAccountByEmailRepositorySpy)
  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    loadNullAccountByEmailRepositorySpy
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const accountData = mockAddAccountParams()
    await sut.add(accountData)
    expect(hasherSpy.value).toBe('any_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const accountData = mockAddAccountParams()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    const accountData = mockAddAccountParams()
    await sut.add(accountData)
    expect(addAccountRepositorySpy.addAccountParams).toEqual({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'add').mockImplementationOnce(throwError)
    const accountData = mockAddAccountParams()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return false if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadNullAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadNullAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(async () => {
      return await Promise.resolve(mockAccountModel())
    })
    const accountData = mockAddAccountParams()
    const result = await sut.add(accountData)
    expect(result).toBe(false)
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { loadNullAccountByEmailRepositorySpy, sut } = makeSut()
    await sut.add(mockAddAccountParams())
    expect(loadNullAccountByEmailRepositorySpy.email).toBe('any_email@email.com')
  })

  test('Should return an true on success', async () => {
    const { sut } = makeSut()
    const accountData = mockAddAccountParams()
    const result = await sut.add(accountData)
    expect(result).toBe(true)
  })
})
