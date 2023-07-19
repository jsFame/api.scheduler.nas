import { Module } from '@nestjs/common'
import { TimeslotService } from './timeslot.service'
import { TimeslotController } from './timeslot.controller'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [TimeslotController],
  providers: [TimeslotService, PrismaService],
})
export class TimeslotModule {}
