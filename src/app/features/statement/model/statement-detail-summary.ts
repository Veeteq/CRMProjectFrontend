import { Account } from "src/app/model/account";
import { PaymentMethod } from "src/app/model/payment-method";

export class StatementDetailSummary {
  id: number;
  account: Account;
  operationDate: Date;
  title: string;
  amount: number;
  paymentMethod: PaymentMethod;
}