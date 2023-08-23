import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data!: any;
  indexNames!: string[];
  availableIndexes: any;
  mainPage = true;
  editPage = false;
  createPage = false;
  currentEditPage = "";
  jsonData = {
    indexName: '',
    properties: {
      apiKey: '',
      env: '',
      accountName: '',
      fetchFromPIM: false,
      llmConfig: {
        embeddingModel: {
          isAzureOpenAI: false,
          model: '',
          'api-version': ''
        },
        consolidatedQueryModel: {
          isAzureOpenAI: true,
          model: '',
          'api-version': '',
          temperature: 0
        },
        presentationModel: {
          isAzureOpenAI: true,
          model: '',
          'api-version': '',
          temperature: 0
        }
      },
      topK: 0,
      namespaces: ["a","b","c"]
    },
    prompts: {
      CX_INIT_PROMPT: '',
      CONSOLIDATE_QUERY_PROMPT: ''
    }
  };

  onSubmit() {
    console.log(this.jsonData);
    // You can perform further actions, such as sending the data to a server
  }

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    try {
      this.data = await this.appService.getData().toPromise();
      console.log(this.data);
      this.availableIndexes = this.data[0].availableIndexes;
      this.indexNames = Object.keys(this.data[0].availableIndexes);
    } catch (error) {
      console.error(error);
    }
  }

  trimAccountName(accountName: string): string {
    const atIndex = accountName.indexOf('@');
    let trimmedName = atIndex !== -1 ? accountName.slice(0, atIndex) : accountName;
    if (trimmedName.length > 20) {
      trimmedName = trimmedName.slice(0, 20) + '...';
    }
    return trimmedName.replace(/\./g, ' ');
  }

  editIndex(indexName: string): void {
    console.log(indexName);
    this.currentEditPage = indexName;
    this.editPage = true;
    this.createPage = false;
    this.mainPage = false;
  }

  backToHome(): void {
    this.mainPage = true;
    this.editPage = false;
    this.createPage = false;
  }

  createIndex(): void {
    this.createPage = true;
    this.mainPage = false;
    this.editPage = false;
  }
}
