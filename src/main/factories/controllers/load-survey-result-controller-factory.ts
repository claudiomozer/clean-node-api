import { Controller } from '@/presentation/protocols/controller'
import { LoadSurveyResultController } from '@/presentation/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSurveyById, makeDbLoadSurveyResult } from '@/main/factories/usecases'

export const makeLoadSurveyResultController = (): Controller => {
  const surveyController = new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(surveyController)
}
