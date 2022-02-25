import { LoadSurveys } from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (httpRequest.accountId) {
        const surveys = await this.loadSurveys.load(httpRequest.accountId)
        return surveys.length ? ok(surveys) : noContent()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
