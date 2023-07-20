import { Injectable } from '@nestjs/common'
import { CreateCalendarDto } from './dto/create-calendar.dto'
import { PrismaService } from '../prisma/prisma.service'
import * as moment from 'moment'

@Injectable()
export class CalendarService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCalendarDto) {
    const eventDate = moment(dto.date, 'YYYY-MM-DD')
    dto.date = eventDate.toDate()
    return this.prisma.calendar.create({
      data: dto,
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
