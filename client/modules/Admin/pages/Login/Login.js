import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserList from './../UserList/UserList';
import callApi from '../../../../util/apiCaller';
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
    //ReactDOM.render((<UserList />), document.getElementById('root'));
  }

  submit() {
    const pwd = this.state.pwd;
    if (pwd.length === 0) {
      alert('please input password');
      return;
    }

    callApi('checkAdmin', 'post', {
      password: pwd
    }).then((res) => {
      if (!res.success) {
        alert('wrong password, please reinput');
        return;
      }

      ReactDOM.render((<UserList />), document.getElementById('root'));
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

export default Login;
