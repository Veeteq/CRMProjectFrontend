import { Account } from "src/app/model/account";

export interface StatementSummary {
  id: number;
  fileName: string;
  reportDate: Date;
  account: Account;
  itemsCount: number;
  totalAmount: number;
}