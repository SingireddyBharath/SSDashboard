import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  validateUser(): Observable<any> {
    return this.http.get<any>('https://6380f4bf786e112fe1bf0f9a.mockapi.io/users');
  }

}
