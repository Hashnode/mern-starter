import React, { Component } from 'react';
import style from './c1.css';
import RangeSlider0 from './range_slider_0';

// const Component = React.Component;

class RangeSlider extends Component {
  // state initialization in constructor
  constructor(props) {
    super(props); // call parent method
    this.state = { value: '50' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.getData = this.getData.bind(this);
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
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  getData(val) {
    // do not forget to bind getData in constructor
    // console.log(val);
    this.setState({ value: val });
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

      <div id={style.form_login}>
        <form onSubmit={this.handleSubmit}>
          <RangeSlider0 name="Own " />
          <RangeSlider0 name="Team " />
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
      //   <div>
      //     <input onChange={this.handleChange} />
      //     Value of input: {this.state.value}
      //   </div>
    );
  }
}

export default RangeSlider;
