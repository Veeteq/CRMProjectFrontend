import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Statement } from '../model/statement';
import { StatementDetail } from '../model/statement-detail';
import { StatementResponse } from '../model/statement-response';

@Injectable({
  providedIn: 'root'
})
export class StatementService {
  private apiUrl = `${environment.apiUrl}/statements`;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Statement[]> {
    const getAllUrl = `${this.apiUrl}/`;
    return this.httpClient.get<Statement[]>(`${getAllUrl}`);
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
    const deleteUrl = `${this.apiUrl}/statements/${id}`;
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
