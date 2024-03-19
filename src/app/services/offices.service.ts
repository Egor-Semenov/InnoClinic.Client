import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Office } from '../models/offices/Office';

@Injectable({
  providedIn: 'root'
})
export class OfficesService {
  private baseUrl: string = "https://localhost:7187/api/Offices/";
  constructor(private httpClient: HttpClient) { }

  getOffices() : Observable<HttpResponse<Office[]>> {
    return this.httpClient.get<Office[]>(`${this.baseUrl}offices`, {observe: 'response'});
  }
}
