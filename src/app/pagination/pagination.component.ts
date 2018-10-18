import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientState } from '../reducer/patient';

import { select, Store } from '@ngrx/store';
import { AppState } from '../reducer';

import { PatientService, defaultCount } from '../patient.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  patients: Observable<PatientState>;
  currentPage: number;
  total: number;
  link: object[];

  constructor(public patientService: PatientService, private store: Store<AppState>) {
    this.patients = store.pipe(select("patient"));
    this.patients.subscribe(pts => {
      this.currentPage = pts.currentPage;
      this.total = pts.count;
      this.link = pts.link;
    })
  }

  getUrl(direction): string {
    const filtered = this.link.filter(l => l["relation"] === direction);
    return filtered.length > 0 ? filtered[0]['url'] : null;
  }

  setPage(direction): void {
    const url = this.getUrl(direction);
    this.patientService.getPatientsByUrl(url);
  }
}
