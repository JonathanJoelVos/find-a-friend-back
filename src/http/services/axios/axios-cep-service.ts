import axios from 'axios'
import { CepService } from '../cep-service'

export class AxiosCepService implements CepService {
  async findCityAndState(cep: string) {
    const request = await axios.get(
      `https://brasilapi.com.br/api/cep/v2/${cep}`,
    )

    return {
      city: request.data.city,
      state: request.data.state,
    }
  }
}
