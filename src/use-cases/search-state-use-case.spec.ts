import { InMemoryStatesRepository } from '@/repositories/in-memory/in-memory-states-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { SearchStatesUseCase } from './search-states-use-case'

let statesRepository: InMemoryStatesRepository
let sut: SearchStatesUseCase

describe('Search city use case', () => {
  beforeAll(() => {
    statesRepository = new InMemoryStatesRepository()
    sut = new SearchStatesUseCase(statesRepository)
  })

  it('should be possible to list state by name', async () => {
    statesRepository.create({
      name: 'SC',
      id: 'SC-id',
    })
    const { state } = await sut.execute({
      name: 'SC',
    })

    expect(state.id).toEqual('SC-id')
  })
})
