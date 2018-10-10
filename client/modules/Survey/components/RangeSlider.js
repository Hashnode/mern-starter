import React, { Component } from 'react';
import styles from './HappinessSurveyWidget.css';

// const Component = React.Component;

class RangeSlider extends Component {
  // state initialization in constructor
  constructor(props) {
    super(props); // call parent method
    this.state = {
      value: 3,
      drag: 0,
      top: ['-11px', '-11px', '-42px', '-11px', '-11px']
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubm3it = this.handleSubmit.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  handleChange = event => {
    this.setState({ value: event.target.value });

    // print the value get from Range Slider
    // var slider = document.getElementById('myRange');
    // var output = document.getElementById('demo');
    // output.innerHTML = slider.value;

    // slider.oninput = function() {
    //   output.innerHTML = this.value;
    // };

    // this.setState({ value: this.refs.score.value });
    //this.refs.score.value =
    // this.props.sendData = this.state.value;
  };

  // Range slider: drag.  but I trigger it without press the element
  onMouseDown = e => {
    this.setState({ drag: 1 });
  };
  onMouseUp = e => {
    this.setState({ drag: 0 });
  };

  handleClick = e => {
    // var slider = document.getElementById('myRange');
    var element = document.getElementById('myRange');
    var rect = element.getBoundingClientRect();

    var spaceToLeft = e.clientX - rect.left;
    const ulWidth = document.getElementById('myRange').clientWidth;
    if (spaceToLeft < 0 || spaceToLeft > ulWidth) {
      return;
    }

    const liWidth = document.getElementById('one').clientWidth;
    // var ulWidth = rect.right - rect.left - 40
    var score = (spaceToLeft / ulWidth) * 5;
    var level = Math.ceil(score);
    this.refs.score.value = level;

    // this.state.value = this.refs.score.value;
    this.setState({
      value: this.refs.score.value
    });

    if (level === 1) {
      this.setState({
        value: this.refs.score.value,
        top: ['-42px', '-11px', '-15px', '-11px', '-11px']
      });
    } else if (level === 2) {
      this.setState({
        value: this.refs.score.value,
        top: ['-11px', '-42px', '-15px', '-11px', '-11px']
      });
    } else if (level === 3) {
      this.setState({
        value: this.refs.score.value,
        top: ['-11px', '-11px', '-45px', '-11px', '-11px']
      });
    } else if (level === 4) {
      this.setState({
        value: this.refs.score.value,
        top: ['-11px', '-11px', '-15px', '-42px', '-11px']
      });
    } else if (level === 5) {
      this.setState({
        value: this.refs.score.value,
        top: ['-11px', '-11px', '-15px', '-11px', '-42px']
      });
    }

    this.props.happyValue(this.refs.score.value);
  };

  _onMouseMove = e => {
    if (this.state.drag === 0) {
      return;
    }
    var element = document.getElementById('myRange');
    var rect = element.getBoundingClientRect();

    var spaceToLeft = e.clientX - rect.left;
    const ulWidth = document.getElementById('myRange').clientWidth;
    if (spaceToLeft < 0 || spaceToLeft > ulWidth) {
      return;
    }

    const liWidth = document.getElementById('one').clientWidth;
    // var ulWidth = rect.right - rect.left - 40
    var score = (spaceToLeft / ulWidth) * 5;
    var level = Math.ceil(score);
    this.refs.score.value = level;
    /* no jump move
    if (level === 1) {
      this.setState({
        value: this.refs.score.value,
        top: ['-22px', '-11px', '-15px', '-11px', '-11px']
      });
    } else if (level === 2) {
      this.setState({
        value: this.refs.score.value,
        top: ['-11px', '-22px', '-15px', '-11px', '-11px']
      });
    } else if (level === 3) {
      this.setState({
        value: this.refs.score.value,
        top: ['-11px', '-11px', '-25px', '-11px', '-11px']
      });
    } else if (level === 4) {
      this.setState({
        value: this.refs.score.value,
        top: ['-11px', '-11px', '-15px', '-22px', '-11px']
      });
    } else if (level === 5) {
      this.setState({
        value: this.refs.score.value,
        top: ['-11px', '-11px', '-15px', '-11px', '-22px']
      });
    }
    */

    if (level === 1) {
      this.setState({
        value: this.refs.score.value,
        top: ['-42px', '-11px', '-13px', '-11px', '-11px']
      });
    } else if (level === 2) {
      this.setState({
        value: this.refs.score.value,
        top: ['-11px', '-42px', '-13px', '-11px', '-11px']
      });
    } else if (level === 3) {
      this.setState({
        value: this.refs.score.value,
        top: ['-11px', '-11px', '-45px', '-11px', '-11px']
      });
    } else if (level === 4) {
      this.setState({
        value: this.refs.score.value,
        top: ['-11px', '-11px', '-13px', '-42px', '-11px']
      });
    } else if (level === 5) {
      this.setState({
        value: this.refs.score.value,
        top: ['-11px', '-11px', '-13px', '-11px', '-42px']
      });
    }
    this.props.happyValue(this.refs.score.value);
  };

  onTouchMove = e => {
    // var output = document.getElementById('show');
    // output.innerHTML = e.touches[0].clientX;

    // slider.oninput = function() {
    //   output.innerHTML = this.value;
    // };

    var element = document.getElementById('myRange');
    var rect = element.getBoundingClientRect();

    var spaceToLeft = e.touches[0].clientX - rect.left;
    const ulWidth = document.getElementById('myRange').clientWidth;
    if (spaceToLeft < 0 || spaceToLeft > ulWidth) {
      return;
    }

    const liWidth = document.getElementById('one').clientWidth;
    // var ulWidth = rect.right - rect.left - 40
    var score = (spaceToLeft / ulWidth) * 5;
    var level = Math.ceil(score);
    this.refs.score.value = level;

    if (level === 1) {
      this.setState({
        value: this.refs.score.value,
        top: ['-42px', '-11px', '-13px', '-11px', '-11px']
      });
    } else if (level === 2) {
      this.setState({
        value: this.refs.score.value,
        top: ['-11px', '-42px', '-13px', '-11px', '-11px']
      });
    } else if (level === 3) {
      this.setState({
        value: this.refs.score.value,
        top: ['-11px', '-11px', '-45px', '-11px', '-11px']
      });
    } else if (level === 4) {
      this.setState({
        value: this.refs.score.value,
        top: ['-11px', '-11px', '-13px', '-42px', '-11px']
      });
    } else if (level === 5) {
      this.setState({
        value: this.refs.score.value,
        top: ['-11px', '-11px', '-13px', '-11px', '-42px']
      });
    }
    this.props.happyValue(this.refs.score.value);
  };

  // const returnValue = {}
  render() {
    const styles1 = {
      width: this.state.value === 1 ? '60px' : '41px',
      height: this.state.value === 1 ? '60px' : '40px',
      left: this.state.value === 1 ? '-3px' : '10px',
      border: this.state.value === 1 ? '4px solid rgb(255, 230, 0)' : 0,
      top: this.state.top[0]
    };
    const styles2 = {
      width: this.state.value === 2 ? '60px' : '41px',
      height: this.state.value === 2 ? '60px' : '40px',
      left: this.state.value === 2 ? '-3px' : '10px',
      border: this.state.value === 2 ? '4px solid rgb(255, 230, 0)' : 0,
      top: this.state.top[1]
    };
    const styles3 = {
      width: this.state.value === 3 ? '60px' : '41px',
      height: this.state.value === 3 ? '60px' : '40px',
      left: this.state.value === 3 ? '-3px' : '10px',
      border: this.state.value === 3 ? '4px solid rgb(255, 230, 0)' : 0,
      top: this.state.top[2]
    };
    const styles4 = {
      width: this.state.value === 4 ? '60px' : '41px',
      height: this.state.value === 4 ? '60px' : '40px',
      left: this.state.value === 4 ? '-3px' : '10px',
      border: this.state.value === 4 ? '4px solid rgb(255, 230, 0)' : 0,
      top: this.state.top[3]
    };
    const styles5 = {
      width: this.state.value === 5 ? '60px' : '41px',
      height: this.state.value === 5 ? '60px' : '40px',
      left: this.state.value === 5 ? '-3px' : '10px',
      border: this.state.value === 5 ? '4px solid rgb(255, 230, 0)' : 0,
      top: this.state.top[4]
    };

    return (
      <div className={styles.wrapper}>
        {/* <label className="statement">
          {this.props.question} <span ref="demo">{this.state.value} </span>
        </label> */}
        <label className={styles.statement}>
          {this.props.question} <span ref="demo"> </span>
        </label>

        <ul
          className={styles.likert}
          onClick={this.handleClick}
          onChange={this.handleChange}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseMove={this._onMouseMove}
          onTouchMove={this.onTouchMove}
          value={this.state.value}
          id="myRange"
          ref="score"
        >
          <li className={styles.li1}>
            <div id="one" className={styles.one} style={styles1} />
            <label className={styles.label1}>Sad</label>
          </li>
          <li className={styles.li1}>
            <div id="two" className={styles.two} style={styles2} />
            <label className={styles.label1}>Unhappy</label>
          </li>
          <li className={styles.li1}>
            <div id="three" className={styles.three} style={styles3} />
            <label className={[styles.desc, styles.label1].join(' ')}>
              Neutral
            </label>
          </li>
          <li className={styles.li1}>
            <div id="four" className={styles.four} style={styles4} />
            <label className={styles.label1}>Little happy</label>
          </li>
          <li className={styles.li1}>
            <div id="five" className={styles.five} style={styles5} />
            <label className={styles.label1}>Very happy</label>
          </li>
        </ul>
      </div>
    );
  }
}

export default RangeSlider;
//
