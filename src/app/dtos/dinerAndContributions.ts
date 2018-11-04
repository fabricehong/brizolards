import IngredientItem from './ingredientItem';
import ParticipationItem from './participationItem';

export default interface DinerAndContributions {
    ingredientItems: IngredientItem[];
    participationItems: ParticipationItem[];
    recommendedParticipation: number;
}
