import { Injectable } from '@angular/core';
import DinerAndContributions from './dtos/dinerAndContributions';
import {forkJoin, Observable, of} from 'rxjs';
import {mockContributions, mockDiner, mockParticipants} from './mocks/currentDiner';
import IngredientItem from './dtos/ingredientItem';
import {HttpClient} from "@angular/common/http";
import {concatAll, map, switchMap} from "rxjs/operators";
import Diner from "./models/diner";
import Contribution from "./models/contribution";
import Participant from "./models/participant";
import ParticipationItem from "./dtos/participationItem";
import ContributionItem from "./dtos/contributionItem";

@Injectable({
  providedIn: 'root'
})
export class DinerService {

  constructor(private http: HttpClient) { }

  getCurrentDiner(): Observable<DinerAndContributions> {

      const getDiner = this.http.get('api/diner');
      const getContributions = this.http.get('api/contributions');
      const getParticipants = this.http.get('api/participants');
      return forkJoin(getDiner, getContributions, getParticipants).pipe(
          map(
              ([dinerRes, contributionsRed, participantsRes]) => {
                  const diner = dinerRes as Diner;
                  const participants = participantsRes as Participant[];
                  const contributions = contributionsRed as Contribution[];
                  const ingredientPrices: object = diner.ingredients.reduce((ingredients, ingredient) => {
                      ingredients[ingredient.id] = ingredient.pricePerPerson;
                      return ingredients;
                  }, {})

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


                  const participationItems: ParticipationItem[] = participants.map(
                      (participant) => {

                          const moneyParticipation = contributions
                              .filter(contrib => contrib.userId === participant.id)
                              .reduce((total, c) => {
                                  const ingredientPrice = ingredientPrices[c.ingredientId] ? ingredientPrices[c.ingredientId] : 0;
                                  return total + c.contribution*ingredientPrice;
                              }, 0);

                          const contributionItems: ContributionItem[] = contributions.map(
                              contrib => {
                                  const result : ContributionItem = {
                                      contribution: contrib,
                                      ingredient: diner.ingredients.find(ingr => ingr.id === contrib.ingredientId),
                                  };
                                  return result;
                              }
                          );
                        const participationItem: ParticipationItem = {
                            participant: participant,
                            moneyParticipation,
                            contributions: contributionItems,
                        };
                        return participationItem;
                      }
                  );

                  const totalPrice = ingredientItems.reduce((total, ingredientItem) => {
                      return total + ingredientItem.required * ingredientItem.ingredient.pricePerPerson;
                  }, 0);

                  const dinnerAndContribution: DinerAndContributions = {
                      diner: diner,
                      ingredientItems,
                      participationItems,
                      totalPrice,
                  };
                  return dinnerAndContribution;
              }
          )

      );
  }

  sendContribution(dinerId: string, ingredientId: string, contribution: number): Observable<void> {
    return of();
  }
}
