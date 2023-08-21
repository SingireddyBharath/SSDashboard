import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  private isValid: boolean = false;

  constructor(private http: HttpClient) {}

  validateUser(): Observable<any> {
    return this.http.get<any>('https://6380f4bf786e112fe1bf0f9a.mockapi.io/users');
  }

  setAuth(val: boolean): void {
    this.isValid = val;
  }

  isAuthenticated(): boolean {
    return this.isValid;
  }
}


