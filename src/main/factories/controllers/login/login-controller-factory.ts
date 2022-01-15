import { Controller } from '../../../../presentation/protocols/controller'
import { LoginController } from '../../../../presentation/controllers/login/login/login-controller'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const validation = makeLoginValidation()
  const loginController = new LoginController(makeDbAuthentication(), validation)
  return makeLogControllerDecorator(loginController)
}
