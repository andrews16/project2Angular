import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './globals.service';
import { Patient } from '../models/patient';
import { Visit } from '../models/visit';



@Injectable({
  providedIn: 'root'
})
export class VisitService {

  url: string;

  constructor(private httpClient: HttpClient, 
  private globals: GlobalsService) {
    this.url = this.globals.API_URL + 'visit';
   }
   
   addVisit(data: Visit) {
      const apiUrl = `${this.url}/add`;
      return this.httpClient.post<Visit>(apiUrl, JSON.stringify(data));
   }

   

}
