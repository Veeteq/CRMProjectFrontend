import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PageResponse } from '../model/page-response';
import { Statement } from '../model/statement';
import { StatementDetailSummary } from '../model/statement-detail-summary';
import { StatementResponse } from '../model/statement-response';

@Injectable({
  providedIn: 'root'
})
export class StatementService {
  private apiUrl = `${environment.apiUrl}/statements`;

  constructor(private httpClient: HttpClient) { }

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

  saveStatement(formData: FormData, isNew: boolean): Observable<HttpResponse<any>> {
    const saveUrl = `${this.apiUrl}/saveBankStatement`;

    if (isNew) {
      return this.httpClient.post(saveUrl, formData, { observe: 'response' })
        .pipe(catchError(this.handleError));
    } else {
      return this.httpClient.put(saveUrl, formData, { observe: 'response' })
        .pipe(catchError(this.handleError));
    }
  }

  findStatement(statementId: string): Observable<HttpResponse<Statement>> {
    const findByIdUrl = `${this.apiUrl}/${statementId}`;
    return this.httpClient.get<Statement>(findByIdUrl, {observe: 'response'} )
    .pipe(catchError(this.handleError));
  }

  findStatmentFile(statementId: string): Observable<HttpResponse<Blob>> {
    const findByIdUrl = `${this.apiUrl}/${statementId}/file`;
    return this.httpClient.get(findByIdUrl, {observe: 'response', responseType: 'blob' } )
    .pipe(catchError(this.handleError));
  }
  
  delete(id: number) {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(deleteUrl);
  }

  findStatementDetailsByDate(currDate: string): Observable<HttpResponse<StatementDetailSummary[]>> {
    const findDetailsByDateUrl = `${this.apiUrl}/details/${currDate}`;
    return this.httpClient.get<StatementDetailSummary[]>(findDetailsByDateUrl, {observe: 'response'} )
    .pipe(catchError(this.handleError));
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
