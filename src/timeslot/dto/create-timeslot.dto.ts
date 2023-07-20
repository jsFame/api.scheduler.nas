import { IsBoolean, IsString } from 'class-validator'
import * as moment from 'moment'

export class CreateTimeslotDto {
  // @IsDate()
  @IsString()
  startTime: Date | string
  // @IsDate()
  @IsString()
  endTime: Date | string
  @IsBoolean()
  available: boolean
  constructor() {
    this.format()
  }
  format() {
    this.startTime = moment(this.startTime, 'HH:mm').toDate()
    this.endTime = moment(this.endTime, 'HH:mm').toDate()
    console.debug(this.startTime)
    console.debug(this.endTime)
  }
}
