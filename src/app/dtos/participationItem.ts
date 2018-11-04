import Participant from '../models/participant';
import ContributionItem from './contributionItem';

export default interface ParticipationItem {
    participant: Participant;
    contributions: ContributionItem[];
    participation: number;
}
