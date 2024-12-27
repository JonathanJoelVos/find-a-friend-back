import { OrgsRepository } from '@/repositories/orgs-repository'
import { StatesRepository } from '@/repositories/states-repository'
import { State } from '@prisma/client'
import { StateAlreadyExistsError } from './errors/state-already-exists-error'

interface RegisterStateUseCaseRequest {
  name: string
}

interface RegisterStateUseCaseResponse {
  state: State
}

export class RegisterStateUseCase {
  constructor(private stateRepository: StatesRepository) {}

  async execute({
    name,
  }: RegisterStateUseCaseRequest): Promise<RegisterStateUseCaseResponse> {
    const stateWithSameName = await this.stateRepository.findByName(name)

    if (stateWithSameName) {
      throw new StateAlreadyExistsError()
    }

    const state = await this.stateRepository.create({
      name,
    })

    return {
      state,
    }
  }
}
