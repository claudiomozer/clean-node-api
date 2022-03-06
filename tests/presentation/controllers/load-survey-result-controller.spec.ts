import { mockSurveyResult, throwError } from '@/tests/domain/mocks'
import { CheckSurveyByIdSpy, LoadSurveyResultSpy } from '@/tests/presentation/mocks'
import { ok, forbidden, serverError } from '@/presentation/helpers/http/http-helpers'
import { InvalidParamError } from '@/presentation/errors'
import { LoadSurveyResultController } from '@/presentation/controllers'
import MockDate from 'mockdate'
import faker from '@faker-js/faker'

const mockRequest = (): LoadSurveyResultController.Request => ({
  surveyId: faker.datatype.uuid()
})

type SutTypes = {
  checkSurveyById: CheckSurveyByIdSpy
  loadSurveyResultSpy: LoadSurveyResultSpy
  sut: LoadSurveyResultController
}

const makeSut = (): SutTypes => {
  const checkSurveyById = new CheckSurveyByIdSpy()
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  const sut = new LoadSurveyResultController(checkSurveyById, loadSurveyResultSpy)
  return {
    checkSurveyById,
    loadSurveyResultSpy,
    sut
  }
}

describe('LoadSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call CheckurveyById with correct value', async () => {
    const { checkSurveyById, sut } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkSurveyById.id).toBe(request.surveyId)
  })

  test('Should return 403 if CheckurveyById returns false', async () => {
    const { checkSurveyById, sut } = makeSut()
    jest.spyOn(checkSurveyById, 'checkById').mockReturnValueOnce(Promise.resolve(false))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if SaveSurveyResult throws', async () => {
    const { sut, checkSurveyById } = makeSut()
    jest.spyOn(checkSurveyById, 'checkById').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should call LoadSurveyResult with correct value', async () => {
    const { loadSurveyResultSpy, sut } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadSurveyResultSpy.surveyId).toBe(request.surveyId)
  })

  test('Should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    jest.spyOn(loadSurveyResultSpy, 'load').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok(mockSurveyResult()))
  })
})
