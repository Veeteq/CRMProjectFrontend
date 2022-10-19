import { DocumentSummary } from "./document-summary";

export class PageResponse {
  content: DocumentSummary[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}