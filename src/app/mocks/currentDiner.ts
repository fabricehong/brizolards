import DinerAndContributions from "../models/dinerAndContributions";
import Diner from "../models/diner";
import Contribution from "../models/contribution";

const diner: Diner = {
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
}

const contributions: Contribution[] = [
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

const CURRENT_DINER : DinerAndContributions = new DinerAndContributions(diner, contributions);

export default CURRENT_DINER;