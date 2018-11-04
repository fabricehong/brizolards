import {Injectable} from '@angular/core';
import DinerAndContributions from './dtos/dinerAndContributions';
import {forkJoin, Observable, of} from 'rxjs';
import IngredientItem from './dtos/ingredientItem';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import Diner from "./models/diner";
import Contribution from "./models/unitContribution";
import Participant from "./models/participant";
import ParticipationItem from "./dtos/participationItem";
import ContributionItem from "./dtos/contributionItem";
import Ingredient from "./models/ingredient";
import {UsersService} from "./users.service";
import {DinerService} from "./diner.service";

@Injectable({
  providedIn: 'root'
})
export class DinerDashboardService {

  constructor(private http: HttpClient, private usersService: UsersService, private dinerService: DinerService) { }

  getCurrentDiner(): Observable<DinerAndContributions> {

      const getDiner = this.dinerService.getDiner();
      const getContributions = this.http.get('api/contributions');
      const getParticipants = this.usersService.getUsers();
      return forkJoin(getDiner, getContributions, getParticipants).pipe(
          map(
              ([dinerRes, contributionsRed, participantsRes]) => {
                  const diner = dinerRes as Diner;
                  const participants = participantsRes as Participant[];
                  const contributions = contributionsRed as Contribution[];
                  const ingredientPrices: {[s: string]: Ingredient} = diner.ingredients.reduce((ingredients, ingredient) => {
                      ingredients[ingredient.id] = ingredient;
                      return ingredients;
                  }, {})

                  const ingredientItems = diner.ingredients.map((ingredient) => {
                          const contributors = participants
                              .filter(p => contributions.find(c => c.userId === p.id));
                          const totalContrib = contributions
                              .filter(contrib => contrib.ingredientId === ingredient.id)
                              .reduce((total, contr) => total + contr.unitContribution, 0);
                          const ingredientItem: IngredientItem = {
                              ingredient: ingredient,
                              contributors: contributors,
                              contributed: totalContrib,
                              required: ingredient.requiredPerPerson * participants.length,
                          }
                          return ingredientItem;
                      },
                      []
                  );


                  const participationItems: ParticipationItem[] = participants.map(
                      (participant) => {

                          const moneyParticipation = contributions
                              .filter(contrib => contrib.userId === participant.id)
                              .reduce((total, c) => {
                                  const ingredient: Ingredient = ingredientPrices[c.ingredientId];
                                  const ingredientPrice = ingredient ? ingredient.pricePerPerson : 0;
                                  const contribRatioForPerson = c.unitContribution/ingredient.requiredPerPerson;
                                  return total + contribRatioForPerson * ingredientPrice;
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

                  const pricePerPerson = diner.ingredients.reduce ((total, ingr) => total + ingr.pricePerPerson, 0);
                  const dinnerAndContribution: DinerAndContributions = {
                      diner: diner,
                      hostName: participants.find(user => user.id === diner.hostUserId).name,
                      ingredientItems,
                      participationItems,
                      pricePerPerson,
                  };
                  return dinnerAndContribution;
              }
          )

      );
  }

  sendContribution(contribution: Contribution): Observable<Object> {
      const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    return this.http.post('api/contributions', contribution, httpOptions);
  }
}
