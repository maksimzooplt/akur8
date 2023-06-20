import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { importProvidersFrom } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PostsEffects, POSTS_FEATURE_KEY, postsReducer, PostsFacade } from '@akur8/state';

export const layoutRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        providers: [
            importProvidersFrom(
                StoreModule.forFeature(POSTS_FEATURE_KEY, postsReducer),
                EffectsModule.forFeature([PostsEffects])
            ),
            PostsFacade,
        ],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('../views/post-manager/posts-manager.component').then(
                        (m) => m.TaskManagerComponent
                    ),
            },
        ],
    },
];
