import { Injectable } from '@nestjs/common'
import { CreateCalendarDto } from './dto/create-calendar.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CalendarService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCalendarDto: CreateCalendarDto) {
    return this.prisma.calendar.create({
      data: createCalendarDto,
    })
  }

  findAll(userId: number) {
    return this.prisma.calendar.findMany({
      where: {
        OR: [
          {
            guestId: userId,
          },
          {
            timeslot: {
              event: {
                hostId: userId,
              },
            },
          },
        ],
      },
      /*include: {
        timeslot: true,
        event: true,
      },*/
    })
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
