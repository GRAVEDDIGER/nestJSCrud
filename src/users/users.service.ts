import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async findOne(id: string) {
    try {
      const response = await this.prisma.user.findUnique({ where: { id } });
      return { ok: true, response };
    } catch (error) {
      console.log(error);
      return { ok: false, error };
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const response = await this.prisma.user.update({
        where: { id },
        data: { UpdateUserDto },
      });
      return { ok: true, response };
    } catch (error) {
      console.log(error);
      return { ok: false, error };
    }
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
