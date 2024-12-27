import { InMemoryCitysRepository } from '@/repositories/in-memory/in-memory-citys-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { CityNotFoundError } from './errors/city-not-found-error'
import { OrgNotFoundError } from './errors/org-not-found-error'
import { RegisterPetUseCase } from './register-pet'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let cityRepository: InMemoryCitysRepository
let sut: RegisterPetUseCase

describe('Register pet use case', () => {
  beforeAll(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    cityRepository = new InMemoryCitysRepository()
    sut = new RegisterPetUseCase(petsRepository, orgsRepository, cityRepository)

    orgsRepository.create({
      adress: 'Rua das flores',
      email: 'seila@gmail.com',
      name: 'ONG teste',
      id: 'org-teste',
      cep: '88000000',
      password_hash: '123456',
      whatsappNumber: '48999999999',
    })

    cityRepository.create({
      name: 'Florianópolis',
      state_id: 'SC',
      id: 'Florianópolis',
    })
  })

  it('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
      age: 'cub',
      cityId: 'Florianópolis',
      description: 'Uma cachorra muito linda',
      energy: 10,
      enviroment: 'seila',
      levelOfDependence: 'Muita',
      name: 'Phoebe',
      orgId: 'org-teste',
      photos: 'nenhuma',
      requirements: 'nenhum',
      size: 'médio',
      type: 'dog',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
  it('should not be possible to register a pet without an associated NGO.', () => {
    expect(async () => {
      await sut.execute({
        age: 'cub',
        cityId: 'Florianópolis',
        description: 'Uma cachorra muito linda',
        energy: 10,
        enviroment: 'seila',
        levelOfDependence: 'Muita',
        name: 'Phoebe',
        orgId: 'id-nao-cadastrado',
        photos: 'nenhuma',
        requirements: 'nenhum',
        size: 'médio',
        type: 'dog',
      })
    }).rejects.toBeInstanceOf(OrgNotFoundError)
  })
  it('should not be possible to register a pet without an associated city.', () => {
    expect(async () => {
      await sut.execute({
        age: 'cub',
        cityId: 'id-nao-cadastrado',
        description: 'Uma cachorra muito linda',
        energy: 10,
        enviroment: 'seila',
        levelOfDependence: 'Muita',
        name: 'Phoebe',
        orgId: 'org-teste',
        photos: 'nenhuma',
        requirements: 'nenhum',
        size: 'médio',
        type: 'dog',
      })
    }).rejects.toBeInstanceOf(CityNotFoundError)
  })
})
