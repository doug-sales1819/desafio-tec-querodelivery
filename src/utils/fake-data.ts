import { faker } from '@faker-js/faker'

export function fakeProduct() {
  return {
    name: faker.food.dish(),
    description: faker.food.description(),
    price: faker.commerce.price({
      min: 5,
      max: 100,
      dec: 2,
    }),
  }
}
