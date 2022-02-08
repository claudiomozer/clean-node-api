import {
  LoadSurveyResult,
  SurveyResultModel,
  LoadSurveyResultRepository
} from './db-load-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return await Promise.resolve({
      surveyId: 'string',
      question: 'string',
      answers: [{
        answer: 'teste',
        percent: 0,
        count: 0
      }],
      date: new Date()
    })
  }
}
