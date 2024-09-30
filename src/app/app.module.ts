import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

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
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent],
})
export class AppModule {}
