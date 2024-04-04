import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
	providers: [provideRouter(routes), provideClientHydration(), provideAnimations()]
};
