import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/API-services/app.service';
import { SharedService } from 'src/app/services/shared-services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data!: any;
  indexNames!: string[];
  availableIndexes: any;
  userName: any;
  isDisabled: boolean = false
  constructor(private appService: AppService, private sharedService: SharedService) { }

  ngOnInit() {
    this.userName = "Praveen Nagula";
    this.getData();
  }
  async getData() {
    try {
      this.data = await this.appService.getData().toPromise();
      console.log(this.data);
      this.availableIndexes = this.data.indexes;
      this.indexNames = Object.keys(this.availableIndexes);
    } catch (error) {
      console.error(error);
    }
  }
  refreshData(): void {
    this.getData();
  }
  trimAccountName(accountName: string): string {
    const atIndex = accountName.indexOf('@');
    let trimmedName =
      atIndex !== -1 ? accountName.slice(0, atIndex) : accountName;
    if (trimmedName.length > 20) {
      trimmedName = trimmedName.slice(0, 20) + '...';
    }
    return trimmedName.replace(/\./g, ' ');
  }
  editIndex(indexName: any) {
    console.log(indexName);
  }
}
