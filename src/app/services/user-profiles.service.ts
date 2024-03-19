import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receptionist } from '../models/receptionists/Receptionist';
import { ReceptionistParameters } from '../models/receptionists/ReceptinistsParameters';
import { CreateDoctor } from '../models/doctors/CreateDoctor';
import { DoctorParameters } from '../models/doctors/DoctorParameters';
import { Doctor } from '../models/doctors/Doctor';

@Injectable({
  providedIn: 'root'
})
export class UserProfilesService {
  private baseUrl: string = "https://localhost:7187/api/Profiles/";
  constructor(private httpClient: HttpClient) { }

  getDoctors(doctorParameters: DoctorParameters) : Observable<HttpResponse<Doctor[]>>{
    let params = new HttpParams()
      .set("pageNumber", doctorParameters.pageNumber)
      .set("pageSize", doctorParameters.pageSize);

    if (doctorParameters.searchTerm != "") {
      params = params.append("searchTerm", doctorParameters.searchTerm);
    }

    if (doctorParameters.specializationType != 0) {
      params = params.append("specializationType", doctorParameters.specializationType);
    }

    if (doctorParameters.officeId != 0) {
      params = params.append("officeId", doctorParameters.officeId);
    }

    if (doctorParameters.status != 0) {
      params = params.append("doctorStatus", doctorParameters.status);
    }
    
    return this.httpClient.get<Doctor[]>(`${this.baseUrl}doctors`, {observe: "response", params: params});
  }

  createDoctor(doctor: CreateDoctor){
    return this.httpClient.post(`${this.baseUrl}create-doctor`, doctor);
  }

  getDoctorById(id: number) {
    return this.httpClient.get<Doctor>(`${this.baseUrl}doctors/${id}`, {observe: "response"});
  }

  getPatients(){
    return this.httpClient.get(`${this.baseUrl}patients`);
  }

  getReceptionists(receptionistParameters: ReceptionistParameters) : Observable<HttpResponse<Receptionist[]>>{
    let params = new HttpParams()
      .set('pageNumber', receptionistParameters.pageNumber.toString())
      .set('pageSize', receptionistParameters.pageSize.toString());

      if (receptionistParameters.officeId != 0){
        params = params.append("officeId", receptionistParameters.officeId);
      }

      if (receptionistParameters.searchTerm != ""){
        params = params.append("searchTerm", receptionistParameters.searchTerm);
      }
    return this.httpClient.get<Receptionist[]>(`${this.baseUrl}receptionists`, {observe: 'response', params: params});
  }
}
