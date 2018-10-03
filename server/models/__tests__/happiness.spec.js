import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Happiness from '../happiness';
import Team from '../team';
import { connectDB, dropDB } from '../../util/test-helpers';

const team1 = new Team({ name: 'Team 01', cuid: '1aec5410064b4986aebd3d2d9686b3e5' });

const happinesses = [
  new happiness({ individualhappiness: '30', teamhappiness: '50', cuid: 'kljdklfjs', teamid: '1aec5410064b4986aebd3d2d9686b3e5'}),
  new happiness({ individualhappiness: '55', teamhappiness: '76', cuid: 'uidshfiosud', teamid: '1aec5410064b4986aebd3d2d9686b3e5' }),
];

test.before('connect to mockgoose', async () => {
  await connectDB();
});

test.beforeEach('connect and add two happiness entries', async () => {
  await Team.create(team1).catch(() => 'Unable to create team');
  await Happiness.create(happinesses).catch(() => 'Unable to create posts');
});

test.afterEach.always(async () => {
  await dropDB();
});


test.serial('Should correctly add a happiness', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/happiness')
    .send({ happiness: { individualhappiness: '30', teamhappiness: '50' } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedHappiness = await Happiness.findOne({ individualhappiness: '30' }).exec();
  t.is(savedHappiness.individualhappiness, '30');
});