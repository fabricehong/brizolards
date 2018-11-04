import Diner from '../models/diner';
import Contribution from '../models/unitContribution';
import Participant from '../models/participant';
import uuid from 'uuid/v1';

export const mockDiner: Diner = {
    id: 'xxx',
    hostUserId: 'p1',
    name: 'mon diner',
    description: 'Une ptite fondue chez moi',
    address: 'avenue Louis Vulliemin 14',
    ingredients: [
        {
            id: 'idFromage',
            name: 'fromage',
            requiredPerPerson: 200,
            pricePerPerson: 5,
            units: 'g'
        },
        {
            id: 'idPain',
            name: 'pain',
            requiredPerPerson: 100,
            pricePerPerson: 2,
            units: 'g'
        },
        {
            id: 'idVin',
            name: 'vin',
            requiredPerPerson: 1,
            pricePerPerson: 10,
            units: 'bouteille'
        },
    ]
};

export const mockContributions: Contribution[] = [
    {
        id: uuid(),
        userId: 'p1',
        unitContribution: 2,
        dinerId: 'xxx',
        ingredientId: 'idVin'
    },
    {
        id: uuid(),
        userId: 'p2',
        unitContribution: 400,
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
