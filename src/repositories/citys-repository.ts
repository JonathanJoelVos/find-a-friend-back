import { City, Prisma } from '@prisma/client'

export interface CitysRepository {
  findAll(): Promise<City[]>
  findManyByStateId(stateId: string): Promise<City[]>
  findById(cityId: string): Promise<City | null>
  create(city: Prisma.CityUncheckedCreateInput): Promise<City>
  search(query: string): Promise<City[]>
}
