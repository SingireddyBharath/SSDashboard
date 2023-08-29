import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/API-services/app.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data!: any;
  indexNames!: string[];
  availableIndexes: any;
  availablePrompts: any;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    try {
      this.data = await this.appService.getData().toPromise();
      console.log(this.data);
      this.availableIndexes = this.data[0].indexes;
      this.availablePrompts = this.data[0].prompts;
      this.indexNames = Object.keys(this.availableIndexes);
    } catch (error) {
      console.error(error);
    }
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
}
