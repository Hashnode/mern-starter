import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Components
import { HappinessSurveyWidget } from '../../components/HappinessSurveyWidget';

// Import Actions
import { submitSurveyRequest } from '../../SurveyActions';

// Import Selectors

class SurveyPage extends Component {
  /* componentDidMount() {

  } */
  // Handlers
  submitSurvey = (happinessLevel) => {
    this.props.dispatch(submitSurveyRequest({ happinessLevel }));
  };

  render() {
    return (
      <div>
        <HappinessSurveyWidget submitSurvey={this.submitSurvey} />
      </div>
    );
  }
}

SurveyPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default (SurveyPage);
