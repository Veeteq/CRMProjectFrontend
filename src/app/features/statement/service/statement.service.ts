import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Statement } from '../statement';

@Injectable({
  providedIn: 'root'
})
export class StatementService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Statement[]> {
    const getAllUrl = `${this.apiUrl}/statements/`;
    return this.httpClient.get<Statement[]>(`${getAllUrl}`);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/statements/${id}`);
  }
}
