import { PrismaClient } from '@prisma/client'
import * as argon from 'argon2'
import { AuthDto } from '../src/auth/dto'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany()

  const dto: AuthDto = {
    email: 'hiro_tests@gmail.com',
    password: 'testing@rQfAPjfVsreWGz2',
  }
  const hash = await argon.hash(dto.password)
  const user = await prisma.user.create({
    data: {
      email: dto.email,
      hash: hash,
    },
  })

  console.log({ user })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
