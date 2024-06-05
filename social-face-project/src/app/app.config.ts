import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { metaReducers, reducers } from './reducers';

import { FeedEffects } from './reducers/feed-store/feed.effects';
import { HttpClientModule } from '@angular/common/http';
import { UserEffects } from './reducers/user-store/user.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideAnimationsAsync(),
    provideStore(reducers, { metaReducers }),
    provideEffects(UserEffects, FeedEffects)
  ]
};
