import { CanActivate, Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private appService: AppService, private router: Router) {}

  canActivate(): boolean {
    if (this.appService.isAuthenticated()) {
      return true;
    } else {
      // this.redirectToLogin();
      return true;
    }
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
