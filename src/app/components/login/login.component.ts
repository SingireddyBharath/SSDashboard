import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private appService: AppService, private router: Router) { }
  userName: any = ''
  password: any = ''
  loginFailed: boolean = false
  Login(userDetails: any) {
    this.appService.validateUser().subscribe((response:any) => {
      if (response[0].userName === userDetails.userName && response[0].password === userDetails.password) {
        this.appService.setAuth(true);
        this.router.navigate(['/admin']);
      }
      else {
        this.loginFailed = false;
      }
    })
  }
}
