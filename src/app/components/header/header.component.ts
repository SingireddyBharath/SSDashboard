import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-services/auth.service';
import { SharedService } from 'src/app/services/shared-services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  isloggedIn = false;
  showCustomWindow = false;

  ngOnInit(): void {
    this.authService.loginSuccess$.subscribe(() => {
      if (localStorage.getItem('accessToken'))
        this.isloggedIn = true;
    });
  }

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  logout(): void {
    this.showCustomWindow = true;
    this.isloggedIn = false;
    localStorage.removeItem('accessToken');
    this._snackBar.open("Logout Successfull", 'X', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['logout-success-snackbar']
    });
    this.router.navigate(["/login"]);
  }

}
