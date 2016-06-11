import { SWITCH_LANGUAGES, enabledLanguages } from './IntlActions';

const initialState = {
  locale: 'en',
  messages: {},
  fields: {},
  enabledLanguages,
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
