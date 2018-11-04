import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {mockContributions, mockDiner, mockParticipants} from "./mocks/currentDiner";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

    createDb(){
        return {
          diner: mockDiner,
          contributions: mockContributions,
          participants: mockParticipants,
        };
    }

    /*
    genId(heroes: Hero[]): number {
        return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
    }
    */
}
