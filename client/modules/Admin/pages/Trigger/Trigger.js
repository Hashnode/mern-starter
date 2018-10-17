/* eslint-disable no-alert */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import callAdminApi from '../../../../util/apiAdminCaller';
import style from './Trigger.css';


class Trigger extends Component {

  constructor() {
    super();
    this.state = { number: '', length: '' };
    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);
    this.stop = this.stop.bind(this);
    this.delay = this.delay.bind(this);
  }

  submit() {
    const number = this.state.number;
    const length = this.state.length;
    if (number.length === 0 || length.length === 0) {
      alert('please input next notification time and team time length');
      return;
    }

    callAdminApi('trigger', 'post', {
      number,
      length,
    }).then((res) => {
      if (!res.success) {
        alert(res.message);
        return;
      }
      alert(res.message);
    });
  }

  stop() {
    callAdminApi('stopTrigger', 'post', {
    }).then((res) => {
      if (!res.success) {
        alert(res.message);
        return;
      }
      alert(res.message);
    });
  }

  delay() {
    callAdminApi('delay', 'post', {
    }).then((res) => {
      if (!res.success) {
        alert(res.message);
        return;
      }
      alert(res.message);
    });
  }

  change(e) {
    if (e.target.id === 'timelength') {
      this.setState({
        length: e.target.value,
        number: this.state.number,
      });
    } else {
      this.setState({
        length: this.state.length,
        number: e.target.value,
      });
    }
  }

  render() {
    return (
      <div className={style.container}>
        <table>
          <tbody>
            <tr>
              <td>team time length: </td>
              <td><input className={style.number} onChange={this.change} id="timelength" /></td>
              <td>minutes</td>
            </tr>
            <tr>
              <td>next notification: </td>
              <td><input className={style.number} onChange={this.change} id="nexttime" /></td>
              <td>minutes</td>
            </tr>
            <tr>
              <td><input className={style.submit} type="button" value="trigger" onClick={this.submit} /></td>
              <td><input className={style.submit} type="button" value="delay" onClick={this.delay} /></td>
              <td><input className={style.submit} type="button" value="stop" onClick={this.stop} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(Trigger);
