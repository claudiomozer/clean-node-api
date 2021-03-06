import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import request from 'supertest'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Claudio',
          email: 'claudinhoandre@gmail.com',
          password: 'senha',
          passwordConfirmation: 'senha'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Claudio',
        email: 'claudinhoandre@gmail.com',
        password: password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'claudinhoandre@gmail.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on login with invalid credentials', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'claudinhoandre@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
