import { PartialType } from '@nestjs/mapped-types'
import { CreateEventDto } from './create-event.dto'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @IsNumber()
  @IsOptional()
  hostId?: number
  @IsString()
  @IsOptional()
  title?: string
  @IsString()
  @IsOptional()
  description?: string

  @IsNumber()
  @IsOptional()
  duration?: number
}
