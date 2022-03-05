import { LoadSurveyById } from '@/domain/usecases'

export interface LoadSurveyByIdRepository {
  loadById: (id: string) => Promise<LoadSurveyByIdRepository.Result>
}

export namespace LoadSurveyByIdRepository {
  export type Result = LoadSurveyById.Result
}
