import { Component } from '@angular/core';
import {FormControl , FormGroup} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  Data = new FormGroup({
    uname : new FormControl(),
    password: new FormControl()
  })
  login(){
    console.log(this.Data.value.uname , this.Data.value.password )
  }

}
