import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { SharedService } from "../services/shared-services/shared.service";
import { AuthService } from "../services/auth-services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private sharedService: SharedService, private router: Router,private authService:AuthService) { }

  canActivate(): boolean {
    if (localStorage.getItem('accessToken')) {
      this.authService.notifyLoginSuccess();
      return true;
    } else {
      this.authService.notifyLoginSuccess();
      this.router.navigate(["/login"]);
      return false;
    }
  }
  
}
