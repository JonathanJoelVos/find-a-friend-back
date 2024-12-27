import { Prisma, State } from '@prisma/client'

export interface StatesRepository {
  findAll(): Promise<State[]>
  create(state: Prisma.StateUncheckedCreateInput): Promise<State>
  findByName(name: string): Promise<State | null>
}
