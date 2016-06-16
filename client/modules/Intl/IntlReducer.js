import { enabledLanguages, localizationData } from '../../../Intl/setup';
import { SWITCH_LANGUAGE } from './IntlActions';

const initLocale = global.navigator && global.navigator.language || 'en';

const initialState = {
  locale: initLocale,
  enabledLanguages,
  ...(localizationData[initLocale] || {}),
};

const IntlReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_LANGUAGE:
      return { ...state, ...action };

    default:
      return state;
  }
};

export default IntlReducer;
