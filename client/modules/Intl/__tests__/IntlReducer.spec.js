import test from 'ava';
import { reducerTest } from 'redux-ava';
import intlReducer from '../IntlReducer';
import { switchLanguage } from '../IntlActions';
import { localizationData, enabledLanguages } from '../../../../Intl/setup';

test('action for SWITCH_LANGUAGE is working', reducerTest(
  intlReducer,
  { locale: 'en', enabledLanguages, ...localizationData.en },
  switchLanguage('fr'),
  { locale: 'fr', enabledLanguages, ...localizationData.fr },
));
