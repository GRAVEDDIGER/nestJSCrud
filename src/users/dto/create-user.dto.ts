import { Prisma } from '@prisma/client';
export type CreateUserDto = Prisma.XOR<
  Prisma.UserCreateInput,
  Prisma.UserUncheckedCreateInput
>;
