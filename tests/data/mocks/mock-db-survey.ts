import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyRepository, LoadSurveyByIdRepository, CheckSurveyByIdRepository, LoadSurveysRepository } from '@/data/protocols/db'
import { mockSurveyModel, mockSurveys } from '@/tests/domain/mocks'

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
  async loadById (id: string): Promise<LoadSurveyByIdRepository.Result> {
    this.id = id
    return mockSurveyModel()
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  surveys = mockSurveys()
  accountId: string
  async loadAll (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return this.surveys
  }
}
