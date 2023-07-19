import { Injectable } from '@nestjs/common'
import { CreateTimeslotDto } from './dto/create-timeslot.dto'
import { UpdateTimeslotDto } from './dto/update-timeslot.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class TimeslotService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTimeslotDto: CreateTimeslotDto) {
    return this.prisma.timeslot({})
  }

  findAll() {
    return `This action returns all timeslot`
  }

  findOne(id: number) {
    return `This action returns a #${id} timeslot`
  }

  update(id: number, updateTimeslotDto: UpdateTimeslotDto) {
    return `This action updates a #${id} timeslot`
  }

  remove(id: number) {
    return `This action removes a #${id} timeslot`
  }
}
