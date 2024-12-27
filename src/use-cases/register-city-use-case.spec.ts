import { InMemoryCitysRepository } from '@/repositories/in-memory/in-memory-citys-repository'
import { it, describe, beforeAll, expect } from 'vitest'
import { CityAlreadyExistsError } from './errors/city-already-exists-error'
import { RegisterCityUseCase } from './register-city-use-case'

let cityRepository: InMemoryCitysRepository
let sut: RegisterCityUseCase

describe('Register city use case', () => {
  beforeAll(() => {
    cityRepository = new InMemoryCitysRepository()
    sut = new RegisterCityUseCase(cityRepository)
  })

  it('should be able to register a city', async () => {
    const { city } = await sut.execute({
      name: 'Erechim',
      state_id: 'RS',
    })

    expect(city).toEqual(
      expect.objectContaining({
        name: 'Erechim',
      }),
    )
  })

  it('should not be possible to create two cities with the same name', async () => {
    await sut.execute({
      name: 'Florianópolis',
      state_id: 'SC',
    })

    expect(async () => {
      await sut.execute({
        name: 'Florianópolis',
        state_id: 'SC',
      })
    }).rejects.toBeInstanceOf(CityAlreadyExistsError)
  })
})
