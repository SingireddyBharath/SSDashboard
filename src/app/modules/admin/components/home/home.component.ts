import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import Ajv, { ErrorObject } from 'ajv';
const ajv = new Ajv();
import { dataSchema, sampleJsonData } from './dataSchema';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  sampleJson = JSON.stringify(sampleJsonData);
  data!: any;
  indexNames!: string[];
  availableIndexes: any;
  showSuccessWindow = false;
  mainPage = true;
  editPage = false;
  createPage = false;
  showCelebration: boolean = false;
  currentEditPage = '';

  uploadedFileName!: any;
  errorMessage: any;
  uploadedFile: any;
  file: any;
  availablePrompts: any;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.uploadedFile = event.target.files[0];

    if (file.type !== 'application/json') {
      this.errorMessage = 'Only JSON files are supported.';
      this.file = null;
      this.uploadedFileName = file.name;
      this.uploadedFile = null;
    } else {
      this.errorMessage = null;
      const reader = new FileReader();

      reader.onload = () => {
        const jsonData = reader.result as string;
        // Validate the JSON data against your schema
        const validate = ajv.compile(dataSchema);
        const isValid = validate(JSON.parse(jsonData));

        if (!isValid) {
          const errors: any = ajv.errors;

          if (errors !== null) {
            const errorMessages: string[] = errors.map((error: any) => error.message);
            this.errorMessage = `Invalid JSON format! Please correct the following errors:\n${errorMessages.join('\n')}`;
          } else {
            this.errorMessage = "Invalid data in the file. Please provide valid data.";
          }

          this.file = null;
          this.uploadedFile = null;
          this.uploadedFileName = file.name;
          return;
        }

        this.file = JSON.parse(jsonData);
        this.uploadedFileName = file.name;
      };

      reader.readAsText(file);
    }
  }

  async confirmUpload() {
    console.log(this.file);
    try {
      const res: any = this.appService.createIndex(this.file).toPromise();
      this.showSuccessWindow = true;
      this.showCelebration = true;

    }
    catch {
      console.log("error in creating the index");
    }
  }
  cancelUpload() {
    this.uploadedFile = null;
    this.uploadedFileName = null;
    this.errorMessage = null;
  }

  async getData() {
    try {
      this.data = await this.appService.getData().toPromise();
      console.log(this.data);
      this.availableIndexes = this.data[0].availableIndexes;
<<<<<<< HEAD
      this.indexNames = Object.keys(this.data[0].availableIndexes);
=======
      this.availablePrompts = this.data[0].availablePrompts;
      this.indexNames = Object.keys(this.availableIndexes);
>>>>>>> cb3c5ffd2753698a512dde33900d7b70babea45f
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
  exportIndex(item: any) {
    const config = this.availableIndexes[item];
    const promts = this.availablePrompts[item];
    const exportData = JSON.stringify({
      "indexName": item,
      "properties": config,
      "prompts": promts
    })
    const url = 'data:application/json;base64,' + btoa(exportData);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = item + '.json';
    document.body.appendChild(anchor);
    anchor.click();
  }
  editIndex(indexName: string): void {
    console.log(indexName);
    this.currentEditPage = indexName;
    this.editPage = true;
    this.createPage = false;
    this.mainPage = false;
  }

  backToHome(): void {
    this.getData();
    this.showSuccessWindow = false;
    this.uploadedFileName = "";
    this.errorMessage = "";
    this.uploadedFile = null;
    this.file = null;
    this.mainPage = true;
    this.editPage = false;
    this.createPage = false;
  }
  createIndex(): void {
    this.createPage = true;
    this.mainPage = false;
    this.editPage = false;
  }
  onFileSelect(event: any) {
    this.file = event.files[0];
  }
  downloadSampleJson() {
    const url = 'data:application/json;base64,' + btoa(this.sampleJson);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'sample.json';
    document.body.appendChild(anchor);
    anchor.click();
  }
}
