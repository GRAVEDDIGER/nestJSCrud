import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

export class Cart {
  id: string;
  products: Product[];
  User?: User;
  userId?: string;
}
