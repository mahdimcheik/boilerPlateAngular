import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MessageService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './utilities/interceptors/token.interceptor';
import { errorHandlerInterceptor } from './utilities/interceptors/error-handler.interceptor';

@NgModule({
  declarations: [AppComponent, ThemeSelectorComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [
    provideAnimations(),
    MessageService,
    provideHttpClient(),
    provideHttpClient(
      withInterceptors([TokenInterceptor, errorHandlerInterceptor])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
