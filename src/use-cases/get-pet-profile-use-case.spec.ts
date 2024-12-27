import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { PetNotFoundError } from './errors/pet-not-exists-error'
import { GetPetProfileUseCase } from './get-pet-profile-use-case'

let petsRepository: InMemoryPetsRepository
let sut: GetPetProfileUseCase

describe('Register pet use case', () => {
  beforeAll(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetProfileUseCase(petsRepository)
  })

  it('should be possible to get pet profile', async () => {
    const createdPet = await petsRepository.create({
      age: 'cub',
      city_id: 'Florianópolis',
      description: 'Uma cachorra muito linda',
      energy: 10,
      enviroment: 'seila',
      level_of_dependence: 'Muita',
      name: 'Phoebe',
      org_id: 'org-teste',
      photo: '..',
      requirements: 'nenhum',
      size: 'médio',
      type: 'dog',
    })
    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
  it('should be possible to get pet profile with wrong id', async () => {
    expect(async () => {
      await sut.execute({
        petId: 'not-exists-pet',
      })
    }).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
