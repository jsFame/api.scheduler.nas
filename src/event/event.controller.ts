import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { EventService } from './event.service'
import { CreateEventDto } from './dto/create-event.dto'
import { PrismaService } from '../prisma/prisma.service'
import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator'

@UseGuards(JwtGuard)
@Controller('events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  create(@GetUser('userId') userId: number, @Body() createEventDto: CreateEventDto) {
    createEventDto.hostId = userId
    return this.eventService.create(createEventDto)
  }

  @Get()
  findAll(@GetUser('userId') userId: number) {
    return this.eventService.findAll(userId)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const e = await this.eventService.findOne(id)
    if (!e) {
      throw new NotFoundException('event not found')
    }
    return e
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id)
  }*/
}
