import { mockSurveyModel, mockSurveys } from '@/tests/domain/mocks'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurvey, LoadSurveys, LoadSurveyById, CheckSurveyById } from '@/domain/usecases'

export class LoadSurveysSpy implements LoadSurveys {
  surveys = mockSurveys()
  accountId: string
  async load (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return await Promise.resolve(this.surveys)
  }
}

export class AddSurveySpy implements AddSurvey {
  data: AddSurvey.Params
  async add (data: AddSurvey.Params): Promise<void> {
    this.data = data
    return await Promise.resolve()
  }
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
  id: string
  exists = true
  async checkById (id: string): Promise<CheckSurveyById.Result> {
    this.id = id
    return await Promise.resolve(this.exists)
  }
}

export class LoadSurveyByIdSpy implements LoadSurveyById {
  id: string
  surveyModel = mockSurveyModel()
  async loadById (id: string): Promise<LoadSurveyById.Result> {
    this.id = id
    return await Promise.resolve(this.surveyModel)
  }
}
