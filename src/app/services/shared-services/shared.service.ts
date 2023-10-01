import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isloggedIn: boolean = false;
  constructor() { }
}
