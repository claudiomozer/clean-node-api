export const badRequest = {
  description: 'Problema na requisição',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
