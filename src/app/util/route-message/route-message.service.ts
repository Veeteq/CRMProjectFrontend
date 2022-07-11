import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteMessageService {
  private _message: string;

  constructor() { }

  get message(): string {
    const result = this._message;
    console.log("get message: " + result + " and clear.");
    this.clear();

    return result;
  }

  set message(val: string) {
    console.log("val: " + val);
    this._message = val;
  }

  clear() {
    this._message = null;
  }
}
