import { Injectable } from '@nestjs/common'
import { CreateCalendarDto } from './dto/create-calendar.dto'
import { PrismaService } from '../prisma/prisma.service'
import moment from 'moment'

@Injectable()
export class CalendarService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCalendarDto) {
    const today = new Date()

    const eventDate = moment(dto.date, `YYYY-MM-DD`) //TODO: use moment.utc if necessary

    eventDate.add(today.getHours(), 'hours')
    eventDate.add(today.getMinutes(), 'minutes')

    dto.date = eventDate.toDate()
    console.debug({ eventDate })
    return this.prisma.calendar.create({
      data: dto,
    })
  }

  async findAll(userId: number) {
    const hostedSlots = await this.prisma.timeSlot.findMany({
      select: {
        id: true,
      },
      where: {
        event: {
          hostId: userId,
        },
      },
    })

    const slots = hostedSlots.map((val) => val.id)

    const c2 = await this.prisma.calendar.findMany({
      where: {
        timeSlotId: {
          in: slots,
        },
      },
    })

    console.log({ c2 })
    const c1 = await this.prisma.calendar.findMany({
      where: {
        OR: [
          {
            guestId: userId,
          },
          {
            timeSlotId: {
              in: slots,
            },
          },
        ],
      },
    })

    return c1
  }

  /*  findOne(id: number) {
    return `This action returns a #${id} calendar`
  }

  update(id: number, updateCalendarDto: UpdateCalendarDto) {
    return `This action updates a #${id} calendar`
  }

  remove(id: number) {
    return `This action removes a #${id} calendar`
  }*/
}
