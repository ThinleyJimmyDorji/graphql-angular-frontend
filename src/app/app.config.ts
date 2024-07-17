import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {GraphQLModule} from './graphql.module';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), /*provideClientHydration(),*/ provideHttpClient(), importProvidersFrom(GraphQLModule), provideAnimationsAsync()]
};
