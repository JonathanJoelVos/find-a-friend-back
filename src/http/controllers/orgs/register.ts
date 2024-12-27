import { CepNotFoundError } from '@/use-cases/errors/cep-not-found-error'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerOrgBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    cep: z.string().min(8),
    whatsappNumber: z.string(),
    address: z.string(),
    password: z.string(),
  })

  const { address, cep, email, name, password, whatsappNumber } =
    registerOrgBodySchema.parse(request.body)

  const registerOrg = makeRegisterOrgUseCase()
  try {
    await registerOrg.execute({
      address,
      cep,
      email,
      name,
      password,
      whatsappNumber,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }
    if (error instanceof CepNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
  }

  return reply.status(201).send()
}
