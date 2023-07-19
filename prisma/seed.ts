import { PrismaClient } from '@prisma/client'
import * as argon from 'argon2'
import { AuthDto } from '../src/auth/dto'

const prisma = new PrismaClient()

async function create_user(dto: AuthDto) {
  const hash = await argon.hash(dto.password)
  const user = await prisma.user.create({
    data: {
      email: dto.email,
      hash: hash,
    },
  })
  console.log({ created: user })
  return user
}

function addDays(date: Date, days: number): Date {
  date.setDate(date.getDate() + days)
  return date
}

async function main() {
  await prisma.user.deleteMany()

  const user1 = await create_user({
    email: 'hiro_tests@gmail.com',
    password: 'nas@Testing#',
  })
  const user2 = await create_user({
    email: 'hiro@gmail.com',
    password: 'hiro@Testing#',
  })

  const event = await prisma.event.create({
    data: {
      title: '20 Minute catchup',
      hostId: user1.id,
      duration: 20,
    },
  })
  console.log({ event })

  const timeSlot = await prisma.timeSlot.create({
    data: {
      eventId: event.id,
      available: true,
      startTime: '12:00',
      endTime: '12:20', //FIXME automatically add
    },
  })

  const today = new Date()
  const calendarInvite = await prisma.calendar.createMany({
    data: [
      {
        eventId: event.id,
        date: new Date(today.getTime() + 1000 * 60 * 60 * 24),
        guestId: user2.id,
      },
      {
        eventId: event.id,
        date: new Date(today.getTime() + 1000 * 60 * 60 * 24),
        guestId: user2.id,
      },
    ],
  })

  console.log({ calendarInvite })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
