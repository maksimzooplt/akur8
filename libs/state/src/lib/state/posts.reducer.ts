import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as PostsActions from './posts.actions';
import { EventEntity, PostsEntity } from './posts.models';

export const POSTS_FEATURE_KEY = 'posts';

export interface PostsState extends EntityState<PostsEntity> {
  selectedId?: string | number | null; // which Posts record has been selected
  loaded: boolean; // has the Posts list been loaded
  error?: string | null; // last known error (if any)
  eventPosts: EventEntity[];
  filterKey: string;
  selectedItemId: string | number
}

export interface PostsPartialState {
  readonly [POSTS_FEATURE_KEY]: PostsState;
}

export const postsAdapter: EntityAdapter<PostsEntity> =
  createEntityAdapter<PostsEntity>({ selectId: (post: PostsEntity) => {
    return `${post?.id}`
  } });

export const initialPostsState: PostsState = postsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  eventPosts: [],
  filterKey: '',
  selectedItemId: -1
});

const reducer = createReducer(
  initialPostsState,
  on(PostsActions.initPosts, (state: PostsState) => ({
    ...state,
    loaded: false,
    error: null,
  })),

  on(PostsActions.loadPostsSuccess, (state: PostsState, { posts }) =>
    postsAdapter.setAll(posts, { ...state, loaded: true })
  ),

  on(PostsActions.loadPostsFailure, (state: PostsState, { error }) => ({ ...state, error })),

  on(PostsActions.setSelected, (state: PostsState, { postId } : {postId: string | number}) => ({
    ...state,
    selectedItemId: state.selectedItemId == postId ? -1 : postId
  })),

  on(PostsActions.addTask, (state: PostsState, { post }) => postsAdapter.addOne(post, state)),

  on(PostsActions.removePost, (state: PostsState, { postId }) => ({
    ...postsAdapter.removeOne(postId as string, state),
  } as PostsState)),

  on(PostsActions.updateFilterKey, (state: PostsState, { filterKey }: {filterKey: string}) => ({
    ...state,
    filterKey: filterKey ?? ''
  })),

  on(PostsActions.addToEvent, (state: PostsState, { post, eventType }: {post: EventEntity, eventType: 'add' | 'delete'}) => ({
    ...state,
    eventPosts: [...state.eventPosts, {...post, eventType, eventTime: new Date(),}],

  }))
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  return reducer(state, action);
}
