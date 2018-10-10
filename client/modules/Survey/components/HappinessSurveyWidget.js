import React, { Component } from 'react';
import PropTypes from 'prop-types';
import callApi from '../../../util/apiCaller';
import { FormattedMessage, injectIntl } from 'react-intl';
<<<<<<< HEAD
import './c1.css';
import RangeSlider0 from './range_slider_0';

export class HappinessSurveyWidget extends Component {
  
=======
import styles from './HappinessSurveyWidget.css';
import RangeSlider from './RangeSlider';

export class HappinessSurveyWidget extends Component {
>>>>>>> fb20a04070c6f9e204f8d8a20e8462b690d6aea1
  constructor(props) {
    super(props); // call parent method
    this.state = {
      valueIndividual: 3,
      valueTeam: 3
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
<<<<<<< HEAD
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
=======
    // event.preventDefault();
>>>>>>> fb20a04070c6f9e204f8d8a20e8462b690d6aea1
  }

  render() {
    const sliderStyle = {
      margin: '50px auto 140px auto'
    };
    return (
      <div>
        <div className={styles.form_login}>
          <form
            onSubmit={this.handleSubmit}
            style={{
              // border: '1px solid orange',
              top: '-53px',
              position: 'relative'
            }}
          >
            <div style={sliderStyle}>
              <RangeSlider
                question="How happy are you?"
                happyValue={valueIndividual =>
                  this.setState({ valueIndividual })
                }
              />
            </div>
            <div
              style={{
                width: '200px',
                border: '1px inset #f1f1f1',
                margin: '10px auto -14px auto',
                opacity: '0'
              }}
            />
            <div style={sliderStyle}>
              <RangeSlider
                question="How happy are you with your team?"
                happyValue={valueTeam => this.setState({ valueTeam })}
              />
            </div>
            <div>
              <input
                type="submit"
                value="Submit"
                style={{
                  width: '110px',
                  height: '50px',
                  margin: 'auto',
                  fontSize: '20px',
                  bottom: '15px',
                  position: 'relative'
                }}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

<<<<<<< HEAD
HappinessSurveyWidget.propTypes = {
};
=======
// HappinessSurveyWidget.propTypes = {
//   // submitSurvey: PropTypes.func.isRequired
// };
>>>>>>> fb20a04070c6f9e204f8d8a20e8462b690d6aea1

export default injectIntl(HappinessSurveyWidget);
