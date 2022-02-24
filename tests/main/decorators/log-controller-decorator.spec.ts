import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { serverError, ok } from '@/presentation/helpers/http/http-helpers'
import { mockAccountModel } from '@/tests/domain/mocks'
import { LogErrorRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await Promise.resolve(ok(mockAccountModel()))
    }
  }
  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositorySpy)
  return {
    sut,
    controllerStub,
    logErrorRepositorySpy
  }
}

describe('LogController Decorator', () => {
  test('Should LogControllerDecorator call handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(mockAccountModel()))
  })

  test('Should call LogErrorRepository with correct error if controller returns a ServerError', async () => {
    const { sut, controllerStub, logErrorRepositorySpy } = makeSut()
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(makeFakeServerError()))
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(logErrorRepositorySpy.stack).toBe('any_stack')
  })
})
