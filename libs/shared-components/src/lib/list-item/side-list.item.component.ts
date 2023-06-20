import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseListComponent } from './base-list-item.component';
import { Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'akur8-side-list-item',
    standalone: true,
    imports: [
      CommonModule,
    ],
    template: `
    <div (click)="selectItem.emit(post.id)">
        {{ post.name }}
    </div>
    `,
    styleUrls: ['./side-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideListItem extends BaseListComponent {
    @Output() selectItem = new EventEmitter<string | number>()
}