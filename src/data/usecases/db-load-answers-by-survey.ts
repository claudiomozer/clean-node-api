import { LoadAnswersBySurvey } from '@/domain/usecases'
import { LoadSurveyByIdRepository } from '@/data/protocols/db'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    if (!survey) {
      return []
    }
    return survey.answers.map(a => a.answer)
  }
}
