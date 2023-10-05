import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { Item } from './itemInterface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  value: number = 4;
  isLinear = false;
  checked = false;
  panelOpenState = false;
  disabled = false;
  max = 10;
  min = 0;
  showTicks = false;
  step = 0.5;
  thumbLabel = true;
  announcer: any;
  searchPref = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  foods: any[] = [
    { value: 'us-east-1' },
    { value: 'us-east-2' },
    { value: 'us-west-1' },
    { value: 'eu-central-1' },
    { value: 'ap-south-1' }
  ];
  pineconeCredentials!: FormGroup;
  embeddingModelForm!: FormGroup;
  consolidationModelForm!: FormGroup;
  finetuningModelForm!: FormGroup;
  followupModelForm!: FormGroup;
  presentationModelForm!: FormGroup;
  fallbackModelForm!: FormGroup;
  searchPreferenceForm!: FormGroup;
  promptsForm!: FormGroup;
  jsondata = {
    "apiKey": "e95eb932-1e9f-4240-bc08-3afea1970d9e",
    "env": "us-east-1-aws",
    "accountName": "pranay.upadhaya@kore.com",
    "fetchFromPIM": true,
    "llmConfig": {
      "embeddingModel": {
        "isAzureOpenAI": true,
        "model": "KoreAdaTextEmbedding002",
        "api-version": "2023-03-15-preview"
      },
      "consolidatedQueryModel": {
        "isAzureOpenAI": true,
        "model": "Koreai-GPT35-Turbo",
        "api-version": "2023-03-15-preview",
        "temperature": 0.4
      },
      "finetunedModel": {
        "url": "https://koresolutions.openai.azure.com/openai/deployments/",
        "apiKey": "c5d8876bb5884a08981ea24e9298a4e6",
        "isAzureOpenAI": true,
        "model": "RA_Pinecone_LG",
        "temperature": 0.4,
        "api-version": "2022-12-01"
      },
      "followupModel": {
        "isAzureOpenAI": true,
        "model": "Koreai-GPT35-Turbo",
        "api-version": "2023-03-15-preview",
        "temperature": 0.4
      },
      "presentationModel": {
        "isAzureOpenAI": true,
        "model": "Koreai-GPT35-Turbo",
        "api-version": "2023-03-15-preview",
        "temperature": 0.4
      },
      "retryPresentationModel": {
        "url": "https://gpt3dot5testmodel.openai.azure.com/openai/deployments/TestGPT3dot5Model/chat/completions?api-version=2023-03-15-preview",
        "apiKey": "e583b6c2dd924ab6925580cd602fe681",
        "isAzureOpenAI": true,
        "model": "TestGPT3dot5Model",
        "api-version": "2023-03-15-preview",
        "temperature": 0.3
      }
    },
    "topK": 7,
    "vectorSearchIgnorableKeys": [
      "modelCode",
      "status"
    ],
    "namespaces": [
      "Air Conditioners",
      "Air Purifiers",
      "Blu-ray & DVD Players",
      "Burners & Drives",
      "Cooking Appliances",
      "Dehumidifiers",
      "Digital Storage",
      "Dishwashers",
      "Laptops",
      "Mobile Accessories",
      "Monitors",
      "Projectors",
      "Refrigerators",
      "Sound Bars",
      "Speakers",
      "TVs",
      "Vacuums",
      "Washers & Dryers",
      "Wireless Headphones",
      "Appliances Accessories",
      "Computing Accessories",
      "lg-pim-uat"
    ]
  }
  availableOptions: string[] = [
    'CX_INIT_PROMPT',
    'FOLLOW_UP_QUERY_PROMPT',
    'CONSOLIDATE_QUERY_PROMPT',
    'SKU_SPECIFIC_PROMPT'
  ];
  finalJSON = JSON.stringify(this.jsondata, null, 2);
  ignorableKeys: Item[] = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];
  namespaces: Item[] = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];
  selectedValues: string[] = [];
  selectedOptions: { option: string, prompt: string }[] = [];

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.pineconeCredentials = this._formBuilder.group({
      userName: ['', Validators.required],
      apiKey: ['', Validators.required],
      instanceType: ['', Validators.required]
    });
    this.embeddingModelForm = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.consolidationModelForm = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.finetuningModelForm = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.followupModelForm = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.presentationModelForm = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.fallbackModelForm = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.searchPreferenceForm = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.promptsForm = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  add(event: MatChipInputEvent, array: Item[]): void {
    const value = (event.value || '').trim();
    if (value) {
      array.push({ name: value });
    }
    event.chipInput!.clear();
  }

  remove(item: Item, array: Item[]): void {
    const index = array.indexOf(item);
    if (index >= 0) {
      array.splice(index, 1);
      this.announcer.announce(`Removed ${item.name}`);
    }
  }

  edit(item: Item, event: MatChipEditedEvent, array: Item[]) {
    const value = event.value.trim();
    if (!value) {
      this.remove(item, array);
      return;
    }
    const index = array.indexOf(item);
    if (index >= 0) {
      array[index].name = value;
    }
  }

  onOptionSelected(option: string) {
    this.selectedOptions.push({ option, prompt: '' });
    this.availableOptions = this.availableOptions.filter(op => op !== option);
  }

  removeExpansionPanel(value: string) {
    this.selectedOptions = this.selectedOptions.filter(op => op.option !== value)
    this.availableOptions.push(value);
  }
  updatePrompt(selectedOption: any) {
    console.log(`Updating prompt for ${selectedOption.option}: ${selectedOption.prompt}`);
    console.log(this.selectedOptions);
  }

  clearPrompt(selectedOption: any) {
    selectedOption.prompt = '';
  }

  exportData() {
    const url = 'data:application/json;base64,' + btoa(this.finalJSON);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'pineconeIndex.json';
    document.body.appendChild(anchor);
    anchor.click();
  }
}
