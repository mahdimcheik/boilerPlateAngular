import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
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
import { TabMenuModule } from 'primeng/tabmenu';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { AdresseTypePipe } from './utilities/pipes/adresse-type.pipe';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import localeFr from '@angular/common/locales/fr';
import { BadgeModule } from 'primeng/badge';
import { AppTopbar } from './components/top-bar/app.topbar';

registerLocaleData(localeFr);
@NgModule({
  declarations: [AppComponent, HomeComponent, AdresseTypePipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastModule,
    TabMenuModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    CommonModule,
    MenuModule,
    FullCalendarModule,
    NavbarComponent,
    ThemeSelectorComponent,
    AppTopbar,
  ],
  providers: [
    provideAnimations(),
    MessageService,
    provideHttpClient(),
    provideHttpClient(
      withInterceptors([TokenInterceptor, errorHandlerInterceptor])
    ),
    { provide: LOCALE_ID, useValue: 'fr' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
