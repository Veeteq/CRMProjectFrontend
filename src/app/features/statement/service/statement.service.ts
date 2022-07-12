import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PageResponse } from '../model/page-response';
import { StatementDetail } from '../model/statement-detail';
import { StatementResponse } from '../model/statement-response';
import { StatementSummary } from '../model/statement-summary';

@Injectable({
  providedIn: 'root'
})
export class StatementService {
  private apiUrl = `${environment.apiUrl}/statements`;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<StatementSummary[]> {
    const getAllUrl = `${this.apiUrl}/`;
    return this.httpClient.get<StatementSummary[]>(`${getAllUrl}`);
  }

  getSummary(page: number, size: number, column: string, dir: string): Observable<PageResponse> {
    let params = new HttpParams();
    params = params.append('page',   page.toString());
    params = params.append('size',   size.toString());
    params = params.append('column', column);
    params = params.append('dir',    dir);
    const getSummaryUrl = `${this.apiUrl}/summary/`;
    return this.httpClient.get<PageResponse>(getSummaryUrl, { params });
  }

  parseStatement(formData: FormData, userId: number, reportDate: any): Observable<StatementResponse> {
    const parseUrl = `${this.apiUrl}/parseBankStatement?userId=${userId}&reportDate=${reportDate}`;
    return this.httpClient.post<StatementResponse>(parseUrl, formData);
  }

  saveStatement(formData: FormData): Observable<HttpResponse<StatementDetail>> {
    const saveUrl = `${this.apiUrl}/saveBankStatement`;
    return this.httpClient.post<StatementDetail>(saveUrl, formData, {observe: 'response'})
    .pipe(catchError(this.handleError));
  }

  delete(id: number) {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(deleteUrl);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
    }
    return throwError("Unexpected error - please try again later");
  }  
}
