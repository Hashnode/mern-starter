import test from 'ava';
import callApi, { API_URL } from '../apiCaller';
import nock from 'nock';

test('method defaults to GET', t => {
  const reply = { foo: 'bar' };
  nock(API_URL)
    .get('/foo')
    .reply(200, reply);
  return callApi('foo').then(response => {
    t.deepEqual(response, reply);
  });
});

test('sends the body', t => {
  const body = { id: 5 };
  const reply = { foo: 'bar' };
  nock(API_URL)
    .post('/foo', body)
    .reply(200, reply);
  return callApi('foo', 'post', body).then(response => {
    t.deepEqual(response, reply);
  });
});

test('returns the error', t => {
  const reply = { message: 'Errrrrrrrrr' };
  nock(API_URL)
    .get('/send_error')
    .reply(500, reply);
  return callApi('send_error').then(error => {
    t.deepEqual(error, reply);
  });
});
