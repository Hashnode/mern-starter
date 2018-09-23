import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Import Style
import styles from './App.css';

// Import External Components
import Slider, { createSliderWithTooltip } from 'rc-slider';
// import 'rc-slider/assets/index.css';
import sliderStylesIgnored from '!style-loader!css-loader!rc-slider/assets/index.css'; // eslint-disable-unused-import global-require

// Import Components
import Helmet from 'react-helmet';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { FormattedMessage } from 'react-intl';

let DevTools;
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  DevTools = require('./components/DevTools').default;
}

const SliderWithTooltip = createSliderWithTooltip(Slider);
const sliderMarks = { 0: 'very unhappy', 50: 'neutral', 100: 'very happy' };

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="How is it"
            titleTemplate="%s - How is it"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Header
            intl={this.props.intl}
          />
          <div className={styles.container}>

            <div className={styles.inputLabel}>
              {this.props.intl.messages.ownHappiness}
            </div>
            <div className={styles.slideContainer}>
              <SliderWithTooltip marks={sliderMarks} included={false} className={styles.slider} />
            </div>

            <div className={styles.inputLabel}>
              {this.props.intl.messages.teamHappiness}
            </div>
            <div className={styles.slideContainer}>
              <SliderWithTooltip marks={sliderMarks} included={false} className={styles.slider} />
            </div>
            <div>
              <Link to="/teams/"> <FormattedMessage id="teams" /></Link>
            </div>
            <div>
              <Link to="/posts/"> <FormattedMessage id="posts" /></Link>
            </div>
            <div>
              <Link to="/admin"> <FormattedMessage id="admin" /></Link>
            </div>
            {this.props.children}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(App);
