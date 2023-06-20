import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadChildren: () => import('./layout/layout-routing.module').then((x) => x.layoutRoutes),
    },
];
