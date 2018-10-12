import React, { Component } from 'react';
import callApi from '../../../util/apiCaller';
import { FormattedMessage, injectIntl } from 'react-intl';

// import styles
import styles from './HappinessSurveyWidget.css';
import RangeSlider from './RangeSlider';
import { Link } from 'react-router';

class HappinessSurveyWidget extends Component {
  constructor(props) {
    super(props); // call parent method
    this.state = {
      valueIndividual: 3,
      valueTeam: 3,
      query: props.location.query
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const u = this.state.query.u;
    const t = this.state.query.t;
    if (typeof u !== 'undefined' && typeof t !== 'undefined') {
      const title = '<a href="javascript:void(0)">' + u + ' | ' + t + '</a>';
      document.getElementById('titleRight').innerHTML = title;
    }
  }

  handleSubmit(event) {
    const individualHappiness = this.state.valueIndividual;
    const teamHappiness = this.state.valueTeam;
    const happiness = {
      happiness: {
        individualhappiness: individualHappiness,
        teamhappiness: teamHappiness,
      }
    };

    callApi('happiness', 'post', happiness).then(res => {
      if (res.cuid) {
        // reset all the states
        // success message under submit button
      } else {
        alert(res.message);
        console.log(res);
      }
    });
    event.preventDefault();
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

export default injectIntl(HappinessSurveyWidget);
// export default HappinessSurveyWidget;
