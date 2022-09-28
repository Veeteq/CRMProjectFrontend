import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Account } from "../model/account";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  
  constructor(private httpClient: HttpClient) { }
  
  getAccounts(): Observable<Account[]> {
    const accountsUrl = `${this.apiUrl}/`;
    return this.httpClient.get<Account[]>(accountsUrl);
  }

}