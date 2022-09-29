import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CounterpartyService {  
  private apiUrl = `${environment.apiUrl}/counterparties`;

  constructor(private httpClient: HttpClient) { }

  getCounterpartiesByName(name: string): Observable<any[]> {    
    const findByNameUrl = `${this.apiUrl}/${name}`;
    return this.httpClient.get<any[]>(findByNameUrl);
  }

}