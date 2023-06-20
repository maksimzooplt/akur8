import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as PostsActions from './posts.actions';
import * as PostsFeature from './posts.reducer';
import * as PostsSelectors from './posts.selectors';
import { PostsEntity } from './posts.models';

@Injectable()
export class PostsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(PostsSelectors.selectPostsLoaded));
  allPosts$ = this.store.pipe(select(PostsSelectors.selectAllPosts));
  selectedPosts$ = this.store.pipe(select(PostsSelectors.selectEntity));
  filterKey$ = this.store.pipe(select(PostsSelectors.selectFilterKey));
  eventPosts$ = this.store.pipe(select(PostsSelectors.selectEventPosts));
  selectedId$ = this.store.pipe(select(PostsSelectors.selectSelectedId))

  /**
   * Use the initialization action to perform one
   * or more posts in your Effects.
   */
  init(): void {
    this.store.dispatch(PostsActions.initPosts());
  }

  setSelected(id: string | number, onSelectCallback?: () => void): void {
    this.store.dispatch(PostsActions.setSelected({postId: id}))
    if(onSelectCallback) {
      onSelectCallback()
    }
  }

  removePost(id: string, name: string): void {
    this.store.dispatch(PostsActions.removePost({postId: id}))
    this.store.dispatch(PostsActions.addToEvent({post: {name: name, id: id}, eventType: 'delete'}))
  }

  addTask(post: PostsEntity): void {
    this.store.dispatch(PostsActions.addTask({post: post}))
    this.store.dispatch(PostsActions.addToEvent({post: {name: post.name, id: post.id}, eventType: 'add'}))
  }

  updateFilterKey(filterKey: string): void {
    this.store.dispatch(PostsActions.updateFilterKey({filterKey}))
  }
}
