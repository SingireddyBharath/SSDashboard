import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showCustomWindow = false;
  constructor(private router: Router, private appService: AppService) { }
  logOut(): void {
    this.showCustomWindow = true;
    this.appService.setAuth(false);
    this.router.navigate(["/login"]);
  }
}
