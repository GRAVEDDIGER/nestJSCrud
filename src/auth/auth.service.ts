import { Dependencies, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { UserError } from 'src/users/entities/user.entity';
@Injectable()
@Dependencies(UsersService)
export class AuthService {
  constructor(private usersService: UsersService) {}
  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<Prisma.UserCreateInput, 'hash'> | UserError> {
    const user = await this.usersService.localFindByUserName(username);
    if ('error' in user) return user;
    else {
      if (user.hash === pass) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hash, ...response } = user;
        return response;
      }
    }
  }
}
