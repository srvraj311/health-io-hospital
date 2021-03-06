import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AppRouterModule} from './router/router.module';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {ErrorComponent} from './components/error/error.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { PrimaryComponent } from './components/home/primary/primary.component';
import { AvailabilityComponent } from './components/home/availaibilities/availability.component';
import { FacilitiesComponent } from './components/home/facilities/facilities.component';
import { BloodBankComponent } from './components/home/blood-bank/blood-bank.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { BookingComponent } from './components/home/booking/booking.component';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { BookingItemComponent } from './components/home/booking/booking-item/booking-item.component';
import { EmergencyComponent } from './components/home/emergency/emergency.component';
import { EmergencyItemComponent } from './components/home/emergency/emergency-item/emergency-item.component';
import { AddEmergencyComponent } from './components/home/emergency/add-emergency/add-emergency.component';
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    PrimaryComponent,
    AvailabilityComponent,
    FacilitiesComponent,
    BloodBankComponent,
    ProfileComponent,
    TitlebarComponent,
    BookingComponent,
    SpinnerOverlayComponent,
    BookingItemComponent,
    EmergencyComponent,
    EmergencyItemComponent,
    AddEmergencyComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
