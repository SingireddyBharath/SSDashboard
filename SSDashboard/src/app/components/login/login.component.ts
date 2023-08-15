import { Component } from '@angular/core';
import {FormControl , FormGroup} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  UserName : any = ''
  password : any = ''
  Login(item:any){
    console.log(item)
    this.UserName =''
    this.password =''
  }
}
