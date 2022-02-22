import { mockSurveyResult } from '@/domain/test'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'

export class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepository {
  surveyId: string
  surveyResult = mockSurveyResult()
  async loadBySurveyId (surveyId: string): Promise<SurveyResultModel | null> {
    this.surveyId = surveyId
    return await Promise.resolve(this.surveyResult)
  }
}

export class SaveSurveyResultRepositorySpy implements SaveSurveyResultRepository {
  data: SaveSurveyResultParams
  async save (data: SaveSurveyResultParams): Promise<void> {
    this.data = data
    return await Promise.resolve()
  }
}
