import { CepService } from '@/http/services/cep-service'
import { CitysRepository } from '@/repositories/citys-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { StatesRepository } from '@/repositories/states-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { CepNotFoundError } from './errors/cep-not-found-error'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface RegisterOrgUseCaseRequest {
  name: string
  email: string
  address: string
  whatsappNumber: string
  cep: string
  password: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(
    private orgRepository: OrgsRepository,
    private stateRepository: StatesRepository,
    private cityRepository: CitysRepository,
    private cepService: CepService,
  ) {}

  async execute({
    address,
    cep,
    email,
    name,
    password,
    whatsappNumber,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    try {
      const zipCodeFound = await this.cepService.findCityAndState(cep)
      console.log(zipCodeFound)
      if (!zipCodeFound) {
        throw new CepNotFoundError()
      }

      const { city, state } = zipCodeFound

      const isStateExists = await this.stateRepository.findByName(state)

      if (!isStateExists) {
        const dbState = await this.stateRepository.create({
          name: state,
        })
        await this.cityRepository.create({
          name: city,
          state_id: dbState.id,
        })
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        throw new CepNotFoundError()
      }
    }

    const org = await this.orgRepository.create({
      address,
      cep,
      email,
      name,
      password_hash,
      whatsappNumber,
    })

    return {
      org,
    }
  }
}
