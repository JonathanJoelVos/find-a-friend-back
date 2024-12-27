import { InMemoryCepService } from '@/http/services/in-memory/in-memory-cep-service'
import { InMemoryCitysRepository } from '@/repositories/in-memory/in-memory-citys-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryStatesRepository } from '@/repositories/in-memory/in-memory-states-repository'
import { compare } from 'bcryptjs'
import { beforeAll, describe, expect, it } from 'vitest'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { RegisterOrgUseCase } from './register-org-use-case'

let orgsRepository: InMemoryOrgsRepository
let stateRepository: InMemoryStatesRepository
let cityRepository: InMemoryCitysRepository
let cepService: InMemoryCepService
let sut: RegisterOrgUseCase

describe('Register pet use case', () => {
  beforeAll(() => {
    orgsRepository = new InMemoryOrgsRepository()
    stateRepository = new InMemoryStatesRepository()
    cityRepository = new InMemoryCitysRepository()
    cepService = new InMemoryCepService()
    sut = new RegisterOrgUseCase(
      orgsRepository,
      stateRepository,
      cityRepository,
      cepService,
    )

    cepService.save('88060000', 'Florianópolis', 'SC')
  })

  it('should be able to register a org', async () => {
    const { org } = await sut.execute({
      address: 'Rua João Gualberto Soares',
      cep: '88060000',
      email: 'jonathan.jony@teste.com',
      name: 'jojo',
      password: '1234',
      whatsappNumber: '87217634',
    })

    expect(org.id).toEqual(expect.any(String))
  })
  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      address: 'Rua João Gualberto Soares',
      cep: '88060000',
      email: 'jonathan.jony@teste2.com',
      name: 'jojo',
      password: '1234',
      whatsappNumber: '87217634',
    })

    const isPasswordCorrectlyHashed = await compare('1234', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      address: 'Rua João Gualberto Soares',
      cep: '88060000',
      email: 'jonathan.jony@teste3.com',
      name: 'jojo',
      password: '1234',
      whatsappNumber: '87217634',
    })

    expect(async () => {
      await sut.execute({
        address: 'Rua João Gualberto Soares',
        cep: '88060000',
        email: 'jonathan.jony@teste3.com',
        name: 'jojo',
        password: '1234',
        whatsappNumber: '87217634',
      })
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
  it('should not be possible to register an organization with a non-existent ZIP code.', async () => {
    expect(async () => {
      await sut.execute({
        address: 'Rua João Gualberto Soares',
        cep: 'xxxxxxxxx',
        email: 'jonathan.jony@teste3.com',
        name: 'jojo',
        password: '1234',
        whatsappNumber: '87217634',
      })
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
