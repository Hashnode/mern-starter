import { localizationData } from './setup/setup';

// Export Constants
export const SWITCH_LANGUAGES = 'SWITCH_LANGUAGES';

export function switchLanguages(newLang) {
  return {
    type: SWITCH_LANGUAGES,
    ...localizationData[newLang],
  };
}
