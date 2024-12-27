import { QueryParamsProps } from '@/http/controllers/pets/search'
import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(pet: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyByCityId(
    cityId: string,
    page: number,
    query?: QueryParamsProps,
  ): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
