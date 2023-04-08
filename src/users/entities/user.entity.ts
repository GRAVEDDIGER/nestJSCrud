import { Cart } from 'src/carts/entities/cart.entity';

export class User {
  id: string;
  name: string;
  lastName: string;
  username: string;
  carts: Cart[];
}
