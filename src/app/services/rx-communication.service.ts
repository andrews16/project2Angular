import { Injectable } from '@angular/core';
import { Rx } from '../models/rx';
import { Subject } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class RxCommunicationService {

  $rx = new Subject<Rx>();
  currentRx: Rx;
  $rxList = new Subject<Rx[]>();
  currentRxList: Rx[];
  $rxArchive = new Subject<Rx[]>();
  currentRxArchive: Rx[];

  currentPatient: Patient;

  constructor() { }

  nextRx(rx: Rx) {
    this.$rx.next(rx);
    this.currentRx = rx;
  }

  nextRxList(rxList: Rx[]) {
    if (!rxList) {
      console.log('Rx-comm-service no rxlist to push!');
    }
    this.$rxList.next(rxList);
    this.currentRxList = rxList;
  }

  nextRxArchive(rxArchive: Rx[]) {
    this.$rxArchive.next(rxArchive);
    this.currentRxArchive = rxArchive;
  }

}
