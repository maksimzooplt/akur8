import { createAction, props } from '@ngrx/store';
import { EventEntity, PostsEntity } from './posts.models';

export const initPosts = createAction('[Posts Page] Init');

export const loadPostsSuccess = createAction(
  '[Posts/API] Load Posts Success',
  props<{ posts: PostsEntity[] }>()
);

export const loadPostsFailure = createAction(
  '[Posts/API] Load Posts Failure',
  props<{ error: any }>()
);

export const setSelected = createAction(
  '[Posts] Select Task Success',
  props<{ postId: string | number }>()
);

export const addTask = createAction(
  '[Posts] Add Task Success',
  props<{ post: PostsEntity }>()
)

export const removePost = createAction(
  '[Posts] Remove post Success',
  props<{ postId: string | number | null }>()
)

export const updateFilterKey = createAction(
  '[Posts] Update filter key',
  props<{ filterKey: string }>()
)

export const addToEvent = createAction(
  '[Posts] AddToEvent',
  props<{ post: EventEntity, eventType: 'add' | 'delete' }>()
)
