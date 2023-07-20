import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator'
import * as moment from 'moment'

export class CreateTimeslotDto {
  @IsUUID()
  eventId: string

  // @IsDate()
  @IsString()
  startTime: Date | string

  @IsOptional()
  @IsBoolean()
  available: boolean

  constructor() {
    this.format()
  }
  format() {
    this.startTime = moment(this.startTime, 'HH:mm').toDate()
    console.debug(this.startTime)
  }
}
