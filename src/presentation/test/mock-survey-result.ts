import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResult } from '@/domain/test'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  data: SaveSurveyResultParams
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.data = data
    return await Promise.resolve(mockSurveyResult())
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyId: string
  async load (surveyId: string): Promise<SurveyResultModel | null> {
    this.surveyId = surveyId
    return await Promise.resolve(mockSurveyResult())
  }
}
