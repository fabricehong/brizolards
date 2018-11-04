import Ingredient from '../models/ingredient';
import Participant from '../models/participant';

export default interface IngredientItem {
    ingredient: Ingredient;
    contributors: Participant[];
    required: number;
    contributed: number;
}
