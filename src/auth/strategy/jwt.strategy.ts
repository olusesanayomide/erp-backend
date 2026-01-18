import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayLoad {
  sub: string;
  email: string;
  roles: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      // Look for the token in the 'Authorization: Bearer <token>' header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Use the same secret we used to sign the token
      secretOrKey: config.getOrThrow('JWT_SECRET'),
    });
  }

  // This method runs AFTER the token is successfully verified
  validate(payload: JwtPayLoad) {
    // Whatever is returned here is appended to the Request object as 'req.user'
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
