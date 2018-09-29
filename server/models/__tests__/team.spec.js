import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Team from '../team';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial teams added into test db
const teams = [
  new Team({ name: 'Test team 1', cuid: 'kjl3io6t39n53dk' }),
  new Team({ name: 'Another Test team', cuid: '34okf38folk34k2' }),
];

test.before('connect to mockgoose', async () => {
  await connectDB();
});

test.beforeEach('connect and add two team entries', async () => {
  await Team.create(teams).catch(() => 'Unable to create teams');
});

test.afterEach.always(async () => {
  await dropDB();
});

test.serial('Should correctly give number of Teams', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/teams')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(teams.length, res.body.teams.length);
});

test.serial('Should send correct data when queried against a cuid', async t => {
  t.plan(2);

  const team = new Team({ name: 'Foo', cuid: 'f34gb2bh24b24b2' });
  team.save();

  const res = await request(app)
    .get('/api/teams/f34gb2bh24b24b2')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.team.name, team.name);
});

test.serial('Should correctly add a team', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/teams')
    .send({ team: { name: 'Foo' } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedTeam = await Team.findOne({ name: 'Foo' }).exec();
  t.is(savedTeam.name, 'Foo');
});

test.serial('Should correctly delete a team', async t => {
  t.plan(2);

  const team = new Team({ name: 'Foo', cuid: 'g53fd2hk6ls235df' });
  team.save();

  const res = await request(app)
    .delete(`/api/teams/${team.cuid}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedTeam = await Team.findOne({ cuid: team.cuid }).exec();
  t.is(queriedTeam, null);
});
