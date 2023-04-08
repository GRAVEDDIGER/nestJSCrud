import { CreateCartDto } from './create-cart.dto';

export type UpdateCartDto = Partial<CreateCartDto>;
//class UpdateCartDto extends PartialType(CreateCartDto) {}
