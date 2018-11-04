import Ingredient from '../models/ingredient';
import Contribution from '../models/contribution';

export default interface ContributionItem {
    ingredient: Ingredient;
    contribution: Contribution;
}
