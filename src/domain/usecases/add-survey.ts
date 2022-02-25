import { SurveyAnswerModel } from '@/domain/models/survey'

export type AddSurveyParams = {
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}

export type AddSurvey = {
  add: (data: AddSurveyParams) => Promise<void>
}
