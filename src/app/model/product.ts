export class Product {
  id: number;
  name: string;
  category: string;

  constructor(product?: Partial<Product>) {
    Object.assign(this, product)
  }
}