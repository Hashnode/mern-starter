// list of available languages
export const enabledLanguages = [
  'en',
  'fr',
];

// this object will have language-specific data added to it which will be placed in the state when that language is active
// if localization data get to big, stop importing in all languages and switch to using API requests to load upon switching languages
export const localizationData = {};

// here you bring in 'intl' browser polyfill and language-specific polyfills
// (needed as safari doesn't have native intl: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
// as well as react-intl's language-specific data
// be sure to use static imports for language or else every language will be included in your build (adds ~800 kb)
import { addLocaleData } from 'react-intl';

// need Intl polyfill, Intl not supported in Safari
import Intl from 'intl';
global.Intl = Intl;

// use this to allow nested messages, taken from docs:
// https://github.com/yahoo/react-intl/wiki/Upgrade-Guide#flatten-messages-object
function flattenMessages(nestedMessages = {}, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value; // eslint-disable-line no-param-reassign
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}

// bring in intl polyfill, react-intl, and app-specific language data
import 'intl/locale-data/jsonp/en';
import en from 'react-intl/locale-data/en';
import enData from './localizationData/en';
addLocaleData(en);
localizationData.en = enData;
localizationData.en.messages = flattenMessages(localizationData.en.messages);

import 'intl/locale-data/jsonp/fr';
import fr from 'react-intl/locale-data/fr';
import frData from './localizationData/fr';
addLocaleData(fr);
localizationData.fr = frData;
localizationData.fr.messages = flattenMessages(localizationData.fr.messages);
