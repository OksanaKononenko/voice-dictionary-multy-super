import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http'; // <--- ДОДАЛИ  беремо з інструментів Angular) спеціальну функцію provideHttpClient


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideHttpClient() // <--- ДОДАЛИ  офіційно реєструємо інструмент для роботи з інтернетом для всього   додатка.Але щоб цей інструмент дійсно запрацював, його треба не просто розпакувати (імпортувати зверху файлу), а й офіційно зареєструвати у нашому "ресторані" (додатку)саме тут.
  ]
};
