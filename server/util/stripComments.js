/*
    This is a helper function for stripping comments from strings
    This function is taken from here with minor changes to ES6:
    http://james.padolsey.com/javascript/removing-comments-in-javascript/
*/
export function stripComments(str) {
  str = (`__${str}__`).split('');
  const mode = {
    singleQuote: false,
    doubleQuote: false,
    regex: false,
    blockComment: false,
    lineComment: false,
    condComp: false,
  };
  for (let i = 0, l = str.length; i < l; i++) {
    if (mode.regex) {
      if (str[i] === '/' && str[i - 1] !== '\\')
        mode.regex = false;
      continue;
    }

    if (mode.singleQuote) {
      if (str[i] === "'" && str[i - 1] !== '\\')
        mode.singleQuote = false;
      continue;
    }

    if (mode.doubleQuote) {
      if (str[i] === '"' && str[i - 1] !== '\\')
        mode.doubleQuote = false;
      continue;
    }

    if (mode.blockComment) {
      if (str[i] === '*' && str[i + 1] === '/') {
        str[i + 1] = '';
        mode.blockComment = false;
      }
      str[i] = '';
      continue;
    }

    if (mode.lineComment) {
      if (str[i + 1] === 'n' || str[i + 1] === 'r')
        mode.lineComment = false;
      str[i] = '';
      continue;
    }

    if (mode.condComp) {
      if (str[i - 2] === '@' && str[i - 1] === '*' && str[i] === '/')
        mode.condComp = false;
      continue;
    }

    mode.doubleQuote = str[i] === `"`;
    mode.singleQuote = str[i] === `'`;

    if (str[i] === '/') {
      if (str[i + 1] === '*' && str[i + 2] === '@') {
        mode.condComp = true;
        continue;
      }
      if (str[i + 1] === '*') {
        str[i] = '';
        mode.blockComment = true;
        continue;
      }
      if (str[i + 1] === '/') {
        str[i] = '';
        mode.lineComment = true;
        continue;
      }
      mode.regex = true;
    }
  }
  return str.join('').slice(2, -2);
}
