import { StatesRepository } from '@/repositories/states-repository'
import { State } from '@prisma/client'
import { StateNotFound } from './errors/state-not-found-error'

interface SearchStatesUseCaseRequest {
  name: string
}

interface SearchStatesUseCaseResponse {
  state: State
}

export class SearchStatesUseCase {
  constructor(private statesRepository: StatesRepository) {}

  async execute({
    name,
  }: SearchStatesUseCaseRequest): Promise<SearchStatesUseCaseResponse> {
    const state = await this.statesRepository.findByName(name)

    if (!state) {
      throw new StateNotFound()
    }

    return {
      state,
    }
  }
}
