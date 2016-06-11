import { enabledLanguages, localizationData } from './setup/setup';
import { SWITCH_LANGUAGES } from './IntlActions';

const initLocale = global.navigator && global.navigator.language || 'en';

const initialState = {
  locale: initLocale,
  enabledLanguages,
  ...(localizationData[initLocale] || {}),
};

const IntlReducer = (state = initialState, { type, ...action }) => {
  switch (type) {
    case SWITCH_LANGUAGES:
      return { ...state, ...action };

    default:
      return state;
  }
};

export default IntlReducer;
