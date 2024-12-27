import { InMemoryCitysRepository } from '@/repositories/in-memory/in-memory-citys-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { SearchCitysUseCase } from './search-citys-use-case'

let citysRepository: InMemoryCitysRepository
let sut: SearchCitysUseCase

describe('Search city use case', () => {
  beforeAll(() => {
    citysRepository = new InMemoryCitysRepository()
    sut = new SearchCitysUseCase(citysRepository)
  })

  it('should be possible to list city by name', async () => {
    citysRepository.create({
      name: 'Pato Branco',
      state_id: 'SC',
    })
    citysRepository.create({
      name: 'Porto Alegre',
      state_id: 'RS',
    })
    const { citys } = await sut.execute({
      query: 'Pato',
    })

    expect(citys).toHaveLength(1)
    expect(citys).toEqual([
      expect.objectContaining({
        state_id: 'SC',
      }),
    ])
  })
})
