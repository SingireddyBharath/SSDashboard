import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared-services/shared.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showCustomWindow = false;
  constructor(private router: Router, private sharedService: SharedService) { }
  logOut(): void {
    this.showCustomWindow = true;
    this.sharedService.isloggedIn = false;
    this.router.navigate(["/login"]);
  }
}
