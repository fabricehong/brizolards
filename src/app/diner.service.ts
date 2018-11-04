import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import Diner from "./models/diner";
import Ingredient from "./models/ingredient";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DinerService {

    constructor(private http: HttpClient) { }

    getDiner(): Observable<Diner> {
        return this.http.get<Diner>('api/diner');
    }

    getIngredient(ingredientId: string): Observable<Ingredient> {
        return this.getDiner().pipe(
            map(diner => diner.ingredients.find(ingredient => ingredient.id === ingredientId))
        );
    }
}
