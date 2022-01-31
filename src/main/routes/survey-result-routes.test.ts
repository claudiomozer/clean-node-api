import app from '@/main/config/app'
import request from 'supertest'

describe('SurveyResult Routes', () => {
  describe('POST /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })
  })
})
