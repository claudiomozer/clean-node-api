import { Controller } from '@/presentation/protocols/controller'
import { LoadSurveyResultController } from '@/presentation/controllers'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbCheckSurveyById, makeDbLoadSurveyResult } from '@/main/factories/usecases'

export const makeLoadSurveyResultController = (): Controller => {
  const surveyController = new LoadSurveyResultController(makeDbCheckSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(surveyController)
}
