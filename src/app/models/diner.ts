import Ingredient from './ingredient';

export default interface Diner {
    id: string;
    hostUserId: string;
    name: string;
    description: string;
    address: string;
    ingredients: Ingredient[];
}
