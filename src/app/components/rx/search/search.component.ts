import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient';
import { Subscription } from 'rxjs';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { Rx } from 'src/app/models/rx';

@Component({
  selector: 'app-rx-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  input: string;
  searchTerm: string;
  rxUrl = 'https://rxnav.nlm.nih.gov/REST/Prescribe/';
  interUrl = 'https://rxnav.nlm.nih.gov/REST/interaction/';
  currentPatientSub: Subscription;
  patient: Patient;

  rx = new Rx(undefined, undefined, undefined, undefined, undefined, undefined, undefined, );

  loading = false;
  success = false;
  spellingSuggestions = false;
  suggestions = new Array();
  drugProperties = new Array();
  interactions: any;

  constructor(private http: HttpClient, private patientService: PatientService) {
    this.currentPatientSub = this.patientService.$patient.subscribe( (data) => {
      console.log('rx search');
      console.log(data);
    this.patient = data;
    });

  }

  ngOnInit() {
  }


  // On destroy, clear the patient info
  ngOnDestroy() {
    if (this.currentPatientSub) {
      this.currentPatientSub.unsubscribe();
    }
  }

// 1. Try to get the results
// https://rxnav.nlm.nih.gov/REST/Prescribe/rxcui.json?name=lipitor
// 2. If no results, get approximate names, then send that name to 1.
// https://rxnav.nlm.nih.gov/REST/Prescribe/spellingsuggestions.json?name=ambienn
// 3. Get all interactions.
// https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=88014&sources=ONCHigh

// Gets the RXCUI (API Drug ID by name)
  getRxByName(search: string) {
    // Reset current rx data and set the showing/hiding features properly.
    this.rx = new Rx(undefined, undefined, undefined, undefined, undefined, undefined, undefined, );
    this.interactions = null;
    this.success = false;
    this.searchTerm = search;
    this.loading = true;

    // Send Rx request by name
    let url = `${this.rxUrl}rxcui.json?name=${search}`;
    this.http.get(url).subscribe( (data) => {
      this.manageResultsByName(data);
      });
  }

  // Manager for whether or not the search returns anything.
  manageResultsByName(data) {
    // If the data doesn't have an rxnorm ID,
    // sent the request to the spell checker
    if (!data.idGroup.rxnormId) {
      this.spellingSuggestions = true;
      this.getSpellingSuggestions(this.input);
    } else {
      this.spellingSuggestions = false;
      this.getRxById(data.idGroup.rxnormId);
      this.getInteractions(data.idGroup.rxnormId);
    }
  }

  getRxBySuggestion(drug: string) {
    // Resets suggestion-realted variables
    this.input = drug;
    this.suggestions = [];
    // Initiates request with the new Rx name
    this.getRxByName(drug);
  }

  // https://rxnav.nlm.nih.gov/REST/Prescribe/spellingsuggestions.json?name=ambienn
  // Gets suggestions based on improperly spelled drug
  getSpellingSuggestions(input: string) {
    let url = `${this.rxUrl}spellingsuggestions.json?name=${this.input}`;
    this.http.get(url).subscribe( (data) => {
      this.manageSpellingSuggestions(data);
      this.loading = false;
    });
  }

  // Displays the spelling suggestions or No Results Found.
  manageSpellingSuggestions(data: any) {
    const message = document.getElementById('spelling-suggestions');
    if (data.suggestionGroup.suggestionList === null) {
      message.innerText = 'No results found!';
    } else {
      this.suggestions = data.suggestionGroup.suggestionList.suggestion;
      message.innerText = 'Did you mean:';
    }
  }

  // Gets related the drug information by ID
  getRxById(id: number) {
    let url = `https://rxnav.nlm.nih.gov/REST/rxcui/${id}/allrelated.json`;
    this.http.get(url).subscribe( (data) => {
      this.manageProperties(data);
      this.success = true;
    });
  }

  manageProperties(data: any) {
    this.drugProperties = data.allRelatedGroup.conceptGroup;
  }

  // Gets interactions for the specific drug and saves it as interactions object
  //  https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=6448&sources=ONCHigh
  getInteractions(id: string) {
    let url = `${this.interUrl}interaction.json?rxcui=${id}&sources=DrugBank`;
    this.http.get(url).subscribe( (data) => {
      this.interactions = data;
      this.loading = false;
    });
  }

}
