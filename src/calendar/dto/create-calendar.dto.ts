import { IsDateString, IsNumber, IsString } from 'class-validator'

export class CreateCalendarDto {
  @IsString()
  timeSlotId: string

  @IsNumber()
  guestId: number

  @IsDateString()
  date: Date | string
}
