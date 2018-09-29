import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Import Style
import styles from './HappinessSurveyWidget.css';
require('../../../../node_modules/rc-slider/assets/index.css'); // workaround for webpack problem with css imports

// Import External Components
import Slider, { createSliderWithTooltip } from 'rc-slider';

// constants for Sliders
const SliderWithTooltipOwn = createSliderWithTooltip(Slider);
const SliderWithTooltipTeam = createSliderWithTooltip(Slider);
const sliderMarks = { 0: 'very unhappy', 50: 'neutral', 100: 'very happy' };

export class HappinessSurveyWidget extends Component {
  submitSurvey = () => {
    const happinessLevelRef = this.refs.happinessLevel;
    if (happinessLevelRef.value) {
      this.props.submitSurvey();
    }
  };

  render() {
    return (
      <div>
        <h2 className={styles.inputLabel}>
          <FormattedMessage id={"ownHappiness"} />
        </h2>
        <div className={styles.slideContainer}>
          <SliderWithTooltipOwn marks={sliderMarks} included={false} className={styles.slider} />
        </div>

        <h2 className={styles.inputLabel}>
          <FormattedMessage id={"teamHappiness"} />
        </h2>
        <div className={styles.slideContainer}>
          <SliderWithTooltipTeam marks={sliderMarks} included={false} className={styles.slider} />
        </div>
      </div>
    );
  }
}

HappinessSurveyWidget.propTypes = {
  submitSurvey: PropTypes.func.isRequired,
};

export default injectIntl(HappinessSurveyWidget);
