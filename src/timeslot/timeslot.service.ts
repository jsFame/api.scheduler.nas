import { Injectable } from '@nestjs/common'
import { CreateTimeslotDto } from './dto/create-timeslot.dto'
import { PrismaService } from '../prisma/prisma.service'
import * as moment from 'moment'

@Injectable()
export class TimeslotService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateTimeslotDto) {
    const event = await this.prisma.event.findUniqueOrThrow({
      where: {
        id: dto.eventId,
      },
    })

    const startTime = moment(dto.startTime, 'HH:mm')
    const endTime = startTime.clone().add(event.duration, 'minutes')
    dto.startTime = startTime.toDate()
    dto.endTime = endTime.toDate()
    return this.prisma.timeSlot.create({
      data: {
        ...dto,
      },
    })
  }

  findAll(eventId?: string) {
    return this.prisma.timeSlot.findMany({
      where: {
        eventId,
      },
    })
  }

  /*  findOne(id: number) {
    return `This action returns a #${id} timeslot`
  }

  update(id: number, updateTimeslotDto: UpdateTimeslotDto) {
    return `This action updates a #${id} timeslot`
  }

  remove(id: number) {
    return `This action removes a #${id} timeslot`
  }*/
}
