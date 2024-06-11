import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './reducers';

import { FeedEffects } from './reducers/feed-store/feed.effects';
import { HttpClientModule } from '@angular/common/http';
import { SettingsEffects } from './reducers/settings-store/settings.effects';
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
    provideEffects(UserEffects, FeedEffects, SettingsEffects),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: true, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
  ]
};
