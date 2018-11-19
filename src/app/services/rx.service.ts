import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';
import { GlobalsService } from './globals.service';
import { Rx } from '../models/rx';

@Injectable({
  providedIn: 'root'
})
export class RxService {

  url: string;

  constructor(private httpClient: HttpClient,
    private globals: GlobalsService) {
      this.url = this.globals.apiUrl + 'rx/';
    }

    // Allows for optional input of (null, id#)
  getList(patient: Patient, id?: number) {
    console.log(patient);
    if (!patient && id) {
      patient = new Patient();
      patient.id = id;
    }
    const url = this.url + 'list';
    const payload = patient.toJsonString();
    console.log('rx service ' + payload);
    return this.httpClient.post<Rx[]>(url, payload,
      {headers:
        {'Content-Type': 'application/json'}
      });
  }


}
