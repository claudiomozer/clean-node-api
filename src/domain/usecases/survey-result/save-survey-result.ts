import { SurveyResultModel } from '@/domain/models/survey-result'

export type SaveSurveyResultParams = Omit<SurveyResultModel, 'id'>

export type SaveSurveyResult = {
  save: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
