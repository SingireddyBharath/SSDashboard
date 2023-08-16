import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor() {}

  static check(details:any):void{
    if(details.UserName == "admin" && details.password == "Kore@123"){
      console.log(true)
    }
  }
}
