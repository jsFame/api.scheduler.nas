import { Injectable } from '@nestjs/common'
import { CreateTimeslotDto } from './dto/create-timeslot.dto'
import { PrismaService } from '../prisma/prisma.service'
import moment from 'moment'

interface filterBy {
  available?: boolean
}
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
    return this.prisma.timeSlot.create({
      data: {
        ...dto,
        endTime: endTime.toDate(),
      },
    })
  }

  findAll(eventId?: string, whereBy?: filterBy) {
    return this.prisma.timeSlot.findMany({
      where: {
        eventId,
        available: whereBy.available,
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
