import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import * as Joi from 'joi'
import { UserModule } from './user/user.module'
import { CacheModule } from '@nestjs/cache-manager'
import { EventModule } from './event/event.module'
import { TimeslotModule } from './timeslot/timeslot.module'
import { CalendarModule } from './calendar/calendar.module'
import * as process from 'process'

let mode = process.env.MODE
let envFile = '.env'

switch (mode) {
  case 'test':
    envFile = '.env.test'
    process.env.NODE_ENV = 'testing'
    break
  case 'prod':
    process.env.NODE_ENV = 'production'
    envFile = '.env.prod'
    break
  default:
    mode = 'dev'
    process.env.NODE_ENV = 'development'
    envFile = '.env.local'
}

if (mode in ['dev', 'test']) {
  process.env.DEBUG = 'prisma:*'
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [envFile, '.env'],
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        MODE: Joi.string().valid('dev', 'prod', 'test').default('dev'),
        PORT: Joi.number().default(1606),
        DATABASE_URL: Joi.string(),
        JWT_SECRET: Joi.string(),
        JWT_MAX_AGE: Joi.number().default(2 * 60 * 60 * 1000),
      }),
    }),
    CacheModule.register({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    EventModule,
    TimeslotModule,
    CalendarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
