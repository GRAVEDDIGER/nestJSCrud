import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'login') {
  constructor(private authService: AuthService) {
    super();
  }
  createHash = (password: string) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };
  async validate(
    username: string,
    password: string,
  ): Promise<Omit<Prisma.UserCreateInput, 'hash'>> {
    const user = await this.authService.validateUser(
      username,
      this.createHash(password),
    );
    if ('error' in user) throw new UnauthorizedException(user);
    return user;
  }
}

@Injectable()
export class RegisterStrategy extends PassportStrategy(Strategy, 'register') {
  constructor(private usersService = UsersService) {
    super({ passReqToCallback: true });
  }
  createHash = (password: string) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };
  async validate(
    req: Request,
    username: string,
    password: string,
  ): Promise<Omit<Prisma.UserCreateInput, 'hash'>> {}
}
