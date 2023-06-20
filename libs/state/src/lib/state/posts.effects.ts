import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as PostsActions from './posts.actions';
import { TaskHttpService } from '../services/task-http.service';
import { PostsEntity } from './posts.models';

@Injectable()
export class PostsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.initPosts),
      switchMap(() => this.postsHttp.getPosts().pipe(
        map(((posts: PostsEntity[]) => PostsActions.loadPostsSuccess({ posts }))
      ))),
      catchError((error) => {
        console.error('Error', error);
        return of(PostsActions.loadPostsFailure({ error }));
      })
    )
  );

  constructor(private postsHttp: TaskHttpService){}
}
