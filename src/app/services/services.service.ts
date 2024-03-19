import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceParameters } from '../models/services/ServiceParameters';
import { Observable } from 'rxjs';
import { Service } from '../models/services/Service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private baseUrl: string = "https://localhost:7187/api/Services/";

  constructor(private httpClient: HttpClient) { }

  getServices(serviceParameters: ServiceParameters) : Observable<HttpResponse<Service[]>>{
    let params = new HttpParams();
    
    if (serviceParameters.specializationId != 0) {
      params = params.append("specializationId", serviceParameters.specializationId);
    }

    if (serviceParameters.serviceCatsegoryId != 0) {
      params = params.append("serviceCategory", serviceParameters.serviceCatsegoryId);
    }

    return this.httpClient.get<Service[]>(`${this.baseUrl}services`, {observe: "response", params: params});
  }
}
