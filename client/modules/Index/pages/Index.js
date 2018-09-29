import React, { Component } from 'react';
import { withRouter, Link } from 'react-router';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import { FormattedMessage } from 'react-intl';
import sliderStylesIgnored from '!style-loader!css-loader!rc-slider/assets/index.css';
//import 'rc-slider/assets/index.css';
import styles from '../../App/App.css';

const SliderWithTooltip = createSliderWithTooltip(Slider);
const sliderMarks = { 0: 'very unhappy', 50: 'neutral', 100: 'very happy' };

class Index extends Component {

  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.container}>

        <div className={styles.inputLabel}><FormattedMessage id="ownHappiness" /></div>
        <div className={styles.slideContainer}>
          <SliderWithTooltip marks={sliderMarks} included={false} className={styles.slider} />
        </div>
        <div className={styles.inputLabel}><FormattedMessage id="teamHappiness" /></div>
        <div className={styles.slideContainer}>
          <SliderWithTooltip marks={sliderMarks} included={false} className={styles.slider} />
        </div>
      </div>
    )
  }
}

export default withRouter(Index);
