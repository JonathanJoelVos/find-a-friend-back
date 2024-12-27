import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { FecthPetsByCityUseCase } from './fetch-pets-by-city-use-case'

let petsRepository: InMemoryPetsRepository
let sut: FecthPetsByCityUseCase

describe('Register pet use case', () => {
  beforeAll(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FecthPetsByCityUseCase(petsRepository)
  })

  it('should be possible to list pets by city', async () => {
    petsRepository.create({
      age: 'cub',
      city_id: 'Florianópolis',
      description: 'Uma cachorra muito linda',
      energy: 10,
      enviroment: 'seila',
      level_of_dependence: 'Muita',
      name: 'Phoebe',
      org_id: 'org-teste',
      photos: 'nenhuma',
      requirements: 'nenhum',
      size: 'médio',
      type: 'dog',
    })
    petsRepository.create({
      age: 'cub',
      city_id: 'Florianópolis',
      description: 'Uma cachorra muito linda',
      energy: 10,
      enviroment: 'seila',
      level_of_dependence: 'Muita',
      name: 'Mica',
      org_id: 'org-teste',
      photos: 'nenhuma',
      requirements: 'nenhum',
      size: 'médio',
      type: 'dog',
    })
    petsRepository.create({
      age: 'cub',
      city_id: 'Florianópolis',
      description: 'Uma cachorra muito linda',
      energy: 10,
      enviroment: 'seila',
      level_of_dependence: 'Muita',
      name: 'Jose',
      org_id: 'org-teste',
      photos: 'nenhuma',
      requirements: 'nenhum',
      size: 'médio',
      type: 'dog',
    })
    const { pets } = await sut.execute({
      cityId: 'Florianópolis',
      page: 1,
    })

    expect(pets).toHaveLength(3)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Phoebe',
      }),
      expect.objectContaining({
        name: 'Mica',
      }),
      expect.objectContaining({
        name: 'Jose',
      }),
    ])
  })
  it('should be able fetch paginated pets by city', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        age: 'cub',
        city_id: 'Erechim',
        description: 'Uma cachorra muito linda',
        energy: 10,
        enviroment: 'seila',
        level_of_dependence: 'Muita',
        name: 'Phoebe',
        org_id: `orgId-${i}`,
        photos: 'nenhuma',
        requirements: 'nenhum',
        size: 'médio',
        type: 'dog',
      })
    }

    const { pets } = await sut.execute({
      cityId: 'Erechim',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        org_id: 'orgId-21',
      }),
      expect.objectContaining({
        org_id: 'orgId-22',
      }),
    ])
  })
})
