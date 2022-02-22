import { mockSurveyModel, mockSurveys } from '@/domain/test'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/add-survey'

export class LoadSurveysSpy implements LoadSurveys {
  surveys = mockSurveys()
  called = false
  async load (): Promise<SurveyModel[]> {
    this.called = true
    return await Promise.resolve(this.surveys)
  }
}

export class AddSurveySpy implements AddSurvey {
  data: AddSurveyParams
  async add (data: AddSurveyParams): Promise<void> {
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
