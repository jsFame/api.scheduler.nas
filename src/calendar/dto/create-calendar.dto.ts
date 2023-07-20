import { IsDateString, IsOptional, IsUUID } from 'class-validator'

export class CreateCalendarDto {
  @IsUUID()
  timeSlotId: string

  @IsOptional()
  guestId: number

  @IsDateString()
  date: Date | string
}
