import { StatementDetail } from "./statement-detail";

export interface StatementResponse {
  status: string;
  error: string;
  details: StatementDetail[];
}