import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReceptionistsListComponent } from './components/receptionists-list/receptionists-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderComponent } from './components/header/header.component';
import { CreateDoctorComponent } from './components/create-doctor/create-doctor.component';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { CreateAppointmentComponent } from './components/create-appointment/create-appointment.component';
import { ServiceInfoComponent } from './components/create-appointment/service-info/service-info.component';
import { ServiceDetailsComponent } from './components/create-appointment/service-details/service-details.component';
import { AppointmentDetailsComponent } from './components/create-appointment/appointment-details/appointment-details.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'


@NgModule({
  declarations: [
    AppComponent,
    DoctorsListComponent,
    PatientsListComponent,
    ReceptionistsListComponent,
    HeaderComponent,
    CreateDoctorComponent,
    AppointmentsListComponent,
    CreateAppointmentComponent,
    ServiceInfoComponent,
    ServiceDetailsComponent,
    AppointmentDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatFormFieldModule,
    MatMenuModule,
    MatNativeDateModule,
    MatDatepickerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
