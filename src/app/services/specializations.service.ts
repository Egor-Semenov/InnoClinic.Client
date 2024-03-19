import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialization } from '../models/specializations/Specialization';

@Injectable({
  providedIn: 'root'
})
export class SpecializationsService {
  private baseUrl: string = "https://localhost:7187/api/Specializations/";
  constructor(private httpClient: HttpClient) { }

  getSpecializations() : Observable<HttpResponse<Specialization[]>>{
    return this.httpClient.get<Specialization[]>(`${this.baseUrl}specializations`, {observe: 'response'});
  }
}
