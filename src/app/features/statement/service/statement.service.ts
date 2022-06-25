import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Statement } from '../model/statement';
import { StatementDetail } from '../model/statement-detail';
import { StatementResponse } from '../model/statement-response';
import { Statement } from '../statement';

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

  parseStatement(formData: FormData, userId: number): Observable<StatementResponse> {
    const parseUrl = `${this.apiUrl}/parseBankStatement?userId=${userId}`;
    return this.httpClient.post<StatementResponse>(parseUrl, formData);
  }

  saveStatement(formData: FormData): Observable<StatementDetail> {
    const saveUrl = `${this.apiUrl}/saveBankStatement`;
    return this.httpClient.post<StatementDetail>(saveUrl, formData);
  }

  delete(id: number) {
    const deleteUrl = `${this.apiUrl}/statements/${id}`;
    return this.httpClient.delete(deleteUrl);

    const getAllUrl = `${this.apiUrl}/statements/`;
    return this.httpClient.get<Statement[]>(`${getAllUrl}`);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/statements/${id}`);
  }
}
