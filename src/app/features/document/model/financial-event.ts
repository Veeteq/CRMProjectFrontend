import { Product } from "src/app/model/product";

export class FinancialEvent {
  type:    string;
  id:      number;
  product: Product;
  count:   number;
  price:   number;
  comment: string;
}