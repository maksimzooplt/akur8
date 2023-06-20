import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'akur8-input',
  template: `
  <mat-form-field>
    <mat-label>{{ label }}</mat-label>
    <input matInput [type]="type" [value]="value" (input)="updateValue($event)" [formControl]="control">
    <mat-error *ngIf="control?.touched && control?.invalid">
        {{ control.errors | json }}
    </mat-error>
  </mat-form-field>
  `,
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: 
  [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() control!: FormControl;
  value!: string;

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): void {}

  propagateChange = (_: any) => {};

  updateValue(event: any) {
    this.value = event.target?.value;
    this.propagateChange(event.target?.value);
  }
}
