import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseListComponent } from './base-list-item.component';
import { PostsEntity } from '@akur8/state';

@Component({
    selector: 'akur8-detailed-item',
    standalone: true,
    imports: [
      CommonModule,
    ],
    template: `
    <div class="post-item" id={{post.id}}>
        <div class="post-header">
            <p>{{ post.name }}</p>
            <button (click)="closePost()">X</button>
        </div>
        <div class="post-content">
            <p>{{post.content}}</p>
        </div>
    </div>
    `,
    styleUrls: ['./details-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
    
})
export class DetailsListItem extends BaseListComponent {
    closePost(): void {
        this.closeClicked.emit(this.post as PostsEntity)
    }
}