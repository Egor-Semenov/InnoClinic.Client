import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserProfilesService {
  private baseUrl: string = "https://localhost:7187/api/Profiles/";
  constructor(private httpClient: HttpClient) { }

  getDoctors(){
    return this.httpClient.get(`${this.baseUrl}doctors`);
  }

  getPatients(){
    return this.httpClient.get(`${this.baseUrl}patients`);
  }

  getReceptionists(){
    return this.httpClient.get(`${this.baseUrl}receptionists`);
  }
}
