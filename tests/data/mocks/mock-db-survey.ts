import { AddSurveyRepository, LoadSurveyByIdRepository, CheckSurveyByIdRepository, LoadSurveysRepository, LoadAnswersBySurveyRepository } from '@/data/protocols/db'
import { mockSurveyModel, mockSurveys } from '@/tests/domain/mocks'
import faker from '@faker-js/faker'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  surveyData: AddSurveyRepository.Params
  async add (surveyData: AddSurveyRepository.Params): Promise<void> {
    this.surveyData = surveyData
    return await Promise.resolve()
  }
}

export class CheckSurveyByIdRepositorySpy implements CheckSurveyByIdRepository {
  id: string
  exists = true
  async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
    this.id = id
    return this.exists
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  id: string
  result = mockSurveyModel()
  async loadById (id: string): Promise<LoadSurveyByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadAnswersBySurveyRepositorySpy implements LoadAnswersBySurveyRepository {
  id: string
  result = [faker.random.word(), faker.random.word()]
  async loadAnswers (id: string): Promise<LoadAnswersBySurveyRepository.Result> {
    this.id = id
    if (!this.result) return []
    return this.result
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  surveys = mockSurveys()
  accountId: string
  async loadAll (accountId: string): Promise<LoadSurveysRepository.Result> {
    this.accountId = accountId
    return this.surveys
  }
}
