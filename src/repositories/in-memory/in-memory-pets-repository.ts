import { QueryParamsProps } from '@/http/controllers/pets/search'
import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findManyByCityId(
    cityId: string,
    page: number,
    query?: QueryParamsProps,
  ) {
    return this.items
      .filter((item) => {
        if (item.city_id !== cityId) return false

        if (query?.age && item.age === query.age) return true
        if (query?.energy && item.energy.toString() === query.energy.toString())
          return true
        if (
          query?.level_of_dependence &&
          item.level_of_dependence === query.level_of_dependence
        )
          return true

        if (query?.size && item.size === query.size) return true
        if (query?.type && item.type === query.type) return true

        return (
          !query?.age &&
          !query?.energy &&
          !query?.level_of_dependence &&
          !query?.size &&
          !query?.type
        )
      })
      .slice((page - 1) * 20, page * 20)
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      age: data.age,
      city_id: data.city_id,
      description: data.description,
      energy: data.energy,
      enviroment: data.enviroment,
      level_of_dependence: data.level_of_dependence,
      name: data.name,
      org_id: data.org_id,
      photo: data.photo,
      requirements: data.requirements,
      size: data.size,
      type: data.type,
    }

    this.items.push(pet)

    return pet
  }
}
