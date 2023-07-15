import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../../prisma/prisma.service'
import { Request as RequestType } from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private jwtConstants: any

  constructor(private config: ConfigService, private prisma: PrismaService) {
    const mode = config.get('MODE') || 'dev'
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWTFromCookie, ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: mode == 'dev' || mode == 'test',
      secretOrKey: config.get('JWT_SECRET'),
    })
  }

  validate(payload: { sub: number; email: string }) {
    const user = this.prisma.wallet.findUnique({
      where: {
        id: payload.sub,
      },
    })
    if (!user) return null //throws the 401 error

    return { userId: payload.sub, email: payload.email }
    // whatever is returned is appended to req.user
  }
  private static extractJWTFromCookie(req: RequestType): string | null {
    const tokenField = 'token'
    console.debug(req.cookies)
    if (req.cookies && tokenField in req.cookies && req.cookies[tokenField].length > 0) {
      return req.cookies.token
    }
    return null
  }
}
