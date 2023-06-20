import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom([BrowserAnimationsModule]),
        importProvidersFrom(StoreModule.forRoot(), EffectsModule.forRoot()),
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    ],
};
