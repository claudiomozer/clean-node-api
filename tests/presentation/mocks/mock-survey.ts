import { mockSurveyModel, mockSurveys } from '@/tests/domain/mocks'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurvey, LoadSurveys, LoadSurveyById } from '@/domain/usecases'

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

export class LoadSurveyByIdSpy implements LoadSurveyById {
  id: string
  surveyModel = mockSurveyModel()
  async loadById (id: string): Promise<SurveyModel | null> {
    this.id = id
    return await Promise.resolve(this.surveyModel)
  }
}
