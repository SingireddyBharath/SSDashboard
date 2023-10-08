import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/services/API-services/app.service';
import { SharedService } from 'src/app/services/shared-services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  data!: any;
  indexNames!: string[];
  availableIndexes: any;
  userName = "Praveen Nagula";
  isDisabled = false;
  subscription: Subscription | undefined;

  constructor(private appService: AppService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.subscription = this.appService.getData().subscribe(
      (data: any) => {
        this.data = data;
        console.log(this.data);
        this.availableIndexes = this.data.indexes;
        this.indexNames = Object.keys(this.availableIndexes);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  refreshData(): void {
    this.getData();
  }

  trimAccountName(accountName: string): string {
    const atIndex = accountName.indexOf('@');
    let trimmedName = atIndex !== -1 ? accountName.slice(0, atIndex) : accountName;
    trimmedName = trimmedName.length > 20 ? trimmedName.slice(0, 20) + '...' : trimmedName;
    return trimmedName.replace(/\./g, ' ');
  }
}