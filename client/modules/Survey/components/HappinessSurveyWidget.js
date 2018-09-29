import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

// Import Style
import styles from './HappinessSurveyWidget.css';

// Import External Components
import Slider, { createSliderWithTooltip } from 'rc-slider';
import sliderStylesIgnored from '!style-loader!css-loader!rc-slider/assets/index.css'; // eslint-disable-unused-import global-require

// constants for Sliders
const SliderWithTooltip = createSliderWithTooltip(Slider);
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
        <div className={styles.inputLabel}>
          <FormattedMessage id={"ownHappiness"} />
        </div>
        <div className={styles.slideContainer}>
          <SliderWithTooltip marks={sliderMarks} included={false} className={styles.slider} />
        </div>

        <div className={styles.inputLabel}>
          <FormattedMessage id={"teamHappiness"} />
        </div>
        <div className={styles.slideContainer}>
          <SliderWithTooltip marks={sliderMarks} included={false} className={styles.slider} />
        </div>
      </div>
    );
  }
}

HappinessSurveyWidget.propTypes = {
  submitSurvey: PropTypes.func.isRequired,
};

export default injectIntl(HappinessSurveyWidget);
