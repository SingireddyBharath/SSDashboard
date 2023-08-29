import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { SharedService } from "../shared-services/shared.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private sharedService: SharedService, private router: Router) { }

  canActivate(): any {
    if (this.sharedService.isloggedIn) {
      return true;
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
