import { Injectable } from '@angular/core';
import DinerAndContributions from './dtos/dinerAndContributions';
import {Observable, of} from 'rxjs';
import {mockContributions, mockDiner, mockParticipants} from './mocks/currentDiner';
import IngredientItem from './dtos/ingredientItem';

@Injectable({
  providedIn: 'root'
})
export class DinerService {

  constructor() { }

  getCurrentDiner(): Observable<DinerAndContributions> {
    const diner = mockDiner;
    const participants = mockParticipants;
    const contributions = mockContributions;
    const ingredientItems = diner.ingredients.reduce((aggregator: IngredientItem[], ingredient) => {
            const contributors = participants.filter(p => contributions.find(c => c.userId === p.id));
            const totalContrib = contributions.reduce((total, contr) => total + contr.contribution, 0);
            const ingredientItem: IngredientItem = {
                ingredient: ingredient,
                contributors: contributors,
                contributed: totalContrib,
                required: ingredient.requiredPerPerson * participants.length,
            }
            aggregator.push(ingredientItem);
            return aggregator;
        },
        []
      );
    const participationItems = [];
    const dinnerAndContribution: DinerAndContributions = {
        ingredientItems,
        participationItems,
        recommendedParticipation: 45,
    }
    return of(dinnerAndContribution);
  }

  sendContribution(dinerId: string, ingredientId: string, contribution: number): Observable<void> {
    return of();
  }
}
