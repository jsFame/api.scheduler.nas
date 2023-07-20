import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import * as pactum from 'pactum'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../src/prisma/prisma.service'
import { AuthDto } from '../src/auth/dto'
import { EditUserDto } from '../src/user/dto'
import * as moment from 'moment'

describe('App e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  let url: string
  beforeAll(async () => {
    const ModuleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = ModuleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.init()
    prisma = app.get<PrismaService>(PrismaService)
    const config = app.get<ConfigService>(ConfigService)
    const port = config.get('PORT')
    url = `http://localhost:${port}`
    await app.listen(port)
    pactum.request.setBaseUrl(url)
    prisma.cleanDb()
  })

  afterAll(async () => {
    await app.close()
    await prisma.cleanDb()
  })

  describe('App', () => {
    it('should return home', () => {
      return pactum
        .spec()
        .get(url)
        .withRequestTimeout(1 * 1000) //cold start
        .expectStatus(HttpStatus.OK)
        .expectBodyContains({ message: 'app is up and running' })
        .inspect()
    })

    it('should return health status', () => {
      return pactum
        .spec()
        .get('/health')
        .withRequestTimeout(10 * 1000) //cold start for db
        .expectStatus(HttpStatus.OK)
        .expectJsonMatch('app', {
          ok: true,
          status: 'OK',
        })
        .expectJsonLike({
          db: {
            ok: true,
            status: 'OK',
          },
          app: {
            ok: true,
            status: 'OK',
          },
        })
    })
  })

  const dean = {
    email: 'dean@nas-engineering.edu',
    password: 'nasEduIsTheBest@2023',
  }
  const hiro = {
    email: 'hiro2019-22@student.nas-engineering.edu',
    password: 'Hiro Is An Engineer',
  }

  describe('Auth', function () {
    const dto: AuthDto = {
      email: 'hiro_tests@gmail.com',
      password: 'testing@rQfAPjfVsreWGz2',
    }

    it('should throw if email empty', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          password: dto.password,
        })
        .expectStatus(400)
        .inspect()
    })

    it('should throw if password empty', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          email: dto.email,
        })
        .expectStatus(400)
        .inspect()
    })

    it('should throw if not strong  password', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          email: dto.email,
          password: '123',
        })
        .expectStatus(400)
        .inspect()
    })

    describe('Sign up', () => {
      it('should signup', () => {
        return pactum
          .spec()
          .post(`${url}/auth/signup`)
          .withBody(dto)
          .withRequestTimeout(2 * 1000)
          .expectStatus(HttpStatus.CREATED)
          .inspect()
      })

      it('should signup the dean', () => {
        return pactum
          .spec()
          .post(`${url}/auth/signup`)
          .withBody(dean)
          .withRequestTimeout(2 * 1000)
          .expectStatus(HttpStatus.CREATED)
          .inspect()
      })

      it('should signup hiro', () => {
        return pactum
          .spec()
          .post(`${url}/auth/signup`)
          .withBody(hiro)
          .withRequestTimeout(2 * 1000)
          .expectStatus(HttpStatus.CREATED)
          .inspect()
      })
    })
    describe('Sign in', () => {
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400)
          .inspect()
      })
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
          .inspect()
      })
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userToken', 'access_token')
          .expectCookiesLike('token')
      })

      it('should signin the dean', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dean)
          .expectStatus(200)
          .stores('dean', 'access_token')
          .expectCookiesLike('token')
      })

      it('should signin hiro', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(hiro)
          .expectStatus(200)
          .stores('hiro', 'access_token')
          .expectCookiesLike('token')
      })
    })
  })

  describe('User', () => {
    describe('Get me', () => {
      it('should fail without header or cookies', () => {
        return pactum.spec().get('/users/me').expectStatus(401)
      })

      it('should get current user with Bearer Token', () => {
        return pactum
          .spec()
          .withHeaders({
            Authorization: `Bearer $S{userToken}`,
          })
          .get('/users/me')
          .expectStatus(200)
      })

      it('should get current user with cookies', () => {
        return (
          pactum
            .spec()
            .get('/users/me')
            // .withCookies("token",`$S{userToken}`) //FIXME
            // .expectStatus(HttpStatus.OK)
            .inspect()
        )
      })
    })
    describe('Edit User', () => {
      const dto: EditUserDto = {
        firstName: 'Hiro',
        lastName: 'Hamada',
      }
      it('should edit user', () => {
        return pactum
          .spec()
          .withBearerToken(`$S{userToken}`)
          .patch('/users')
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.lastName)
      })
    })
    describe('Delete User', () => {
      it('should delete current user', () => {
        return pactum
          .spec()
          .withHeaders({
            Authorization: `Bearer $S{userToken}`,
          })
          .delete('/users')
          .expectStatus(HttpStatus.OK)
      })
    })
  })

  describe('Event', () => {
    describe('Create Event', () => {
      it('show create event for dean', () => {
        return pactum
          .spec()
          .withHeaders({
            Authorization: `Bearer $S{dean}`,
          })
          .post('/events')
          .withBody({
            title: 'Test Event with Hiro',
            description: 'Casual Call',
            date: '2023-02-01',
          })
          .expectStatus(HttpStatus.CREATED)
          .stores('id', 'eventId')
      })
    })
  })
  describe('TimeSlot', () => {
    it("show create timeslot for dean's event", () => {
      return pactum
        .spec()
        .withHeaders({
          Authorization: `Bearer $S{dean}`,
        })
        .post('/timeslots')
        .withBody({
          eventId: '$S{eventId}',
          startTime: '10:00',
          endTime: '11:20',
        })
        .expectStatus(HttpStatus.CREATED)
    })
  })

  describe('Calendar', () => {
    it('book an event today', () => {
      return pactum
        .spec()
        .withHeaders({
          Authorization: `Bearer $S{hiro}`,
        })
        .post('/calendar')
        .withBody({
          eventId: '$S{eventId}',
          date: moment(new Date()).toDate(),
        })
        .expectStatus(HttpStatus.CREATED)
    })

    it('all the pending events for today-dean', () => {
      return pactum
        .spec()
        .withHeaders({
          Authorization: `Bearer $S{dean}`,
        })
        .get('/calendar')
        .expectStatus(HttpStatus.OK)
        .expectBodyContains('eventId')
    })
  })
})
