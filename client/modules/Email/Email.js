import React, { Component } from 'react';

class Email extends Component {

  constructor(props) {
      super(props);
      this.state = {
        to: "",
        title: "",
        body: ""
      };
  }
  
  render() {
    return ( 
      <div className="row">
          <div>Send an email: </div>
          <form onSubmit={this.submitEmail.bind(this)}>
              <div className="row">
                  <input id="to" ref="to" type="text"></input>
                  <label htmlFor="to">To: </label>
              </div>
              <div className="row">
                  <input id="title" ref="title" type="text"></input>
                  <label htmlFor="to">Title: </label>
              </div>
              <div className="row">
                  <input id="body" ref="body" type="text"></input>
                  <label htmlFor="to">Body: </label>
              </div>
              <button type="submit" name="action">Send</button>
          </form>
      </div>
    );
  }
}

export default Email;
