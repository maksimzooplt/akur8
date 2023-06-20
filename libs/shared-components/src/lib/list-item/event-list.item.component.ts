import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseListComponent } from './base-list-item.component';

@Component({
    selector: 'akur8-event-list-item',
    standalone: true,
    imports: [
      CommonModule,
    ],
    template: `
    <div class="post-item">
        <div class="post-header">
            <p>{{ post.name }} {{post.eventType}}</p>
        </div>
        <div class="post-content">
            <p>{{post.eventTime}}</p>
        </div>
    </div>
    `,
    styleUrls: ['./side-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListItem extends BaseListComponent {
}