import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { tap, shareReplay } from 'rxjs/operators';
import { LoginRequest } from "../model/login.request";
import { LoginResponse } from "../model/login.response";
import { environment } from 'src/environments/environment';
import { DatePipe } from "@angular/common";

const TOKEN_NAME = 'id_token';
const EXPIRES_AT = 'expires_at';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authUrl = environment.authUrl;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient){}
  
  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    console.log(`AuthenticationService: login ${this.authUrl} ${JSON.stringify(loginRequest)}`);

    return this.http.post<LoginResponse>(this.authUrl, loginRequest).pipe(
      tap((resp: LoginResponse) => this.setSession(resp)),      
      shareReplay()
    );
  }

  public logout() {
    console.log("AuthenticationService: logout")

    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(EXPIRES_AT);
    this.loggedIn.next(false);
  }

  
  public token(): string {
    return localStorage.getItem(TOKEN_NAME)!;
  }
  
  get isLoggedIn(): Observable<boolean> {
    console.log("AuthenticationService: get isLoggedIn")
    
    let loggedIn: boolean = false;
    let expirationDate = this.getExpirationDate();

    if (expirationDate && Date.now() < expirationDate) {
      loggedIn = true;
    }

    this.loggedIn.next(loggedIn);
    return this.loggedIn.asObservable();
  }

  private setSession(loginResponse: LoginResponse) {
    const expiresAt = loginResponse.expirationDate;
    console.log("Token expires at " + expiresAt);
    console.log("Token date and time is " + this.transformDate(expiresAt));

    localStorage.setItem(TOKEN_NAME, loginResponse.token);
    localStorage.setItem(EXPIRES_AT, JSON.stringify(expiresAt.valueOf()));

    this.loggedIn.next(true);
  }  

  private getExpirationDate(): number {
    const expiration = localStorage.getItem(EXPIRES_AT);

    if (expiration) {
      return JSON.parse(expiration!);
    }

    return null!;
  }

  private transformDate(dateValue: number): string {
    const datePipe = new DatePipe('en-US');
    const shortDate = datePipe.transform(dateValue, 'yyyy-MM-dd HH:mm:ss');
    return shortDate;
  }
}