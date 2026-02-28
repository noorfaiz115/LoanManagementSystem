import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
<<<<<<< HEAD
import { App } from './app/app';

bootstrapApplication(App, appConfig)
=======
import { AppComponent } from './app/app.component';
import { register as registerSwiperElements } from 'swiper/element/bundle';

registerSwiperElements();

bootstrapApplication(AppComponent, appConfig)
>>>>>>> 822d582d87940a2319b042f731cccc62103b01b1
  .catch((err) => console.error(err));
