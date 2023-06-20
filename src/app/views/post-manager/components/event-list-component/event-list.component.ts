import { EventListItem } from '@akur8/shared-components';
import { EventEntity } from '@akur8/state';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'akur8-event-list',
    standalone: true,
    imports: [CommonModule, EventListItem],
    template: `
        <ng-container *ngFor="let post of posts">
            <akur8-event-list-item *ngIf="post?.name" [post]="post"></akur8-event-list-item>
        </ng-container>
    `,
    styleUrls: ['./event-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventListComponent {
    @Input() posts!: EventEntity[] | null;
}
