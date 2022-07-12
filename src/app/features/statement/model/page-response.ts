import { StatementSummary } from "./statement-summary";

export class PageResponse {
  content: StatementSummary[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}