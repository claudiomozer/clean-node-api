import { CheckSurveyById } from '@/domain/usecases'
import { CheckSurveyByIdRepository } from '@/data/protocols/db'

export class DbCheckSurveyById implements CheckSurveyById {
  constructor (
    private readonly loadSurveyByIdRepository: CheckSurveyByIdRepository
  ) {}

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    const exists = await this.loadSurveyByIdRepository.checkById(id)
    return exists
  }
}
