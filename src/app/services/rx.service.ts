import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';
import { GlobalsService } from './globals.service';
import { Rx } from '../models/rx';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxService {

  url: string;
  $rx = new Subject<Rx>();
  currentRx = new Rx();
  $rxList = new Subject<Rx[]>();
  currentRxList: Rx[];
  $rxArchive = new Subject<Rx[]>();
  currentRxArchive: Rx[];

  constructor(private httpClient: HttpClient,
    private globals: GlobalsService) {
      this.url = this.globals.API_URL + 'rx/';
  }

  nextRx(rx: Rx) {
    this.$rx.next(rx);
    this.currentRx = rx;
  }

  nextRxList(rxList: Rx[]) {
    if (!rxList) {
    }
    this.$rxList.next(rxList);
    this.currentRxList = rxList;
  }

  nextRxArchive(rxArchive: Rx[]) {
    this.$rxArchive.next(rxArchive);
    this.currentRxArchive = rxArchive;
  }

    // Allows for optional input of (null, id#)
  getList(patient: Patient, id?: number) {
    patient = this.patientOrId(patient, id);
    const url = `${this.url}${patient.id}`;
    return this.httpClient.get<Rx[]>(url,
      {headers:
        {'Content-Type': 'application/json'}
      });
  }

  getArchive(patient: Patient, id?: number) {
    patient = this.patientOrId(patient, id);
    const url = `${this.url}archive/${patient.id}`;
    const payload = JSON.stringify(patient);
    return this.httpClient.get<Rx[]>(url,
      {headers:
        {'Content-Type': 'application/json'}
      });
  }

  // Utility method so that we can select by Patient input OR id input
  private patientOrId(patient: Patient, id?: number): Patient {
    if (patient && patient.id) {
      return patient;
    } else if ((!patient || !patient.id) && id) {
      patient = new Patient();
      patient.id = id;
    } else if ((!patient || !patient.id) && !id) {
      patient = new Patient();
      patient.id = 0;
      return patient;
    }
  }

  remove(id: number) {
    const url = `${this.url}remove/${id}`;
    console.log('rx service remove' + id);
    return this.httpClient.get<Rx[]>(url,
      {headers:
        {'Content-Type': 'application/json'}
    });
  }

   add(rx: Rx) {
    const url = `${this.url}add`;
    console.log('rx service add' + rx);
    return this.httpClient.post<Rx>(url, JSON.stringify(rx),
      {headers:
        {'Content-Type': 'application/json'}
    });
  }

}
