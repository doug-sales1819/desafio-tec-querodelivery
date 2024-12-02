import { Options } from 'swagger-jsdoc'

export const specs: Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Teste Técnico Querodelivery',
      version: '0.1.0',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
    servers: [
      {
        url: 'http://localhost:5503',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
}
