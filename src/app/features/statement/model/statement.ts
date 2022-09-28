import { Account } from "src/app/model/account";
import { StatementDetail } from "./statement-detail";

export class Statement {
  id: number;
  fileName: string;
  reportDate: Date;
  account: Account;
  details: StatementDetail[];
}