import { Injectable } from '@nestjs/common'
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

  findAll(userId?: number) {
    return this.prisma.event.findMany({
      where: {
        hostId: userId,
      },
    })
  }

  findOne(id: string) {
    return this.prisma.event.findUnique({
      where: {
        id: id,
      },
    })
  }

  /*update(id: string, updateEventDto: UpdateEventDto) { //Later
    return this.prisma.event.update({
      id: id,
    })
  }

  remove(id: number) {
    return `This action removes a #${id} event`
  }*/
}
