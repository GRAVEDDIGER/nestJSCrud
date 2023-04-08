export class CreateProductDto {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
