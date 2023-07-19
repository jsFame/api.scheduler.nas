import { Injectable } from '@nestjs/common'
import { UpdateEventDto } from './dto/update-event.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}
  create(createEventDto: any) {
    // FIXME: type any
    return this.prisma.event.create({
      data: createEventDto,
    })
  }

  findAll() {
    return `This action returns all event`
  }

  findOne(id: number) {
    return `This action returns a #${id} event`
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`
  }

  remove(id: number) {
    return `This action removes a #${id} event`
  }
}
