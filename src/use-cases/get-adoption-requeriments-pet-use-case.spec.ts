import { InMemoryAdoptionRequirementsRepository } from '@/repositories/in-memory/in-memory-adoption-requirements-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { PetNotFoundError } from './errors/pet-not-exists-error'
import { GetAdoptionRequirementsPetUseCase } from './get-adoption-requeriments-pet-use-case'

let petsRepository: InMemoryPetsRepository
let adoptionRequirementsRepository: InMemoryAdoptionRequirementsRepository
let sut: GetAdoptionRequirementsPetUseCase

describe('Get adoption requirements pet use case', () => {
  beforeAll(() => {
    petsRepository = new InMemoryPetsRepository()
    adoptionRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository()
    sut = new GetAdoptionRequirementsPetUseCase(
      adoptionRequirementsRepository,
      petsRepository,
    )
  })

  it('should not be possible to fetch details of a non-existent pet', async () => {
    await petsRepository.create({
      age: 'cub',
      city_id: 'Florianópolis',
      description: 'Uma cachorra muito linda',
      energy: 10,
      enviroment: 'seila',
      level_of_dependence: 'Muita',
      name: 'Phoebe',
      org_id: 'org-teste-2',
      photos: 'nenhuma',
      requirements: 'nenhum',
      size: 'médio',
      type: 'dog',
    })

    await adoptionRequirementsRepository.create({
      title: 'requisito um',
      pet_id: 'pet-inexistente',
    })

    await expect(async () => {
      await sut.execute({
        petId: 'pet-inexistente',
      })
    }).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
