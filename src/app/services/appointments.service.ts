import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentsParameters } from '../models/appointments/AppointmentsParameters';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointments/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private baseUrl = "localhost:7187/api/Appointments/"
  constructor(private httpClient: HttpClient) { }

  getAppointments(appointmentsParameters: AppointmentsParameters) : Observable<HttpResponse<Appointment[]>> {
    let params = new HttpParams();
    return this.httpClient.get<Appointment[]>(`${this.baseUrl}appointments`, {observe: "response", params: params})
  }
}
