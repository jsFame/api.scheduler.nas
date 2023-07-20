import { Body, Controller, Get, Post } from '@nestjs/common'
import { CalendarService } from './calendar.service'
import { CreateCalendarDto } from './dto/create-calendar.dto'
import { GetUser } from '../auth/decorator'

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post()
  create(
    @GetUser('userId') userId: number,
    @Body() createCalendarDto: CreateCalendarDto,
  ) {
    return this.calendarService.create(createCalendarDto)
  }

  @Get()
  findAll(@GetUser('userId') userId: number) {
    return this.calendarService.findAll(userId)
  }

  /* @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calendarService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCalendarDto: UpdateCalendarDto) {
    return this.calendarService.update(+id, updateCalendarDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calendarService.remove(+id)
  }*/
}
