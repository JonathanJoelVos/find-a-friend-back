import { CitysRepository } from '@/repositories/citys-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { CityNotFoundError } from './errors/city-not-found-error'
import { OrgNotFoundError } from './errors/org-not-found-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RegisterPetUseCaseRequest {
  orgId: string
  name: string
  age: string
  description: string
  size: string
  energy: number
  levelOfDependence: string
  enviroment: string
  photo: string
  requirements: string
  type: string
  cityId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
    private cityRepository: CitysRepository,
  ) {}

  async execute({
    age,
    description,
    energy,
    enviroment,
    levelOfDependence,
    name,
    photo,
    requirements,
    size,
    type,
    cityId,
    orgId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)
    const city = await this.cityRepository.findById(cityId)

    if (!org) {
      throw new OrgNotFoundError()
    }

    if (!city) {
      throw new CityNotFoundError()
    }

    const pet = await this.petsRepository.create({
      org_id: orgId,
      age,
      city_id: cityId,
      description,
      energy,
      enviroment,
      level_of_dependence: levelOfDependence,
      name,
      photo,
      requirements,
      size,
      type,
    })

    return {
      pet,
    }
  }
}
