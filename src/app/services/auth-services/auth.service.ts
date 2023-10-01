import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginSuccessSubject = new Subject<void>();
  public loginSuccess$ = this.loginSuccessSubject.asObservable();
  public notifyLoginSuccess(): void {
    this.loginSuccessSubject.next();
  }
  
  constructor(private http: HttpClient) { }
  validateUser(): Observable<any> {
    return this.http.get<any>('https://6380f4bf786e112fe1bf0f9a.mockapi.io/users');
  }

}
