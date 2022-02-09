import { mockSurveyResult } from '@/domain/test'
import {
  LoadSurveyResult,
  SurveyResultModel,
  LoadSurveyResultRepository,
  LoadSurveyByIdRepository
} from './db-load-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyById: LoadSurveyByIdRepository
  ) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (!surveyResult) {
      await this.loadSurveyById.loadById(surveyId)
    }
    return mockSurveyResult()
  }
}
