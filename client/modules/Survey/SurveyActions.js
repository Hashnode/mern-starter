// Export Constants
export const SUBMIT_SURVEY = 'SUBMIT_SURVEY';

// Export Actions
export function submitSurvey(survey) {
  return {
    type: SUBMIT_SURVEY,
    survey,
  };
}

export function submitSurveyRequest() {
  return null; // implement submission of survey
}
