import React, { Component } from 'react';
import styles from './HappinessSurveyWidget.css';
// import logo1 from './images/1.gif';

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
  }

  // Range slider: drag.  but I trigger it without press the element
  onMouseDown = e => {
    this.setState({ drag: 1 });
    // this._onMouseMove(e);
    const element = document.getElementById('myRange');
    const rect = element.getBoundingClientRect();

    const spaceToLeft = e.clientX - rect.left + 7;
    const ulWidth = document.getElementById('myRange').clientWidth;
    if (spaceToLeft < 0 || spaceToLeft > ulWidth || spaceToLeft === 0) {
      return;
    }

    // const liWidth = document.getElementById('one').clientWidth;
    // var ulWidth = rect.right - rect.left - 40
    const score = (spaceToLeft / ulWidth) * 5;
    const level = Math.ceil(score);
    this.refs.score.value = level;

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

    // console.log('MouseDown _onMouseMove');
  };
  onMouseUp = () => {
    this.setState({ drag: 0 });
  };
  onMouseLeave = e => {
    this.setState({ drag: 0 });
  };

  onTouchMove = e => {
    // var output = document.getElementById('show');
    // output.innerHTML = e.touches[0].clientX;

    // slider.oninput = function() {
    //   output.innerHTML = this.value;
    // };

    const element = document.getElementById('myRange');
    const rect = element.getBoundingClientRect();

    const spaceToLeft = e.touches[0].clientX - rect.left + 7;
    const ulWidth = document.getElementById('myRange').clientWidth;
    if (spaceToLeft < 0 || spaceToLeft > ulWidth || spaceToLeft === 0) {
      return;
    }

    // const liWidth = document.getElementById('one').clientWidth;
    // var ulWidth = rect.right - rect.left - 40
    const score = (spaceToLeft / ulWidth) * 5;
    const level = Math.ceil(score);
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

  _onMouseMove = e => {
    if (this.state.drag === 0) {
      return;
    }
    const element = document.getElementById('myRange');
    // console.log('element ' + element);
    const rect = element.getBoundingClientRect();

    const spaceToLeft = e.clientX - rect.left + 7;
    const ulWidth = document.getElementById('myRange').clientWidth;
    if (spaceToLeft < 0 || spaceToLeft > ulWidth || spaceToLeft === 0) {
      return;
    }

    // const liWidth = document.getElementById('one').clientWidth;
    // var ulWidth = rect.right - rect.left - 40
    const score = (spaceToLeft / ulWidth) * 5;
    const level = Math.ceil(score);
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

  handleClick = e => {
    // var slider = document.getElementById('myRange');
    const element = document.getElementById('myRange');
    const rect = element.getBoundingClientRect();

    const spaceToLeft = e.clientX - rect.left + 7;
    const ulWidth = document.getElementById('myRange').clientWidth;
    if (spaceToLeft < 0 || spaceToLeft > ulWidth || spaceToLeft === 0) {
      return;
    }

    // const liWidth = document.getElementById('one').clientWidth;
    // var ulWidth = rect.right - rect.left - 40
    const score = (spaceToLeft / ulWidth) * 5;
    const level = Math.ceil(score);
    this.refs.score.value = level;

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
    // this.refs.score.value =
    // this.props.sendData = this.state.value;
  };

  // const returnValue = {}
  render() {
    const styles1 = {
      width: this.state.value === 1 ? '60px' : '41px',
      height: this.state.value === 1 ? '60px' : '40px',
      left: this.state.value === 1 ? '-3px' : '10px',
      border: this.state.value === 1 ? '5px solid rgb(255, 230, 0)' : 0,
      top: this.state.top[0]
    };
    const styles2 = {
      width: this.state.value === 2 ? '60px' : '41px',
      height: this.state.value === 2 ? '60px' : '40px',
      left: this.state.value === 2 ? '-3px' : '10px',
      border: this.state.value === 2 ? '5px solid rgb(255, 230, 0)' : 0,
      top: this.state.top[1]
    };
    const styles3 = {
      width: this.state.value === 3 ? '60px' : '41px',
      height: this.state.value === 3 ? '60px' : '40px',
      left: this.state.value === 3 ? '-3px' : '10px',
      border: this.state.value === 3 ? '5px solid rgb(255, 230, 0)' : 0,
      top: this.state.top[2]
    };
    const styles4 = {
      width: this.state.value === 4 ? '60px' : '41px',
      height: this.state.value === 4 ? '60px' : '40px',
      left: this.state.value === 4 ? '-3px' : '10px',
      border: this.state.value === 4 ? '5px solid rgb(255, 230, 0)' : 0,
      top: this.state.top[3]
    };
    const styles5 = {
      width: this.state.value === 5 ? '60px' : '41px',
      height: this.state.value === 5 ? '60px' : '40px',
      left: this.state.value === 5 ? '-3px' : '10px',
      border: this.state.value === 5 ? '5px solid rgb(255, 230, 0)' : 0,
      top: this.state.top[4]
    };

    return (
      <div className={styles.wrapper}>
        {/* return <img src={logo1} alt="Logo" />; */}
        {/* <label className="statement">
          {this.props.question} <span ref="demo">{this.state.value} </span>
        </label> */}
        <label
          className={styles.statement}
          // style={{ border: '1px solid pink' }}
        >
          {this.props.question} <span ref="demo"> </span>
        </label>
        <ul
          // style={{ border: '1px solid red' }}
          className={styles.likert}
          onClick={this.handleClick}
          onChange={this.handleChange}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseLeave={this.onMouseLeave}
          onMouseMove={this._onMouseMove}
          onTouchStart={this.onTouchMove}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchMove}
          value={this.state.value}
          id="myRange"
          ref="score"
        >
          <li className={styles.li1}>
            {/* <img src={logo1} alt="Logo" /> */}
            <div id="one" className={styles.one} style={styles1} />
            {/* <img
              src={logo3}
              alt="Logo"
              id="one"
              className={styles.one}
              style={styles1}
            /> */}

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
