import { CepService } from '../cep-service'

type InMemoryCepType = {
  [key: string]: {
    city: string
    state: string
  }
}

export class InMemoryCepService implements CepService {
  public items: InMemoryCepType = {}

  async save(cep: string, city: string, state: string) {
    this.items[cep] = {
      city,
      state,
    }
  }

  async findCityAndState(cep: string) {
    console.log(this.items, 'AQUI')
    const data = this.items[cep]
    if (data) {
      return data
    }

    return null
  }
}
