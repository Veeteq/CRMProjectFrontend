import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap, shareReplay } from 'rxjs/operators';
import { LoginRequest } from "../model/login.request";
import { JwtResponse } from "../model/jwt.response";
import { environment } from 'src/environments/environment';
import { DatePipe } from "@angular/common";
import { User } from "../model/user";
import { Router } from "@angular/router";

const TOKEN_NAME = 'id_token';
const EXPIRES_AT = 'expires_at';
const CURRENT_USER = 'current_user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authUrl = environment.authUrl;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(CURRENT_USER)));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(loginRequest: LoginRequest): Observable<JwtResponse> {
    console.log(`AuthenticationService: login ${this.authUrl} ${JSON.stringify(loginRequest)}`);

    return this.httpClient.post<JwtResponse>(this.authUrl, loginRequest)
    .pipe(
      tap((resp: JwtResponse) => {   
        const user: User = new User(resp.username, resp.token, resp.expirationDate);
        localStorage.setItem(CURRENT_USER, JSON.stringify(user));
        //this.setSession(user);
        this.currentUserSubject.next(user);
        return shareReplay();
      })
    )
  }

  public logout() {
    console.log("AuthenticationService: logout")

    localStorage.removeItem(CURRENT_USER);
    this.currentUserSubject.next(null);

    this.router.navigate(["/home"]);
  }

  
  public token(): string {
    return localStorage.getItem(TOKEN_NAME)!;
  }

  private setSession(user: User) {
    console.log("AuthenticationService: setSession:" + JSON.stringify(user));

    localStorage.setItem(CURRENT_USER, JSON.stringify(user));
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