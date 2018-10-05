import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import './c1.css';
import RangeSlider0 from './range_slider_0';

// Import Style
// import styles from './HappinessSurveyWidget.css';
// require('../../../../node_modules/rc-slider/assets/index.css'); // webpack problem with css imports (this line works for tests)
// import '!style-loader!css-loader!../../../../node_modules/rc-slider/assets/index.css'; // webpack problem with css imports (this line works for execution)

// // Import External Components
// import Slider, { createSliderWithTooltip } from 'rc-slider';

// // constants for Sliders
// const SliderWithTooltipOwn = createSliderWithTooltip(Slider);
// const SliderWithTooltipTeam = createSliderWithTooltip(Slider);
// const sliderMarks = { 0: 'very unhappy', 50: 'neutral', 100: 'very happy' };

export class HappinessSurveyWidget extends Component {
  // submitSurvey = () => {
  //   const happinessLevelRef = this.refs.happinessLevel;
  //   if (happinessLevelRef.value) {
  //     this.props.submitSurvey();
  //   }
  // };

  // render() {
  //   return (
  //     <div>
  //       <h2 className={styles.inputLabel}>
  //         <FormattedMessage id={"ownHappiness"} />
  //       </h2>
  //       <div className={styles.slideContainer}>
  //         <SliderWithTooltipOwn marks={sliderMarks} included={false} className={styles.slider} />
  //       </div>

  //       <h2 className={styles.inputLabel}>
  //         <FormattedMessage id={"teamHappiness"} />
  //       </h2>
  //       <div className={styles.slideContainer}>
  //         <SliderWithTooltipTeam marks={sliderMarks} included={false} className={styles.slider} />
  //       </div>
  //     </div>
  //   );
  // }

  constructor(props) {
    super(props); // call parent method
    this.state = { value: '50' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.getData = this.getData.bind(this);
  }

  handleChange(event) {
    //   console.log(event.target.value);
    this.setState({ value: event.target.value });

    // print the value get from Range Slider
    var slider = document.getElementById('myRange');
    var output = document.getElementById('demo');
    output.innerHTML = slider.value;

    slider.oninput = function() {
      output.innerHTML = this.value;
    };
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  getData(val) {
    // do not forget to bind getData in constructor
    // console.log(val);
    this.setState({ value: val });
  }

  render() {
    console.log('RENDER');
    return (
      <div id="form_login">
        <form onSubmit={this.handleSubmit}>
          <RangeSlider0 name="Own " />
          <RangeSlider0 name="Team " />
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

HappinessSurveyWidget.propTypes = {
  submitSurvey: PropTypes.func.isRequired
};

export default injectIntl(HappinessSurveyWidget);
