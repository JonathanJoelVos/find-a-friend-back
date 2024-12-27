import { CitysRepository } from '@/repositories/citys-repository'
import { City } from '@prisma/client'
import { CityAlreadyExistsError } from './errors/city-already-exists-error'

interface RegisterCityUseCaseRequest {
  name: string
  state_id: string
}

interface RegisterCityUseCaseResponse {
  city: City
}

export class RegisterCityUseCase {
  constructor(private cityRepository: CitysRepository) {}

  async execute({
    name,
    state_id,
  }: RegisterCityUseCaseRequest): Promise<RegisterCityUseCaseResponse> {
    const citys = await this.cityRepository.search(name)
    const cityWithSameName = citys.length > 0

    if (cityWithSameName) {
      throw new CityAlreadyExistsError()
    }

    const city = await this.cityRepository.create({
      name,
      state_id,
    })

    return {
      city,
    }
  }
}
