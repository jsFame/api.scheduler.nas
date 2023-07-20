import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { ConfigService } from '@nestjs/config'
import kleur from 'kleur'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // FIXME doesn't work for e2e OnModuleDestroy{
  // https://docs.nestjs.com/fundamentals/lifecycle-events

  constructor(config: ConfigService) {
    const sslcert = '?sslcert=root.crt'
    //https://www.prisma.io/docs/concepts/database-connectors/postgresql#configuring-an-ssl-connection
    super({
      datasources: {
        db: {
          url: config.get<string>('DATABASE_URL') + sslcert,
        },
      },
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    })

    process.env.FORCE_COLOR = 'true'

    // @ts-ignore
    this.$on('query', async (e: any) => {
      // const chalk = await import('chalk')
      // console.log(chalk.yellow('Query: ') + chalk.green(e.query))
      // console.log(chalk.yellow('Params: ') + chalk.cyan(JSON.stringify(e.params)))
      // console.log(chalk.yellow('Duration: ') + chalk.magenta(`${e.duration}ms`))
      console.log(kleur.yellow('Query: ') + kleur.green(e.query))
      console.log(kleur.yellow('Params: ') + kleur.cyan(JSON.stringify(e.params)))
      console.log(kleur.yellow('Duration: ') + kleur.magenta(`${e.duration}ms`))
    })
  }
  async onModuleInit() {
    console.info(new Date(), 'connecting to the database')
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }

  cleanDb() {
    return this.$transaction([
      //tear down logic
      this.user.deleteMany(),
    ])
  }
}
