import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'akur8-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  template: `
    <mat-toolbar [color]="color" style="height: 100px;">
        <span>{{ title }}</span>
    </mat-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
 @Input() title!: string
 @Input() color!: string
}
