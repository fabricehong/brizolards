import IngredientItem from './ingredientItem';
import ParticipationItem from './participationItem';
import Diner from "../models/diner";

export default interface DinerAndContributions {
    diner: Diner,
    ingredientItems: IngredientItem[];
    participationItems: ParticipationItem[];
    totalPrice: number;
}
