import { InMemoryStatesRepository } from '@/repositories/in-memory/in-memory-states-repository'
import { describe, it, beforeAll, expect } from 'vitest'
import { FetchAllStatesUseCase } from './fetch-all-states-use-case'

let statesRepository: InMemoryStatesRepository
let sut: FetchAllStatesUseCase

describe('Fetch all states use case', () => {
  beforeAll(() => {
    statesRepository = new InMemoryStatesRepository()
    sut = new FetchAllStatesUseCase(statesRepository)
  })

  it('should be able to fetch all states', async () => {
    statesRepository.create({
      id: 'SC',
      name: 'Santa Catarina',
    })

    statesRepository.create({
      id: 'SP',
      name: 'São Paulo',
    })

    const { states } = await sut.execute()

    expect(states).toHaveLength(2)
    expect(states).toEqual([
      expect.objectContaining({
        id: 'SC',
      }),
      expect.objectContaining({
        id: 'SP',
      }),
    ])
  })
})
