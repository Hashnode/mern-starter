import React, { Component } from 'react';

// Import Components
import { HappinessSurveyWidget } from '../../components/HappinessSurveyWidget';

// Import Selectors

class SurveyPage extends Component {
  render() {
    return (
      <div>
        <HappinessSurveyWidget />
      </div>
    );
  }
}

export default (SurveyPage);
