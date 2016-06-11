import { SWITCH_LANGUAGES } from './IntlActions';

const initialState = {
  locale: 'en',
  messages: {},
  fields: {},
  enabledLanguages: ['en', 'fr'],
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
