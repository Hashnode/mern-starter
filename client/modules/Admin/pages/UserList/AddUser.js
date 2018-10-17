/* eslint-disable no-alert,no-console */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import callAdminApi from '../../../../util/apiAdminCaller';
import style from './AddUser.css';
import callApi from '../../../../util/apiCaller';
import valueOfProperty from '../../../../util/objectHelper';

class AddUser extends Component {

  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.change = this.change.bind(this);
    this.changeGroup = this.changeGroup.bind(this);

    const user = this.props.location.state.user;
    user.team = valueOfProperty(user.team, '_id');
    this.state = {
      user: user,
      teams: []
    };
  }

  componentDidMount() {
    callApi('teams', 'get').then(res => {
      this.setState({
        user: this.state.user,
        teams: res.teams,
      });
    });
  }

  save() {
    let uri = 'addUser';
    if (this.state.user.id.length > 0) {
      uri = 'editUser';
    }
    console.log(this.state.user);
    callAdminApi(uri, 'post', this.state.user).then(res => {
      if (res.success) {
        this.props.router.push('/admin/userlist');
      } else {
        alert(res.message);
        console.log(res);
      }
    });
  }

  change(e) {
    const user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({
      user: user,
      teams: this.state.teams
    });
  }

  changeGroup(e) {
    const user = this.state.user;
    user.team = e.target.value;
    this.setState({
      user: user,
      teams: this.state.teams
    });
  }

  render() {
    return (
      <div className={style.container}>
        <h2>Add User</h2>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td className={style['td-right']}>User Name:</td>
              <td className={style['td-left']}><input name="name" onChange={this.change} value={this.state.user.name} /></td>
            </tr>
            <tr>
              <td className={style['td-right']}>Phone Number:</td>
              <td className={style['td-left']}><input name="phone" onChange={this.change} value={this.state.user.phone} /></td>
            </tr>
            <tr>
              <td className={style['td-right']}>Email Address:</td>
              <td className={style['td-left']}><input name="email" onChange={this.change} value={this.state.user.email} /></td>
            </tr>
            <tr>
              <td className={style['td-right']}>Team:</td>
              <td className={style['td-left']}>
                <select value={this.state.user.team} onChange={this.changeGroup}>
                  {
                    this.state.teams.map(item => {
                      return (
                        <option key={item._id} value={item._id}>{item.name}</option>
                      );
                    })
                  }
                </select>
              </td>
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

// AddUser.propTypes = {
//   user: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     phone: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//   })).isRequired,
// };

export default withRouter(AddUser);
