import Diner from '../models/diner';
import Contribution from '../models/contribution';
import Participant from '../models/participant';

export const mockDiner: Diner = {
    id: 'xxx',
    name: 'mon diner',
    ingredients: [
        {
            id: 'idFromage',
            name: 'fromage',
            requiredPerPerson: 200,
            units: 'g'
        },
        {
            id: 'idPain',
            name: 'pain',
            requiredPerPerson: 100,
            units: 'g'
        },
        {
            id: 'idVin',
            name: 'vin',
            requiredPerPerson: 1,
            units: 'bouteille'
        },
    ]
};

export const mockContributions: Contribution[] = [
    {
        userId: 'p1',
        contribution: 2,
        dinerId: 'xxx',
        ingredientId: 'idVin'
    },
    {
        userId: 'p2',
        contribution: 400,
        dinerId: 'xxx',
        ingredientId: 'idFromage'
    },
];

export const mockParticipants: Participant[] = [
    {
        id: 'p1',
        name: 'Fabrice',
    },
    {
        id: 'p2',
        name: 'Morgane',
    },
];
