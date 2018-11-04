import Ingredient from '../models/ingredient';
import Contribution from '../models/unitContribution';

export default interface ContributionItem {
    ingredient: Ingredient;
    contribution: Contribution;
}
