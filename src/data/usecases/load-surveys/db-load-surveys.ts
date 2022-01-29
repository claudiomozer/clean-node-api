import {
  SurveyModel,
  LoadSurveys,
  LoadSurveysRepository
} from '@/data/usecases/load-surveys/db-load-surveys-protocols'

export class DbLoadSurveys implements LoadSurveys {
  constructor (
    private readonly loadSurveysRepository: LoadSurveysRepository
  ) {}

  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll()
    return surveys
  }
}
