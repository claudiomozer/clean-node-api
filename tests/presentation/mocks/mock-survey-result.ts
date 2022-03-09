import { SaveSurveyResult, LoadSurveyResult } from '@/domain/usecases'
import { mockSurveyResult } from '@/tests/domain/mocks'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  data: SaveSurveyResult.Params
  async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
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
