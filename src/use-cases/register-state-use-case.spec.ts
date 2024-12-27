import { InMemoryStatesRepository } from '@/repositories/in-memory/in-memory-states-repository'
import { it, describe, beforeAll, expect } from 'vitest'
import { StateAlreadyExistsError } from './errors/state-already-exists-error'
import { RegisterStateUseCase } from './register-state-use-case'

let statesRepository: InMemoryStatesRepository
let sut: RegisterStateUseCase

describe('Register state use case', () => {
  beforeAll(() => {
    statesRepository = new InMemoryStatesRepository()
    sut = new RegisterStateUseCase(statesRepository)
  })

  it('should be able to register a state', async () => {
    const { state } = await sut.execute({
      name: 'SC',
    })

    expect(state).toEqual(
      expect.objectContaining({
        name: 'SC',
      }),
    )
  })

  it('should not be possible to create two states with the same name', async () => {
    await sut.execute({
      name: 'RS',
    })

    expect(async () => {
      await sut.execute({
        name: 'RS',
      })
    }).rejects.toBeInstanceOf(StateAlreadyExistsError)
  })
})
