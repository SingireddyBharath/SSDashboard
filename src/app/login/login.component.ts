import { Component } from '@angular/core';
import { AppService } from 'src/app/API-services/app.service'
import { Router } from '@angular/router';
import { AuthService } from '../auth-services/auth.service';
import { SharedService } from '../shared-services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private appService: AppService, private router: Router, private authService: AuthService, private sharedService: SharedService) { }
  userName: any = ''
  password: any = ''
  loginFailed: boolean = false
  async Login(userDetails: any) {
    const response: any = await this.authService.validateUser().toPromise();
    if (response[0].userName === userDetails.userName && response[0].password === userDetails.password) {
      this.sharedService.isloggedIn = true;
      this.router.navigate(['/home']);
    }
    else {
      this.loginFailed = true;
    }


  }
}
