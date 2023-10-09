import { FormBuilder, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { Item } from './itemInterface';
import { AppService } from 'src/app/services/API-services/app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  topKvalue: number = 0;
  isLinear = true;
  max = 10;
  min = 0;
  showTicks = false;
  step = 0.5;
  thumbLabel = true;
  announcer: any;
  addOnBlur = true;
  finalIndexJSON: any = {}
  showFinetuneModel = false;
  showFollowupModel = false;
  showFallbackModel = false;
  showPresentationModel = false;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  finalJSON = JSON.stringify(this.finalIndexJSON, null, 2);
  instanceTypes: any[] = [
    { value: 'us-east-1' },
    { value: 'us-east-2' },
    { value: 'us-west-1' },
    { value: 'eu-central-1' },
    { value: 'ap-south-1' }
  ];
  modelNames = [
    "KoreAdaTextEmbedding003",
    "Koreai-GPT35-Turbo",
    "RA_Pinecone_LG",
    "Add Custom Model"
  ];
  availableCustomModels = [
    "Fallback Model",
    "Presentation Model",
    "Followup Model",
    "Finetune Model"
  ]
  pineconeCredentials!: FormGroup;
  searchPreferenceForm!: FormGroup;
  llmSpecification!: FormGroup;

  availableOptions: string[] = [
    'CX_INIT_PROMPT',
    'SKU_SPECIFIC_PROMPT',
    'CONSOLIDATE_QUERY_PROMPT'
  ];
  availableModels: string[] = ["embeddingModel", "consolidatedQueryModel"]
  ignorableKeys: Item[] = [];
  namespaces: Item[] = [];

  selectedOptions: { option: string, prompt: string }[] = [];


  constructor(private _formBuilder: FormBuilder, private appService: AppService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.pineconeCredentials = this._formBuilder.group({
      indexName: ['', Validators.required],
      userName: ['', Validators.required],
      apiKey: ['', Validators.required],
      instanceType: ['', Validators.required],
      isAzureOpenAI: [true]
    });
    this.llmSpecification = this._formBuilder.group({
      embeddingModel: this._formBuilder.group({
        modelName: ['', Validators.required],
        api_version: ['', Validators.required],
        isAzureOpenAI: [true],
        customModelName: [''],
      }),
      consolidatedQueryModel: this._formBuilder.group({
        modelName: ['', Validators.required],
        api_version: ['', Validators.required],
        isAzureOpenAI: [true],
        customModelName: [''],
        temperature: [0]
      }),
      finetunedModel: this._formBuilder.group({
        modelName: [],
        api_version: [],
        isAzureOpenAI: [true],
        customModelName: [],
        temperature: [0]
      }),
      followupModel: this._formBuilder.group({
        modelName: [],
        api_version: [],
        isAzureOpenAI: [true],
        customModelName: [],
        temperature: [0]
      }),
      presentationModel: this._formBuilder.group({
        modelName: [],
        api_version: [],
        isAzureOpenAI: [true],
        customModelName: [],
        temperature: [0]
      }),
      fallbackModel: this._formBuilder.group({
        modelName: [],
        api_version: [],
        isAzureOpenAI: [true],
        temperature: [0],
        customModelName: []
      })
    })
    this.searchPreferenceForm = this._formBuilder.group({
      namespaces: ['', Validators.required],
    });

  }
  updateCustomValidity(selectedValue: string, formGroup: string) {
    const control = this.llmSpecification.get(formGroup)?.get('customModelName')
    if (selectedValue === 'Add Custom Model') {
      control?.setValidators([Validators.required]);
    }
    else {
      control?.clearValidators();
    }
    control?.updateValueAndValidity();
    console.log(control);

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

  updateTemperature(formGroupName: string, temp: any) {
    this.llmSpecification.get(formGroupName)?.get('temperature')?.setValue(temp);
  }

  updateValidators(event: any, formGroupName: string) {
    const controlNames = ['modelName', 'api_version'];
    const formGroup = this.llmSpecification?.get(formGroupName);

    if (event) {
      if (!this.availableModels.includes(formGroupName)) {
        this.availableModels.push(formGroupName);
      }
    } else {
      const index = this.availableModels.indexOf(formGroupName);
      if (index !== -1) {
        this.availableModels.splice(index, 1);
      }
    }

    controlNames.forEach((controlName) => {
      const control = formGroup?.get(controlName);

      if (event) {
        control?.setValidators([Validators.required]);
      } else {
        control?.clearValidators();
      }

      control?.updateValueAndValidity();
    });

    console.log(this.llmSpecification);
  }

  done() {
    const formValues = this.readFormGroups({
      pineconeCredentials: this.pineconeCredentials,
      llmSpecification: this.llmSpecification,
      searchPreferenceForm: this.searchPreferenceForm
    });

    const { pineconeCredentials, llmSpecification } = formValues;
    const llmConfig: any = {};
    for (const model of this.availableModels) {
      const { modelName, api_version, temperature, isAzureOpenAI, customModelName } = llmSpecification[model];
      llmConfig[model] = {
        model: customModelName || modelName,
        "api-version": api_version,
        ...(temperature !== undefined && { temperature }),
        isAzureOpenAI
      };
    }
    const prompts: any = {};
    this.selectedOptions.forEach(({ option, prompt }) => {
      prompts[option] = prompt;
    });

    const { indexName, apiKey, instanceType, userName, isAzureOpenAI } = pineconeCredentials;
    this.finalIndexJSON = {
      indexName,
      properties: {
        apiKey,
        env: instanceType,
        accountName: userName,
        fetchFromPIM: isAzureOpenAI,
        supportQueryOnPrevResult: false,
        llmConfig,
        topK: this.topKvalue,
        vectorSearchIgnorableKeys: this.ignorableKeys.map(item => item.name),
        namespaces: this.namespaces.map(item => item.name)
      },
      prompts
    };
    this.finalJSON = JSON.stringify(this.finalIndexJSON, null, 2);
  }

  readFormGroups(formGroups: any) {
    let values: any = {};
    for (let groupKey in formGroups) {
      let formGroup = formGroups[groupKey];
      let groupValue: any = {};
      for (let controlKey in formGroup.controls) {
        groupValue[controlKey] = formGroup.controls[controlKey].value;
      }
      values[groupKey] = groupValue;
    }
    return values;
  }

  onSelectionChange(event: any) {
    if (event.selectedIndex == 4) {
      this.done();
    }
  }
  createIndex() {
    this._snackBar.open("Index Created Successfully", 'close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
    this.router.navigate(['/home'])
    console.log(this.finalIndexJSON);
    // this.appService.createIndex(this.finalIndexJSON).subscribe(
    //   (res) => {
    //     console.log(res);
    //     this._snackBar.open("exported successfully", 'X', {
    //       duration: 3000
    //     });
    //     this.router.navigate(['/home'])

    //   },
    //   (error: any) => {
    //        this._snackBar.open("Error in creating index", 'X', {
    //   duration: 3000,
    //     panelClass: ['error-snackbar']
    // });
    //     this.router.navigate(['/home'])

    //   }
    // )
  }

  addCustomModel(modelName: string): void {
    this.availableCustomModels = this.availableCustomModels.filter(model => model !== modelName);
    if (modelName === "Fallback Model") {
      this.updateValidators(true, 'fallbackModel');
      this.showFallbackModel = true;
    }
    else if (modelName === "Finetune Model") {
      this.updateValidators(true, 'finetunedModel');
      this.showFinetuneModel = true;
    }
    else if (modelName === "Followup Model") {
      this.updateValidators(true, 'followupModel');
      this.showFollowupModel = true;
      this.availableOptions.push('FOLLOW_UP_QUERY_PROMPT')
    }
    else {
      this.updateValidators(true, 'presentationModel')
      this.showPresentationModel = true;
    }
  }
  removeModelPanel(modelName: string): void {
    this.availableCustomModels.push(modelName);
    if (modelName === "Fallback Model") {
      this.updateValidators(false, 'fallbackModel');
      this.showFallbackModel = false;
    }
    else if (modelName === "Finetune Model") {
      this.updateValidators(false, 'finetunedModel');
      this.showFinetuneModel = false;
    }
    else if (modelName === "Followup Model") {
      this.updateValidators(false, 'followupModel');
      this.showFollowupModel = false;
      this.availableOptions = this.availableOptions.filter(option => option !== 'FOLLOW_UP_QUERY_PROMPT')
    }
    else {
      this.updateValidators(false, 'presentationModel');
      this.showPresentationModel = false;
    }
  }
}
