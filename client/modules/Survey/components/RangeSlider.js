import React, { Component } from 'react';
import styles from './HappinessSurveyWidget.css';
// import logo1 from './images/1.gif';

class RangeSlider extends Component {
  // state initialization in constructor
  constructor(props) {
    super(props); // call parent method

    // const tempTop = ['-11px', '-11px', '-11px', '-11px', '-11px'];
    // tempTop[this.props.value - 1] = '-42px';
    // console.log('tempTop: ', tempTop);

    this.state = {
      value: props.value,
      drag: 0
      // top: tempTop
    };

    // console.log('Top: ', this.state.top);
    // constructor won't implement after re-render
    // this.handleChange = this.handleChange.bind(this);
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
    this.setState({
      value: level
    });

    this.props.happyValue(level);

    // console.log('MouseDown _onMouseMove');
  };
  onMouseUp = () => {
    this.setState({ drag: 0 });
  };
  onMouseLeave = e => {
    this.setState({ drag: 0 });
  };

  onTouchMove = e => {
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
    this.setState({
      value: level
    });

    this.props.happyValue(level);
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
    // this.refs.score.value = level;
    this.setState({
      value: level
    });
    this.props.happyValue(level);
  };

  handleClick = e => {
    const element = document.getElementById('myRange');
    const rect = element.getBoundingClientRect();

    const spaceToLeft = e.clientX - rect.left + 7;
    const ulWidth = document.getElementById('myRange').clientWidth;
    if (spaceToLeft < 0 || spaceToLeft > ulWidth || spaceToLeft === 0) {
      return;
    }

    const score = (spaceToLeft / ulWidth) * 5;
    const level = Math.ceil(score);
    this.setState({
      value: level
    });

    // this.props.happyValue(this.refs.score.value);
    this.props.happyValue(level);
  };

  // const returnValue = {}
  render() {
    // console.log('render in ', this.props.question);
    // https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
    // this.setState((state, props) => ({
    //   value: props.submit ? props.value : state.value
    // }));
    // Wrong for dynamic update props.value from parent component
    const level = this.props.submit ? this.props.value : this.state.value;
    const tempTop1 = ['-11px', '-11px', '-13px', '-11px', '-11px'];
    tempTop1[level - 1] = '-42px';

    const styles1 = {
      width: level === 1 ? '60px' : '41px',
      height: level === 1 ? '60px' : '40px',
      left: level === 1 ? '-3px' : '10px',
      border: level === 1 ? '5px solid rgb(255, 230, 0)' : 0,
      // top: this.state.top[0]
      top: tempTop1[0]
    };
    const styles2 = {
      width: level === 2 ? '60px' : '41px',
      height: level === 2 ? '60px' : '40px',
      left: level === 2 ? '-3px' : '10px',
      border: level === 2 ? '5px solid rgb(255, 230, 0)' : 0,
      top: tempTop1[1]
    };
    const styles3 = {
      width: level === 3 ? '60px' : '41px',
      height: level === 3 ? '60px' : '40px',
      left: level === 3 ? '-3px' : '10px',
      border: level === 3 ? '5px solid rgb(255, 230, 0)' : 0,
      top: tempTop1[2]
    };
    const styles4 = {
      width: level === 4 ? '60px' : '41px',
      height: level === 4 ? '60px' : '40px',
      left: level === 4 ? '-3px' : '10px',
      border: level === 4 ? '5px solid rgb(255, 230, 0)' : 0,
      top: tempTop1[3]
    };
    const styles5 = {
      width: level === 5 ? '60px' : '41px',
      height: level === 5 ? '60px' : '40px',
      left: level === 5 ? '-3px' : '10px',
      border: level === 5 ? '5px solid rgb(255, 230, 0)' : 0,
      top: tempTop1[4]
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
          // onChange={this.handleChange}
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
