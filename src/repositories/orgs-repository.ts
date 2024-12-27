import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  create(org: Prisma.OrgCreateInput): Promise<Org>
}
