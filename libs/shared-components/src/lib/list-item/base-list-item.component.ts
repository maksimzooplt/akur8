import { Directive, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { EventEntity, PostsEntity } from '@akur8/state';

@Directive()
export abstract class BaseListComponent {
 @Input() post!: PostsEntity & EventEntity

 @HostBinding('class.selected') @Input() selected: boolean = false

 @Output() closeClicked = new EventEmitter<PostsEntity>()
}