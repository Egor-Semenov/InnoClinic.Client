import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionistsListComponent } from './components/receptionists-list/receptionists-list.component';
import { AuthGuard } from './guards/auth.guard';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { CreateDoctorComponent } from './components/create-doctor/create-doctor.component';
import { CreateAppointmentComponent } from './components/create-appointment/create-appointment.component';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';

const routes: Routes = [
  {path: "receptionists", component: ReceptionistsListComponent, canActivate: [AuthGuard]},
  {path: "doctors", component: DoctorsListComponent, canActivate: [AuthGuard]},
  {path: "create-doctor", component: CreateDoctorComponent},
  {path: "appointments", component: AppointmentsListComponent},
  {path: "appointments/create-appointment", component: CreateAppointmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
