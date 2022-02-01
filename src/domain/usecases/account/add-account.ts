import { AccountModel } from '@/domain/models/account'

export type AddAccountParams = {
  name: string
  email: string
  password: string
}

export type AddAccount = {
  add: (account: AddAccountParams) => Promise<AccountModel | null>
}
