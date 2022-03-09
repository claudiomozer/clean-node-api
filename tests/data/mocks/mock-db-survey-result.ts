import { SaveSurveyResultParams } from '@/domain/usecases'
import { SaveSurveyResultRepository, LoadSurveyResultRepository } from '@/data/protocols/db'
import { mockSurveyResult } from '@/tests/domain/mocks'

export class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepository {
  surveyId: string
  surveyResult = mockSurveyResult()
  async loadBySurveyId (surveyId: string): Promise<LoadSurveyResultRepository.Result> {
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
