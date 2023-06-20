import { CustomInputComponent, SideListItem } from '@akur8/shared-components';
import { PostsEntity, PostsFacade } from '@akur8/state';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs';

@Component({
    selector: 'akur8-side-list',
    standalone: true,
    imports: [CommonModule, SideListItem, CustomInputComponent],
    template: `
        <akur8-input [control]="searchField" label="Search post"></akur8-input>
        <div class="post-list">
            <ng-container *ngFor="let post of posts">
                <akur8-side-list-item
                    (selectItem)="select($event)"
                    *ngIf="post?.name"
                    [selected]="post?.id == selectedId"
                    [post]="post"
                ></akur8-side-list-item>
            </ng-container>
        </div>
    `,
    styleUrls: ['./side-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideListComponent implements OnInit {
    @Input() posts!: PostsEntity[] | null;
    @Input() selectedId?: string | number | null;

    private unsubscribe$ = new Subject<void>();

    private fb = inject(FormBuilder);
    private postsFacade = inject(PostsFacade);

    searchField = this.fb.control('');

    ngOnInit(): void {
        this.searchField.valueChanges
            .pipe(debounceTime(200), distinctUntilChanged(), takeUntil(this.unsubscribe$))
            .subscribe((value) => this.postsFacade.updateFilterKey(value!));
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    select(id: string | number): void {
        this.postsFacade.setSelected(id, () => this.scrollIntoView(`${id}`));
    }

    scrollIntoView(id: string): void {
        document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
        });
    }
}
