import { Cart } from 'src/carts/entities/cart.entity';

export class Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  Cart?: Cart;
  cartId?: string;
}
