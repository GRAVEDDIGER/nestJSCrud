import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserError } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const response = await this.prisma.user.create({
        data: { ...createUserDto },
      });
      return { ok: true, response };
    } catch (error) {
      console.log(error);
      return {ok:false,error}
    }
  }

  async findAll() {
    try {
      const response = await this.prisma.user.findMany({});
      return { ok: true, response };
    } catch (error) {
      console.log(error);
      return { ok: false, error };
    }
  }
  async localFindById(id: string): Promise<CreateUserDto | UserError> {
    try {
      const response = await this.prisma.user.findUnique({ where: { id } });
      return response;
    } catch (error) {
      console.log(error);
      return { ok: false, error };
    }
  }
  async localFindByUserName(
    username: string,
  ): Promise<CreateUserDto | UserError> {
    try {
      const response = await this.prisma.user.findUnique({
        where: { username: username },
      });
      return response;
    } catch (error) {
      console.log(error);
      return { ok: false, error };
    }
  }
  async localUpdateById(id: string, updateUserDto: UpdateUserDto) {
    try {
      const response = await this.prisma.user.update({
        where: { id },
        data: { ...updateUserDto },
      });
      return { ok: true, response };
    } catch (error) {
      console.log(error);
      return { ok: false, error };
    }
  }

  async localRemoveById(id: string) {
    try {
      const response = await this.prisma.user.delete({ where: { id } });
      return { ok: true, response };
    } catch (error) {
      console.log(error);
      return { ok: false, error };
    }
  }
}
