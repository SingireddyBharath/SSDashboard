import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  private isValid: boolean = false;

  constructor(private http: HttpClient) { }

  validateUser(): Observable<any> {
    return this.http.get<any>('https://6380f4bf786e112fe1bf0f9a.mockapi.io/users');
  }

  setAuth(val: boolean): void {
    this.isValid = val;
  }

  isAuthenticated(): boolean {
    return this.isValid;
  }

  getData() {
    return this.http.get<any>('https://6380f4bf786e112fe1bf0f9a.mockapi.io/getData');
  }
  createIndex(indexData: any) {
    return this.http.put<any>("https://6380f4bf786e112fe1bf0f9a.mockapi.io/getData/0", indexData);
  }
}


