import { Prisma } from '@prisma/client';

export type CartCreateInput = Prisma.CartCreateInput;

export type CartUncheckedCreateInput = Prisma.CartUncheckedCreateInput;

export type CreateCartDto = Prisma.XOR<
  CartCreateInput,
  CartUncheckedCreateInput
>;
