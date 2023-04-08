import { Prisma } from '@prisma/client';
export class UpdateUserDto implements Prisma.UserUpdateInput {
  name?: string;
  lastName?: string;
  username?: string;
  hash: string;
  carts?: any;
}
