import { HashComparerSpy, EncrypterSpy, LoadAccountByEmailRepositorySpy, UpdateAcessTokenRepositorySpy } from '@/tests/data/mocks'
import { mockFakeAuthentication, throwError } from '@/tests/domain/mocks'
import { DbAuthentication } from '@/data/usecases/account/authentication/db-authentication'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateAccessTokenRepositorySpy: UpdateAcessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateAccessTokenRepositorySpy = new UpdateAcessTokenRepositorySpy()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
  )
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { loadAccountByEmailRepositorySpy, sut } = makeSut()
    await sut.auth(mockFakeAuthentication())
    expect(loadAccountByEmailRepositorySpy.email).toBe('any_email@email.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { loadAccountByEmailRepositorySpy, sut } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { loadAccountByEmailRepositorySpy, sut } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null))
    const model = await sut.auth(mockFakeAuthentication())
    expect(model).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { hashComparerSpy, sut } = makeSut()
    await sut.auth(mockFakeAuthentication())
    expect(hashComparerSpy.value).toBe('any_password')
    expect(hashComparerSpy.hash).toBe('any_password')
  })

  test('Should throw if HashComparer throws', async () => {
    const { hashComparerSpy, sut } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { hashComparerSpy, sut } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const model = await sut.auth(mockFakeAuthentication())
    expect(model).toBeNull()
  })

  test('Should call Encrypter with correct id', async () => {
    const { encrypterSpy, sut } = makeSut()
    await sut.auth(mockFakeAuthentication())
    expect(encrypterSpy.value).toBe('any_id')
  })

  test('Should throw if Encrypter throws', async () => {
    const { encrypterSpy, sut } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an AuthenticationModel on success', async () => {
    const { sut, encrypterSpy } = makeSut()
    const model = await sut.auth(mockFakeAuthentication())
    expect(model?.accessToken).toBe(encrypterSpy.token)
    expect(model?.name).toBe('any_name')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { updateAccessTokenRepositorySpy, encrypterSpy, sut } = makeSut()
    await sut.auth(mockFakeAuthentication())
    expect(updateAccessTokenRepositorySpy.id).toBe('any_id')
    expect(updateAccessTokenRepositorySpy.token).toBe(encrypterSpy.token)
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { updateAccessTokenRepositorySpy, sut } = makeSut()
    jest.spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken').mockImplementationOnce(throwError)
    const promise = sut.auth(mockFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
