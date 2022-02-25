import { Controller } from '@/presentation/protocols/controller'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { SaveSurveyResultController } from '@/presentation/controllers'
import { makeDbLoadSurveyById, makeDbSaveSurveyResult } from '@/main/factories/usecases'

export const makeSaveSurveyResultController = (): Controller => {
  const surveyController = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(surveyController)
}
