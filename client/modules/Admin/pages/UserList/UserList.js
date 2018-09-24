/* eslint-disable no-console,no-alert */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import callApi from '../../../../util/apiCaller';
import AddUser from './AddUser';
import style from './UserList.css';

class UserList extends Component {

  constructor() {
    super();
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.state = { list: [] };
  }

  componentDidMount() {
    callApi('userList', 'post', {}).then(res => {
      this.setState({ list: res.message });
      console.log(this.state);
    });
  }

  add() {
    ReactDOM.render((<AddUser user={{ id: '', name: '', phone: '', email: '' }} />), document.getElementById('root'));
  }

  edit(e) {
    const user = this.state.list.find(item => {
      if (item.id === e.target.id) {
        return true;
      }
      return false;
    });
    ReactDOM.render((<AddUser user={user} />), document.getElementById('root'));
  }

  delete(e) {
    if (!confirm('Sure to delete this user?')) return;
    const user = this.state.list.find(item => {
      if (item.id === e.target.id) {
        return true;
      }
      return false;
    });
    callApi('deleteUser', 'post', user).then(res => {
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

export default UserList;
