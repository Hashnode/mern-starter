import React, { Component, PropTypes } from 'react';

// Import Style
import {
  appMain,
  mainSection,
  sectionHeader,
  sectionRow,
  inputField,
  inputLabel,
  textInput
} from './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { bodyweight: 0, workout: '1', multiplier: 1 };
  }

  onChange = (event) => {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  render() {
    const { state, onChange } = this;
    const { bodyweight=0, workout='1', multiplier=1 } = state;
    const restingCalories = bodyweight * 10;
    const workoutCalories = ((workout === '1') ? 300 : 500) + ((bodyweight > 165) ? 200 : 0);
    const baseCalories = restingCalories && (restingCalories + workoutCalories);
    const newCalories = baseCalories * multiplier;
    return (
      <div className={appMain}>
        <div className={mainSection}>
        <div className={sectionHeader}>Input</div>
          <div className={sectionRow}>
          <div className={inputLabel}>Bodyweight</div>
          <input className={inputField + ' ' + textInput} type='number' name='bodyweight' value={bodyweight || ''} {...{onChange}} />
          </div>
          <div className={sectionRow}>
            <div className={inputLabel}>Workouts</div>
            <select className={inputField} name='workout' value={workout} {...{onChange}}>
              <option value='1'>1 hr</option>
              <option value='2'>2+ hr</option>
            </select>
          </div>
          <div className={sectionRow}>
            <select className={inputField} name='multiplier' value={multiplier} {...{onChange}}>
              <option value={0.75}>Cut/Lose</option>
              <option value={1.00}>Mantain/Lean</option>
              <option value={1.25}>Gain/Elite</option>
            </select>
          </div>
        </div>
        <div className={mainSection}>
          <div className={sectionHeader}>Output</div>
          <div className={sectionRow}> Target calories: {newCalories} </div>
          <div className={sectionRow}>{(newCalories * 0.3 / 4).toFixed(2)} grams of protein</div>
          <div className={sectionRow}>{(newCalories / 10).toFixed(2)} grams of carbs</div>
          <div className={sectionRow}>{(newCalories * 0.3 / 9).toFixed(2)} grams of fat</div>
        </div>
      </div>
    );
  }
}
