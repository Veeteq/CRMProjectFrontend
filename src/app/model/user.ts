export class User {
  username: string;
  token: string;
  expirationTime: number;

  constructor(username: string, token: string, expiexpirationTime: number) {
    this.username = username;
    this.token = token;
    this.expirationTime = expiexpirationTime;
  }

  expired(): boolean {
    if (this.expirationTime && Date.now() < this.expirationTime) {
      return false
    }
    return true;
  }

}