const secrets = {
  dbUri: 'mongodb://admin:qwerty123@ds123584.mlab.com:23584/test-task'
};

export const getSecret = key => secrets[key];