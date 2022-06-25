import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  
  constructor(private httpClient: HttpClient) { }
  
  getUsers(): Observable<any[]> {
    const usersUrl = `${this.apiUrl}/users`;
    return this.httpClient.get<any[]>(usersUrl);
  }

}