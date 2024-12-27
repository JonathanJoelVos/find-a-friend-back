type Cep = {
  state: string
  city: string
}

export interface CepService {
  findCityAndState(cep: string): Promise<Cep | null>
}
