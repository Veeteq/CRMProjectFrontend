import { Account } from "src/app/model/account";

export class StatementDetailSummary {
  id: number;
  account: Account;
  operationDate: Date;
  title: string;
  amount: number;
}