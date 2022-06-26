import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MAT_DATE_LOCALE, MatNativeDateModule, NativeDateModule} from "@angular/material/core";
import { MatSliderModule } from "@angular/material/slider";
import { CalComponent} from './cal/cal.component';
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDateFnsModule } from "@angular/material-date-fns-adapter";
import { pl } from 'date-fns/locale';
import {ExampleHeader} from "./cal/example.component";

@NgModule({
  declarations: [
    AppComponent,
    CalComponent,
    ExampleHeader
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDateFnsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSliderModule,
    NativeDateModule,
    ReactiveFormsModule
  ],/*
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
  ],*/
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
