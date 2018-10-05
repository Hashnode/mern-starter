/* eslint-disable no-console,no-alert */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import callAdminApi from '../../../util/apiAdminCaller';
import style from './SendSMSDialog.css';


class SendSMSDialog extends Component {

  constructor() {
    super();
    this.close = this.close.bind(this);
    this.send = this.send.bind(this);
    this.state = {
      display: 'none',
      text: ''
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(props) {
    console.log(props);
    this.setState({
      display: props.data.display,
      text: 'Hi, ' + props.data.name + '. How are you feeling about the happiness right now? Please tell me about it on https://how-is-it.herokuapp.com/\n'
    });
  }

  close() {
    this.setState({
      display: 'none',
      text: ''
    });
  }

  send() {
    this.close();
    callAdminApi('sendSMS', 'post', { text: this.state.text }).then(res => {
      if (!res.success) {
        alert(res.message);
      } else {
        alert('SMS send successfully');
      }
    });
  }

  render() {
    return (
      <div className={style.background} style={{ display: this.state.display }}>
        <div className={style.container}>
          <div className={style['close-container']}>
            <div className={style.close} onClick={this.close}>X</div>
          </div>
          <div className={style['text-container']}>
            <textarea className={style.text} value={this.state.text}></textarea>
          </div>
          <div className={style['close-container']}>
            <div className={style.send} onClick={this.send}>Send</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SendSMSDialog);
