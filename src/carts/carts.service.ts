import { Injectable } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}
  create(createCartDto: CreateCartDto) {
    try {
      const response = this.prisma.cart.create({ data: createCartDto });
      return { response, ok: true };
    } catch (error) {
      console.log(error);
      return { error, ok: false };
    }
  }

  async findAll() {
    try {
      const response = await this.prisma.cart.findMany({});
      return { response, ok: true };
    } catch (error) {
      console.log(error);
      return { error, ok: false };
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.prisma.cart.findUnique({ where: { id } });
      return { response, ok: true };
    } catch (error) {
      console.log(error);
      return { error, ok: false };
    }
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    try {
      const response = await this.prisma.cart.update({
        where: { id },
        data: updateCartDto,
      });
      return { response, ok: true };
    } catch (error) {
      console.log(error);
      return { error, ok: true };
    }
  }

  async remove(id: string) {
    try {
      const response = await this.prisma.cart.delete({ where: { id: id } });
      return { response, ok: true };
    } catch (error) {
      console.log(error);
      return { error, ok: false };
    }
  }
}
