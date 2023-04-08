import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const response = {
        response: await this.prisma.product.create({
          data: { ...createProductDto },
        }),
        OK: true,
        status: 'Product created successfully',
      };
      return response;
    } catch (e) {
      console.log(e);
      return { ok: false, status: 'Error creating product' };
    }
  }

  async findAll() {
    try {
      const response = await this.prisma.product.findMany({});
      return {
        response,
        ok: true,
        status: 'Product list successfully retrived from DB',
      };
    } catch (error) {
      console.log(error);
      return { error, status: 'Error fetching product list', ok: false };
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.prisma.product.findUnique({
        where: {
          id: id,
        },
      });
      return {
        response,
        ok: true,
        status: 'Product successfully retrived from DB',
      };
    } catch (error) {
      console.log(error);
      return { error, status: 'Error fetching product', ok: false };
    }
  }

  async update(id: string, updateProductDto: Partial<UpdateProductDto>) {
    try {
      const response = await this.prisma.product.update({
        where: {
          id: id,
        },
        data: { ...updateProductDto },
      });
      return {
        response,
        ok: true,
        status: 'Product successfully updated on DB',
      };
    } catch (error) {
      console.log(error);
      return { error, status: 'Error updating product', ok: false };
    }
  }

  async remove(id: string) {
    try {
      const response = await this.prisma.product.delete({ where: { id } });
      return {
        response,
        ok: true,
        status: 'Product successfully deleted from DB',
      };
    } catch (error) {
      console.log(error);
      return { error, status: 'Error deliting product', ok: false };
    }
  }
}
