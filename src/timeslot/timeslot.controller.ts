import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { TimeslotService } from './timeslot.service'
import { CreateTimeslotDto } from './dto/create-timeslot.dto'
import { JwtGuard } from '../auth/guard'

@UseGuards(JwtGuard)
@Controller('timeslots')
export class TimeslotController {
  constructor(private readonly timeslotService: TimeslotService) {}

  @Post()
  create(@Body() createTimeslotDto: CreateTimeslotDto) {
    return this.timeslotService.create(createTimeslotDto)
  }

  @Get()
  findAll(@Param(':eventId') eventId: string) {
    return this.timeslotService.findAll(eventId)
  }

  /*  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeslotService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimeslotDto: UpdateTimeslotDto) {
    return this.timeslotService.update(+id, updateTimeslotDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeslotService.remove(+id)
  }*/
}