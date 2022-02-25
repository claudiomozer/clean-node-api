import { SurveyResultModel } from '@/domain/models'
import { LoadSurveyResult } from '@/domain/usecases'
import { LoadSurveyByIdRepository, LoadSurveyResultRepository } from '@/data/protocols/db'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyById: LoadSurveyByIdRepository
  ) {}

  async load (surveyId: string): Promise<SurveyResultModel | null> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (!surveyResult) {
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (survey) {
        surveyResult = {
          surveyId: survey.id,
          question: survey.question,
          date: survey.date,
          answers: survey.answers.map(answer => Object.assign({}, answer, {
            count: 0,
            percent: 0
          }))
        }
      }
    }
    return surveyResult
  }
}
