import { LogErrorRepository } from '@/data/protocols/db'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    const httpReponse = await this.controller.handle(request)
    if (httpReponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpReponse.body.stack)
    }
    return httpReponse
  }
}
