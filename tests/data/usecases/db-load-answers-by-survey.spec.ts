import { DbLoadAnswersBySurvey } from '@/data/usecases'
import { throwError } from '@/tests/domain/mocks'
import { LoadAnswersBySurveyRepositorySpy } from '@/tests/data/mocks'
type SutTypes = {
  sut: DbLoadAnswersBySurvey
  loadAnswersBySurveyRepositorySpy: LoadAnswersBySurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAnswersBySurveyRepositorySpy = new LoadAnswersBySurveyRepositorySpy()
  const sut = new DbLoadAnswersBySurvey(loadAnswersBySurveyRepositorySpy)

  return {
    sut,
    loadAnswersBySurveyRepositorySpy
  }
}

describe('DbLoadSurveyById', () => {
  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    await sut.loadAnswers('any_survey_id')
    expect(loadAnswersBySurveyRepositorySpy.id).toBe('any_survey_id')
  })

  test('Should return answers on success', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    const answers = await sut.loadAnswers('any_id')
    expect(answers).toEqual(loadAnswersBySurveyRepositorySpy.result)
  })

  test('Should return empty array if LoadAnswersBySurveyRepositorySpy returns []', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    loadAnswersBySurveyRepositorySpy.result = []
    const answers = await sut.loadAnswers('any_id')
    expect(answers).toEqual([])
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    jest.spyOn(loadAnswersBySurveyRepositorySpy, 'loadAnswers').mockImplementationOnce(throwError)
    const promise = sut.loadAnswers('any_id')
    await expect(promise).rejects.toThrow()
  })
})
