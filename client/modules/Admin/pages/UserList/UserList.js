/* eslint-disable no-console,no-alert */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import callAdminApi from '../../../../util/apiAdminCaller';
import style from './UserList.css';
import valueOfProperty from '../../../../util/objectHelper';

class UserList extends Component {

  constructor() {
    super();
    this.state = { list: [] };
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    callAdminApi('userList', 'post', {}).then(res => {
      if (res.success) {
        console.log(res.message);
        this.setState({ list: res.message });
      }
    });
  }

  add() {
    const user = { id: '', name: '', email: '', phone: '' };
    this.props.router.push({
      pathname: "/admin/adduser",
      state: {
        user: user
      }
    });
  }

  edit(e) {
    const user = this.state.list.find(item => {
      if (item.id === e.target.id) {
        return true;
      }
      return false;
    });
    this.props.router.push({
      pathname: "/admin/adduser",
      state: {
        user: user
      }
    });
  }

  delete(e) {
    if (!confirm('Sure to delete this user?')) return;
    const user = this.state.list.find(item => {
      if (item.id === e.target.id) {
        return true;
      }
      return false;
    });
    callAdminApi('deleteUser', 'post', user).then(res => {
      if (!res.success) {
        alert(res.message);
        return;
      }
      this.componentDidMount();
    });
  }

  render() {
    return (
      <div className={style.container}>
        <h2>User List</h2>
        <div className={style['add-container']}>
          <div className={style.add} onClick={this.add}>Add</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Team</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.list.map((item) => {
              return (<tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{valueOfProperty(item.team, 'name')}</td>
                <td><div className={style.operation} onClick={this.edit} id={item.id}>edit</div></td>
                <td><div className={style.operation} onClick={this.delete} id={item.id}>delete</div></td>
              </tr>);
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(UserList);
