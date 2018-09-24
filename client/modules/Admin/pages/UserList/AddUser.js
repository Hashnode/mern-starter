/* eslint-disable no-alert,no-console */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import callApi from '../../../../util/apiCaller';
import style from './AddUser.css';
import UserList from './UserList';
import PropTypes from 'prop-types';

class AddUser extends Component {

  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.change = this.change.bind(this);
    this.state = {
      id: props.user.id ? props.user.id : '',
      name: props.user.name,
      phone: props.user.phone,
      email: props.user.email,
    };
  }

  componentDidMount() {
  }

  save() {
    let uri = 'addUser';
    if (this.state.id.length > 0) {
      uri = 'editUser';
    }
    callApi(uri, 'post', this.state).then(res => {
      if (res.success) {
        ReactDOM.render((<UserList />), document.getElementById('root'));
      } else {
        alert(res.message);
        console.log(res);
      }
    });
  }

  change(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  render() {
    return (
      <div className={style.container}>
        <h2>Add User</h2>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td className={style['td-right']}>User Name:</td>
              <td className={style['td-left']}><input name="name" onChange={this.change} value={this.state.name} /></td>
            </tr>
            <tr>
              <td className={style['td-right']}>Phone Number:</td>
              <td className={style['td-left']}><input name="phone" onChange={this.change} value={this.state.phone} /></td>
            </tr>
            <tr>
              <td className={style['td-right']}>Email Address:</td>
              <td className={style['td-left']}><input name="email" onChange={this.change} value={this.state.email} /></td>
            </tr>
          </tbody>
        </table>
        <div className={style['add-container']}>
          <div className={style.add} onClick={this.save}>Save</div>
        </div>
      </div>
    );
  }
}

AddUser.propTypes = {
  user: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })).isRequired,
};

export default AddUser;
