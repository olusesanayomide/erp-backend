import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  //   Register User
  async register(dto: CreateUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        roles: {
          connect: { name: dto.role },
        },
      },
      include: { roles: true },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  // User Login
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { roles: true },
    });
    if (!user) {
      throw new UnauthorizedException('Credentials Incorrect');
    }

    const pwMatches = await bcrypt.compare(dto.password, user.password);
    if (!pwMatches) {
      throw new UnauthorizedException('Credentials Incorrect ');
    }
    // Generate Jwt Payload
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles.map((r) => r.name),
    };
    // sign the  token and retur it
    const token = await this.jwt.signAsync(payload);
    return {
      message: 'Logged in Successfully',
      access_token: token,
      user: {
        email: user.email,
        name: user.name,
        roles: user.roles.map((r) => r.name),
      },
    };
  }
}
