import { Component } from '@angular/core';
import {FormControl , FormGroup} from '@angular/forms'
import { MatCardLgImage } from '@angular/material/card';
import { AppService } from 'src/app/services/app.service';

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
