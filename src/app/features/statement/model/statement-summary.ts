export interface StatementSummary {
  id: number,
  fileName: string;
  raportDate: Date;
  account: {id: number, name: string}
}