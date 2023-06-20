import { DetailsListItem } from '@akur8/shared-components';
import { PostsEntity } from '@akur8/state';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'akur8-post-details-list',
    standalone: true,
    imports: [CommonModule, DetailsListItem],
    template: `
        <ng-container *ngFor="let post of posts">
            <akur8-detailed-item
                *ngIf="post?.name"
                (closeClicked)="removePost.emit($event)"
                [post]="post"
                [selected]="post?.id == selectedId"
            ></akur8-detailed-item>
        </ng-container>
    `,
    styleUrls: ['./details-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsListComponent {
    @Input() posts!: PostsEntity[] | null;
    @Input() selectedId?: string | number | null;

    @Output() readonly removePost = new EventEmitter<PostsEntity>();
}
