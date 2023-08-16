import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private appService: AppService) { }
  userName: any = ''
  password: any = ''
  Login(details: any) {
    this.appService.getUserDetails().subscribe((res) => {
      const data = res[0]
      const isValid = (data.userName === details.userName && data.password === details.password)
      console.log(isValid);
    })
  }
}
