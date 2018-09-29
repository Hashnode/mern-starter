/* eslint-disable no-alert */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import callAdminApi from '../../../../util/apiAdminCaller';
import style from './Login.css';


class Login extends Component {

  constructor() {
    super();
    this.state = {
      pwd: '',
    };
    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    callAdminApi('checkSession', 'post', {}).then((res) => {
      if (res.success) {
        this.props.router.push('admin/userlist');
      }
    });
  }

  submit() {
    const pwd = this.state.pwd;
    if (pwd.length === 0) {
      alert('please input password');
      return;
    }

    callAdminApi('checkAdmin', 'post', {
      password: pwd,
    }).then((res) => {
      if (!res.success) {
        alert('wrong password, please reinput');
        return;
      }
      this.props.router.push('admin/userlist');
    });
  }

  change(e) {
    this.setState({ pwd: e.target.value });
  }

  render() {
    return (
      <div className={style.container}>
        <h2>Administrator</h2>
        <div className={style['pwd-container']}>
          <input type="password" placeholder="please input password" className={style['pwd-content']} onChange={this.change} />
        </div>
        <div className={style['submit-container']}>
          <div className={style['submit-button']} onClick={this.submit} >Submit</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
