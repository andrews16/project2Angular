import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './globals.service';
import { Patient } from '../models/patient';
import { Visit } from '../models/visit';



@Injectable({
  providedIn: 'root'
})
export class VisitService {

    visitId : number;
    patientId : number;
    doctorId : number;
    date : string;
    bloodpressure : string;
    weight : number;
    doctorDescription : string;
    PatientNote : string;

    currentVisit : Visit;

  url: string;

  constructor(private httpClient: HttpClient, 
  private globals: GlobalsService) {
    this.url = this.globals.API_URL + 'visit';
   }
   
   addVisit(data: Visit) {
      const apiUrl = `${this.url}/add`;
      console.log(data);
      return this.httpClient.post<Visit>(apiUrl, JSON.stringify(data),
      {headers:
        {'Content-Type': 'application/json'}
      });
   }

   getVisit(visit: Visit) {
    const apiUrl = `${this.url}/visit/${this.visitId}`;
      console.log(apiUrl);
        return this.httpClient.get<Visit>(apiUrl,
          {headers:
            {'Content-Type': 'application/json'}
          });
   }

}
