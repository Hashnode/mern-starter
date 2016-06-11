import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedDate, FormattedTime, FormattedRelative, FormattedNumber, FormattedMessage, FormattedPlural, FormattedHTMLMessage } from 'react-intl';
import { switchLanguages } from '../../IntlActions';

export default injectIntl(connect(store => ({
  intl: store.intl,
}))(class LanguageDemoPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.changeLanguage = (o) => {
      const clickedLang = o.target.innerText;
      if (clickedLang !== this.props.intl.locale) this.props.dispatch(switchLanguages(clickedLang));
    };
  }

  render() {
    const dateArr = [
      Date.now() + 1000 * 60 * 60 * 24 * 15,  // fifteenDaysFromNow
      Date.now() + 1000 * 60 * 51,            // tomorrow
      Date.now(),                             // currentDate
      Date.now() - 1000 * 60 * 60 * 24,       // yesterday
      Date.now() - 1000 * 60 * 60 * 24 * 15,  // fifteenDaysAgo
    ];

    const timeArr = [
      Date.now() + 1000 * 60 * 60,            // hourFromNow
      Date.now() + 1000 * 60,                 // minuteFromNow
      Date.now(),                             // now
      Date.now() - 1000 * 60,                 // minuteAgo
      Date.now() - 1000 * 60 * 60,            // hourAgo
    ];

    const numberArr = [
      1,                                      // one
      5,                                      // plural
      3.14152927,                             // decimal
      -4,                                     // negative
      1000000,                                // large
    ];

    const userName = 'Example UserName';

    return (
      <div className="Language-Examples">
        <header className="Language-Toggles">
          {this.props.intl.enabledLanguages.map((languageOption, i) =>
            <button
              key={i}
              style={{ padding: '1px 5px', marginLeft: '5px' }}
              onClick={this.changeLanguage}
            >
              {languageOption}
            </button>
          )}
        </header>

        <h2 style={{ padding: '10px 0 1px', lineHeight: 'inherit' }}>
          Formatted Date
        </h2>
          {
            dateArr.map((date) =>
              <div className="FormattedDate">
                <FormattedDate
                  value={date}
                  day="numeric"
                  month="long"
                  year="numeric"
                />
              </div>
            )
          }

        <h2 style={{ padding: '10px 0 1px', lineHeight: 'inherit' }}>
          Formatted Time
        </h2>
          {
            timeArr.map((time) =>
              <div className="FormattedTime">
                <FormattedTime
                  value={time}
                  hour12
                  hour="numeric"
                  minute="numeric"
                />
              </div>
            )
          }

        <h2 style={{ padding: '10px 0 1px', lineHeight: 'inherit' }}>
          Formatted Relative Date
        </h2>
          {
            dateArr.map((date) =>
              <div className="FormattedRelativeDate">
                <FormattedRelative value={date} />
              </div>
            )
          }

        <h2 style={{ padding: '10px 0 1px', lineHeight: 'inherit' }}>
          Formatted Number
        </h2>
          {
            numberArr.map((number) =>
              <div className="FormattedNumber">
                <FormattedNumber value={number} /> {' '}
              </div>
            )
          }

        <h2 style={{ padding: '10px 0 1px', lineHeight: 'inherit' }}>
          Formatted Plural
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
            (Cant use with different languages, showing just to show full component list)
          </span>
        </h2>
          {
            numberArr.map((_, i) =>
              <div className="FormattedPlural">
                You have {' '}
                <FormattedPlural
                  value={i + 1}
                  one="one message"
                  other="multiple messages"
                />.
              </div>
            )
          }

        <h2 style={{ padding: '10px 0 1px', lineHeight: 'inherit' }}>
          Formatted Message
        </h2>
          {
            numberArr.map((_, i) =>
              <div className="FormattedMessage">
                <FormattedMessage
                  id="comment"
                  defaultMessage="Hello, {name}"
                  values={
                    {
                      name: userName,
                      value: i,
                    }
                  }
                />
              </div>
            )
          }

        <h2 style={{ padding: '10px 0 1px', lineHeight: 'inherit' }}>
          Formatted HTML Message
        </h2>
          {
            numberArr.map((_, i) =>
              <div className="FormattedHTMLMessage">
                <FormattedHTMLMessage
                  id="HTMLComment"
                  defaultMessage="Hello, {name}"
                  values={
                    {
                      name: userName,
                      value: i,
                    }
                  }
                />
              </div>
            )
          }
        <h2 style={{ padding: '10px 0 1px', lineHeight: 'inherit' }}>
          Nested Formatted Message
        </h2>
          {
            numberArr.map((_, i) =>
              <div className="NestedFormattedMessage">
                <FormattedMessage
                  id="nestedDateComment"
                  defaultMessage="Hello, {name}"
                  values={
                    {
                      name: userName,
                      value: i,
                      date: (
                        <FormattedRelative value={dateArr[i]} />
                      ),
                    }
                  }
                />
              </div>
            )
          }
      </div>
    );
  }
}));
