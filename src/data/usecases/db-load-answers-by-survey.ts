import { LoadAnswersBySurvey } from '@/domain/usecases'
import { LoadAnswersBySurveyRepository } from '@/data/protocols/db'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor (
    private readonly loadSurveyByIdRepository: LoadAnswersBySurveyRepository
  ) {}

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    const answers = await this.loadSurveyByIdRepository.loadAnswers(id)
    return answers
  }
}
