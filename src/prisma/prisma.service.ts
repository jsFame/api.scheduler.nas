import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // FIXME doesn't work for e2e OnModuleDestroy{
  // https://docs.nestjs.com/fundamentals/lifecycle-events

  async onModuleInit() {
    console.info(new Date(), 'connecting to the database')
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
    /*    this.$on('query', (e: any) => { //FIXME me https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/logging#event-based-logging
      console.log('Query: ' + e.query)
      console.log('Params: ' + e.params)
      console.log('Duration: ' + e.duration + 'ms')
    })*/
  }
  constructor(config: ConfigService) {
    const sslcert = '?sslcert=root.crt'
    //https://www.prisma.io/docs/concepts/database-connectors/postgresql#configuring-an-ssl-connection
    super({
      datasources: {
        db: {
          url: config.get<string>('DATABASE_URL') + sslcert,
        },
      },
    })
  }

  cleanDb() {
    return this.$transaction([
      //tear down logic
      this.user.deleteMany(),
    ])
  }
}
