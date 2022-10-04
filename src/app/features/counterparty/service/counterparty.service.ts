import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Counterparty } from "../model/counterparty";

@Injectable({
  providedIn: 'root'
})
export class CounterpartyService {  
  private apiUrl = `${environment.apiUrl}/counterparties`;

  constructor(private httpClient: HttpClient) { }

  getCounterpartiesByName(name: string): Observable<Counterparty[]> {    
    const findByNameUrl = `${this.apiUrl}/${name}`;
    return this.httpClient.get<Counterparty[]>(findByNameUrl);
  }

  save(data: Counterparty): Observable<any> {
    console.log("save: " + JSON.stringify(data));
    const saveUrl = `${this.apiUrl}/save`;
    return this.httpClient.post<any>(saveUrl, data);
  }

}