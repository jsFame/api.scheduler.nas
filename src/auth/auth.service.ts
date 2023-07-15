import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { AuthDto } from './dto'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

  async signin(dto: AuthDto) {
    const wallet = await this.prisma.wallet.upsert({
      create: {
        address: dto.wallet,
      },
      update: {},
      where: {
        address: dto.wallet,
      },
    })

    if (!wallet) throw new ForbiddenException('invalid credentials')

    return this.signToken(wallet.id)
  }

  async signToken(walletId: number) {
    const payload = {
      sub: walletId,
    }
    const secret = this.config.get('JWT_SECRET')

    return {
      access_token: await this.jwt.signAsync(payload, {
        expiresIn: '24hr', //FIXME:
        secret: secret,
      }),
    }
  }
}
