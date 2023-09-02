import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const leaderBoard = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  rank: faker.datatype.number({ min: 1, max: 100 }),
  name: faker.name.fullName(),
  points: faker.datatype.number(),
  badgeUrl: sample([
    '/assets/badges/Master.png',
    '/assets/badges/Elite.png',
    '/assets/badges/Gold.png',
    '/assets/badges/Silver.png',
    '/assets/badges/Bronze.png',
  ]),
  badge: sample([
    'Master',
    'Elit',
    'Gold',
    'Silver',
    'Bronze',
  ]),

}));

export default leaderBoard;
