import { InMemoryCitysRepository } from '@/repositories/in-memory/in-memory-citys-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { FetchCitysByStateUseCase } from './fetch-citys-by-state-use-case'

let citysRepository: InMemoryCitysRepository
let sut: FetchCitysByStateUseCase

describe('Fetch citys by state use case', () => {
  beforeAll(() => {
    citysRepository = new InMemoryCitysRepository()
    sut = new FetchCitysByStateUseCase(citysRepository)
  })

  it('should be possible to list citys by state', async () => {
    citysRepository.create({
      name: 'Florianópolis',
      state_id: 'SC',
    })
    citysRepository.create({
      name: 'Erechim',
      state_id: 'RS',
    })
    citysRepository.create({
      name: 'São Paulo',
      state_id: 'SP',
    })
    citysRepository.create({
      name: 'Santos',
      state_id: 'SP',
    })
    const { citys } = await sut.execute({
      stateId: 'SP',
    })

    expect(citys).toHaveLength(2)
    expect(citys).toEqual([
      expect.objectContaining({
        name: 'São Paulo',
      }),
      expect.objectContaining({
        name: 'Santos',
      }),
    ])
  })
})
