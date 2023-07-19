import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateEventDto {
  @IsNumber()
  @IsOptional()
  hostId?: number
  @IsString()
  title: string
  @IsString()
  @IsOptional()
  description?: string

  @IsNumber()
  duration: number
}
