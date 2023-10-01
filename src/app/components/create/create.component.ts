import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, inject } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
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

  // Initialize the arrays with items
  ignorableKeys: Item[] = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];
  namespaces: Item[] = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];

  add(event: MatChipInputEvent, array: Item[]): void {
    const value = (event.value || '').trim();
    // Add new item
    if (value) {
      array.push({ name: value });
    }
    // Clear the input value
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
    // Remove item if it no longer has a name
    if (!value) {
      this.remove(item, array);
      return;
    }
    // Edit existing item
    const index = array.indexOf(item);
    if (index >= 0) {
      array[index].name = value;
    }
  }

  availableOptions: string[] = [
    'Option 1',
    'Option 2',
    'Option 3',
  ];
  selectedValues: string[] = [];

  onOptionSelected(selectedOption: string) {
    if (selectedOption) {
      this.selectedValues.push(selectedOption);
      this.availableOptions = this.availableOptions.filter(option => option !== selectedOption);
    }
  }

  removeValue(value: string) {
    this.selectedValues = this.selectedValues.filter(val => val !== value);
    this.availableOptions.push(value);
  }



}
