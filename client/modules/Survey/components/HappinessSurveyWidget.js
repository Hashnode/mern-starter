import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import styles from './HappinessSurveyWidget.css';
import RangeSlider from './RangeSlider';

export class HappinessSurveyWidget extends Component {
  constructor(props) {
    super(props); // call parent method
    this.state = {
      valueIndividual: 3,
      valueTeam: 3
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // event.preventDefault();
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

// HappinessSurveyWidget.propTypes = {
//   // submitSurvey: PropTypes.func.isRequired
// };

export default injectIntl(HappinessSurveyWidget);
