import { SurveyResultModel } from '@/domain/models/survey-result'

export type LoadSurveyResult = {
  load: (surveyId: string) => Promise<SurveyResultModel>
}
