import { Controller } from '@/presentation/protocols/controller'
import { LoginController } from '@/presentation/controllers'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'

export const makeLoginController = (): Controller => {
  const validation = makeLoginValidation()
  const loginController = new LoginController(makeDbAuthentication(), validation)
  return makeLogControllerDecorator(loginController)
}
