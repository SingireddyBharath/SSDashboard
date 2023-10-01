import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  // varaibles 
  userName: string = ''
  password: string = ''
  showPassword = false;
  isCredentialsWrong = false;

  ngOnInit() {
    if (localStorage.getItem('accessToken')) {
      this.router.navigate(['/home']);
    }
  }

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async Login(userDetails: any) {
    console.log(userDetails);
    const response: any = await this.authService.validateUser().toPromise();
    if (response[0].userName === userDetails.userName && response[0].password === userDetails.password) {
      this.authService.notifyLoginSuccess();
      this.router.navigate(['/home']);
      localStorage.setItem('accessToken', 'qewqwefqw1niu7v2e3mcqu7e')
    }
    else {
      this.isCredentialsWrong = true;
    }

  }
}
