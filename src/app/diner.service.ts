import { Injectable } from '@angular/core';
import DinerAndContributions from "./models/dinerAndContributions";
import {Observable, of} from "rxjs";
import CURRENT_DINER from "./mocks/currentDiner";

@Injectable({
  providedIn: 'root'
})
export class DinerService {

  constructor() { }

  getCurrentDiner(): Observable<DinerAndContributions> {
    return of(CURRENT_DINER);
  }

  sendContribution(dinerId: string, ingredientId: string, contribution: number): Observable<void> {
    return of();
  }
}
