import { Prisma } from '@prisma/client';
export type CreateUserDtoType = Prisma.XOR<
  Prisma.UserCreateInput,
  Prisma.UserUncheckedCreateInput
>;
export class CreateUserDto implements Prisma.UserCreateInput,Prisma.UserUncheckedCreateInput {
  name:string
  lastName:string
  hash:string
  username:string
} 