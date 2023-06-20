import { PostsEntity, PostsFacade } from '@akur8/state';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DetailsListComponent } from './components/details-list-component/details-list.component';
import { CreatePostComponent } from './components/create-post-component/create-post.component';
import { EventListComponent } from './components/event-list-component/event-list.component';
import { SideListComponent } from './components/side-list-component/side-list.component';

import { combineLatest, map, of, take } from 'rxjs';

@Component({
    selector: 'akur8-posts-manager',
    standalone: true,
    imports: [
        CommonModule,
        DetailsListComponent,
        CreatePostComponent,
        EventListComponent,
        SideListComponent,
    ],
    templateUrl: './posts-manager.component.html',
    styleUrls: ['./posts-manager.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskManagerComponent {
    readonly postsFacade = inject(PostsFacade);

    readonly posts$ = combineLatest([this.postsFacade.allPosts$, this.postsFacade.filterKey$]).pipe(
        map(([posts, key]) => {
            if (key) {
                return posts.filter((post) =>
                    post.name.toLowerCase().includes(key.toLocaleLowerCase())
                );
            }
            return posts;
        })
    );

    readonly selectedId$ = this.postsFacade.selectedId$;

    readonly eventPosts$ = this.postsFacade.eventPosts$;

    removePostFromList(post: PostsEntity): void {
        of(confirm('Do you want to remove that post permamently?'))
            .pipe(
                map((answer) => answer && this.postsFacade.removePost(`${post.id}`, post.name)),
                take(1)
            )
            .subscribe();
    }
}
