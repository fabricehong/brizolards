import Ingredient from './ingredient';

export default interface Diner {
    id: string;
    name: string;
    ingredients: Ingredient[];
}
