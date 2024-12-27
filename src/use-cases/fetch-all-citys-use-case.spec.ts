import { InMemoryCitysRepository } from '@/repositories/in-memory/in-memory-citys-repository'
import { describe, it, beforeAll, expect } from 'vitest'
import { FetchAllCitysUseCase } from './fetch-all-citys-use-case'

let citysRepository: InMemoryCitysRepository
let sut: FetchAllCitysUseCase

describe('Fetch all citys use case', () => {
  beforeAll(() => {
    citysRepository = new InMemoryCitysRepository()
    sut = new FetchAllCitysUseCase(citysRepository)
  })

  it('should be able to fetch all citys', async () => {
    citysRepository.create({
      name: 'Florianópolis',
      state_id: 'SC',
      id: 'Florianópolis',
    })

    citysRepository.create({
      name: 'São Paulo',
      state_id: 'SP',
      id: 'São Paulo',
    })

    const { citys } = await sut.execute()

    expect(citys).toHaveLength(2)
    expect(citys).toEqual([
      expect.objectContaining({
        id: 'Florianópolis',
      }),
      expect.objectContaining({
        id: 'São Paulo',
      }),
    ])
  })
})
