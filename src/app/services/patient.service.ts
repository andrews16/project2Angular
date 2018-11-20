import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { GlobalsService } from './globals.service';
import { HttpClient } from '@angular/common/http';
import { JSONP_ERR_WRONG_METHOD } from '@angular/common/http/src/jsonp';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  url: string;

  constructor(private httpClient: HttpClient,
    private globals: GlobalsService) {
      this.url = this.globals.apiUrl + 'users/patient/';
  }


  getPatient(patient: Patient) {
    const payload = JSON.stringify(patient);
    return this.httpClient.post<Patient[]>(this.url, payload,
      {headers:
        {'Content-Type': 'application/json'}
      });
  }
}
