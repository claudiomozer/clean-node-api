import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  ok,
  Validation
} from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = await this.validation.validate(httpRequest)

    if (error) {
      return badRequest(error)
    }

    return ok(null)
  }
}
