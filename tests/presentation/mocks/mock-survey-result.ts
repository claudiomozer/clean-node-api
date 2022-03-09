import { SaveSurveyResult, SaveSurveyResultParams, LoadSurveyResult } from '@/domain/usecases'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResult } from '@/tests/domain/mocks'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  data: SaveSurveyResultParams
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.data = data
    return await Promise.resolve(mockSurveyResult())
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyId: string
  async load (surveyId: string): Promise<LoadSurveyResult.Result> {
    this.surveyId = surveyId
    return await Promise.resolve(mockSurveyResult())
  }
}
