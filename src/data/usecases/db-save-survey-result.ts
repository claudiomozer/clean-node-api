import { SaveSurveyResult } from '@/domain/usecases'
import { LoadSurveyResultRepository, SaveSurveyResultRepository } from '@/data/protocols/db'
import { MongoHelper } from '@/infra/db'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    await this.saveSurveyResultRepository.save(data)
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId)
    return MongoHelper.map(surveyResult)
  }
}
