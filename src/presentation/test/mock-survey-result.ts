import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResult } from '@/domain/test'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class LoadSurveyByIdStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResult())
    }
  }
  return new LoadSurveyByIdStub()
}
