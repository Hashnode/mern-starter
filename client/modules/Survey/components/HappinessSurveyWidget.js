import React, { Component } from 'react';
import PropTypes from 'prop-types';
import callApi from '../../../util/apiCaller';
import { FormattedMessage, injectIntl } from 'react-intl';
import './c1.css';
import RangeSlider0 from './range_slider_0';

export class HappinessSurveyWidget extends Component {
  
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
    const individualhappiness = 35;
    const teamhappiness = 66;
    const happiness = {
      happiness: {
        individualhappiness: individualhappiness,
        teamhappiness: teamhappiness
      }
    };

     alert(1);

     callApi('/happiness', 'post', happiness).then(res => {
      if (res.success) {
        //for resetting all the states
        // success message under submit button
        alert(res.cuid);
      } else {
        alert(res.message);
        console.log(res);
      }
    });
     alert(2);
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
};

export default injectIntl(HappinessSurveyWidget);
