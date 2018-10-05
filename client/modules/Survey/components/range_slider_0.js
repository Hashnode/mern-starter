import React, { Component } from 'react';
import './c1.css';

// const Component = React.Component;

class RangeSlider0 extends Component {
  // state initialization in constructor
  constructor(props) {
    super(props); // call parent method
    this.state = { value: '50' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //   console.log(event.target.value);
    this.setState({ value: event.target.value });

    // print the value get from Range Slider
    var slider = document.getElementById('myRange');
    var output = document.getElementById('demo');
    output.innerHTML = slider.value;

    slider.oninput = function() {
      output.innerHTML = this.value;
    };
    this.props.sendData = this.state.value;
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  demoMethod() {
    this.props.sendData(this.state.value);
  }

  render() {
    console.log('RENDER');
    return (
      // <form onSubmit={this.handleSubmit}>
      //   <label>
      //     Name:
      //     <input
      //       type="text"
      //       value={this.state.value}
      //       onChange={this.handleChange}
      //     />
      //   </label>
      //   <input type="submit" value="Submit" />
      // </form>

      <label>
        <div className="relative">
          {this.props.name}
          happiness Level: <span id="demo"> {this.state.value}</span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={this.state.value}
          onChange={this.handleChange}
          className="slider"
          id="myRange"
        />
      </label>

      //   <div>
      //     <input onChange={this.handleChange} />
      //     Value of input: {this.state.value}
      //   </div>
    );
  }
}

export default RangeSlider0;
