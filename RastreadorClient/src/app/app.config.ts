import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideToastr({
    progressBar: false,
    tapToDismiss: true,
    timeOut: 1000,
    closeButton: false,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
    extendedTimeOut: 1000,
  }),
  ]
};
