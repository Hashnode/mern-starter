import React, { Component } from 'react';
import callApi from '../../../util/apiCaller';
import { injectIntl } from 'react-intl';

import styles from './HappinessSurveyWidget.css';
import RangeSlider from './RangeSlider';
import { throws } from 'assert';

class HappinessSurveyWidget extends Component {
  constructor(props) {
    super(props); // call parent method
    this.state = {
      valueIndividual: 3,
      valueTeam: 3,
      query: props.location.query,
      // display: 'block',
      message: '',
      submit: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const username = this.state.query.u;
    const teamname = this.state.query.t;
    if (typeof username !== 'undefined' && typeof teamname !== 'undefined') {
      const title = `<a href="javascript:void(0)">${username} | ${teamname}</a>`;
      document.getElementById('titleRight').innerHTML = title;
    }
  }

  handleSubmit(event) {
    const individualHappiness = this.state.valueIndividual;
    const teamHappiness = this.state.valueTeam;
    const sid = this.state.query.s;
    const happiness = {
      happiness: {
        individualhappiness: individualHappiness,
        teamhappiness: teamHappiness,
        sid: typeof sid === 'undefined' ? '' : sid
      }
    };

    // const element = document.getElementById('success_message');
    // // element.innerHTML = this.state.valueIndividual;
    // element.innerHTML = 'submitted';

    // callApi('/happiness', 'post', happiness).then(res => {
    //   if (res.success) {

    callApi('happiness', 'post', happiness).then(res => {
      if (res.happiness) {
        // reset all the states
        // success message under submit button

        this.setState({
          valueIndividual: 3,
          valueTeam: 3,
          submit: true
        });
        const message = document.getElementById('success_message');
        message.innerHTML = 'Your input has been successfully submitted';
        // message.innerHTML = this.state.valueIndividual;
      } else {
        alert(res);
        console.log(res);
      }
    });
    event.preventDefault();
  }

  render() {
    const sliderStyle = {
      margin: '10px auto 140px auto'
    };
    // const messageStyle = {
    //   display: this.state.display
    // };
    console.log('render');
    return (
      <div style={{ overflow: 'hidden' }}>
        <div className={styles.form_login}>
          <form
            // style={messageStyle}
            onSubmit={this.handleSubmit}
            // style={{
            //   border: '1px solid orange',
            //   top: '0px',
            //   position: 'relative'
            // }}
          >
            <div style={sliderStyle}>
              <RangeSlider
                question="How happy are you with your work in the team?"
                value={this.state.valueIndividual}
                submit={this.state.submit}
                // value={this.state.valueIndividual}
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
                question="How happy do you think is your team with the work?"
                value={this.state.valueTeam}
                submit={this.state.submit}
                happyValue={valueTeam => {
                  this.setState({ valueTeam });
                  const message = document.getElementById('success_message');
                  // message.innerHTML =
                  //   this.state.valueIndividual + ' ' + this.state.valueTeam;
                }}
              />
            </div>
            <div>
              <input
                // id="success_message"success_message
                type="submit"
                value="Submit"
                style={{
                  width: '90px',
                  height: '35px',
                  margin: 'auto',
                  fontSize: '16px',
                  bottom: '15px',
                  position: 'relative',
                  color: 'rgb(0, 92, 230)',
                  textTransform: 'uppercase'
                }}
              />
            </div>
          </form>
          <div id="success_message" className={styles.show}>
            {this.state.valueIndividual + ' & ' + this.state.valueTeam}
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(HappinessSurveyWidget);
// export default HappinessSurveyWidget;
