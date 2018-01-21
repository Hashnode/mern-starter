import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';

// Import Style
import {
  appMain,
  mainSection,
  sectionHeader,
  sectionRow,
  inputField,
  textInput
} from './App.css';

// // Import Components
// import Helmet from 'react-helmet';
// // import DevTools from './components/DevTools';
// import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';

// // Import Actions
// import { toggleAddPost } from './AppActions';
// import { switchLanguage } from '../../modules/Intl/IntlActions';

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
            Bodyweight <input className={inputField + ' ' + textInput} type='number' name='bodyweight' value={bodyweight || ''} {...{onChange}} />
          </div>
          <div className={sectionRow}>
            Workouts <select className={inputField} name='workout' value={workout} {...{onChange}}>
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
    // // ---> MERN starter
    // return (
    //   <div>
    //     {/* {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />} */}
    //     <div>
    //       <Helmet
    //         title="MERN Starter - Blog App"
    //         titleTemplate="%s - Blog App"
    //         meta={[
    //           { charset: 'utf-8' },
    //           {
    //             'http-equiv': 'X-UA-Compatible',
    //             content: 'IE=edge',
    //           },
    //           {
    //             name: 'viewport',
    //             content: 'width=device-width, initial-scale=1',
    //           },
    //         ]}
    //       />
    //       <Header
    //         switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
    //         intl={this.props.intl}
    //         toggleAddPost={this.toggleAddPostSection}
    //       />
    //       <div className={styles.container}>
    //         {this.props.children}
    //       </div>
    //       <Footer />
    //     </div>
    //   </div>
    // );
  }
}

App.propTypes = {
  // children: PropTypes.object.isRequired,
  // dispatch: PropTypes.func.isRequired,
  // intl: PropTypes.object.isRequired,
};

// // Retrieve data from store as props
// function mapStateToProps(store) {
//   return {
//     intl: store.intl,
//   };
// }

// export default connect(mapStateToProps)(App);
