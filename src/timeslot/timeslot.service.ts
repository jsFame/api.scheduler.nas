import { Injectable } from '@nestjs/common'
import { CreateTimeslotDto } from './dto/create-timeslot.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class TimeslotService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTimeslotDto: CreateTimeslotDto) {
    console.debug(createTimeslotDto)
    return this.prisma.timeSlot.create({
      data: {
        ...createTimeslotDto,
        event: null,
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
