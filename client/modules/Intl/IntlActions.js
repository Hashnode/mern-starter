import { addLocaleData } from 'react-intl';

// Export Constants
export const SWITCH_LANGUAGES = 'SWITCH_LANGUAGES';

export function switchLanguages(newLang) {
  return {
    type: SWITCH_LANGUAGES,
    locale: newLang,
    messages: {},
    fields: {},
  };
}

export const enabledLanguages = [
  'en',
  'ar',
  'es',
  'fr',
];

// here you bring in 'intl' browser polyfill and language-specific polyfills
// (needed as safari doesn't have native intl: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
// as well as react-intl's language-specific date
// be sure to use static imports or else every language will be included in your build

// need Intl polyfill, Intl not supported in Safari
import Intl from 'intl';
global.Intl = Intl;

import 'intl/locale-data/jsonp/en';
import en from 'react-intl/locale-data/en';
addLocaleData(en);

import 'intl/locale-data/jsonp/ar';
import ar from 'react-intl/locale-data/ar';
addLocaleData(ar);

import 'intl/locale-data/jsonp/es';
import es from 'react-intl/locale-data/es';
addLocaleData(es);

import 'intl/locale-data/jsonp/fr';
import fr from 'react-intl/locale-data/fr';
addLocaleData(fr);
