import test from 'ava';
import request from 'supertest';
import app from '../../server';
import * as postponeNotificationController from '../postponeNotification.controller';
import User from '../../models/user';
import { connectDB, dropDB } from '../../util/test-helpers';

const users = [
  new User({ name: 'Thorsten', phoneNumber: '225611460', cuid: 'kjl3io6t39n53dk', postponedTimeForSchedule: 10 }),
  new User({ name: 'Test User', phoneNumber: '123456789', cuid: '34okf38folk34k2', postponedTimeForSchedule: 60 }),
];

test.before('connect to mockgoose', async () => {
  await connectDB();
});

test.beforeEach('connect and add two team entries', async () => {
  await User.create(users).catch(() => 'Unable to create users');
});

test.afterEach(async () => {
  await dropDB();
});

test.serial('messageContentIs5_or_10_or_20 with number shall return true', t => {
  t.plan(3);

  const result5 = postponeNotificationController.messageContentIs5_or_10_or_20('5');
  const result10 = postponeNotificationController.messageContentIs5_or_10_or_20('10');
  const result20 = postponeNotificationController.messageContentIs5_or_10_or_20('20');

  t.true(result5);
  t.true(result10);
  t.true(result20);
});

test.serial('messageContentIs5_or_10_or_20 with text shall return false', t => {
  t.plan(3);

  const resultDelay5 = postponeNotificationController.messageContentIs5_or_10_or_20('delay 5');
  const resultTest = postponeNotificationController.messageContentIs5_or_10_or_20('test');
  const result12 = postponeNotificationController.messageContentIs5_or_10_or_20('12');

  t.false(resultDelay5);
  t.false(resultTest);
  t.false(result12);
});

test.serial('postponeNotification with correct message format and existing user phone number shall postpone the notification', async t => {
  t.plan(2);

  const res = await request(app)
    .post('api/postponeNotification')
    .send({ Body: '5', From: '+64225611460' })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedUser = await User.findOne({ name: 'Thorsten' }).exec();
  t.is(savedUser.postponedTimeForSchedule, 15);
});

test.serial('postponeNotification with false message format and existing user shall not postpone', async t => {
  t.plan(3);

  const res = await request(app)
    .post('api/postponeNotification')
    .send({ Body: 'test 5', From: '+64225611460' })
    .set('Accept', 'application/json');

  t.false(res.success);
  t.is(res.message, 'invalid content');

  const savedUser = await User.findOne({ name: 'Thorsten' }).exec();
  t.is(savedUser.postponedTimeForSchedule, 10);
});

test.serial('postponeNotification with correct message format but unknown phone number shall not postpone', async t => {
  t.plan(3);

  const res = await request(app)
    .post('api/postponeNotification')
    .send({ Body: '10', From: '+644444611460' })
    .set('Accept', 'application/json');

  t.false(res.success);
  t.is(res.message, 'unknown phone number');
});

test.serial('postponeNotification with correct message format and existing user but exceeded postpone time shall not postpone', async t => {
  t.plan(3);

  const res = await request(app)
    .post('api/postponeNotification')
    .send({ Body: '20', From: '+64123456789' })
    .set('Accept', 'application/json');

  t.false(res.success);
  t.is(res.message, 'postpone time exceeded');

  const savedUser = await User.findOne({ name: 'Test User' }).exec();
  t.is(savedUser.postponedTimeForSchedule, 60);
});
