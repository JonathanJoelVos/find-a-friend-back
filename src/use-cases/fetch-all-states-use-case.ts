import { StatesRepository } from '@/repositories/states-repository'
import { State } from '@prisma/client'

interface FetchAllStatesUseCaseResponse {
  states: State[]
}

export class FetchAllStatesUseCase {
  constructor(private statesRepository: StatesRepository) {}

  async execute(): Promise<FetchAllStatesUseCaseResponse> {
    const states = await this.statesRepository.findAll()

    return {
      states,
    }
  }
}
