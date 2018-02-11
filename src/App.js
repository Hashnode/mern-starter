import React, { Component } from 'react';
import './App.css';

export default class App extends Component {

  constructor(props) {
    // -- "props" on a component are like parameters to a function --> their values are (passed down || declared) by the (parent || invoker)
    super(props);
    // -- "state" is an object of variables that a component uses to keep track of itself
    // -- a component's state is local to this instance of the component
    //   -- e.g., if the same component is called multiple times, they each have their own, private state
    this.state = { bodyweight: 0, workout: '1', multiplier: 1 };
    // -- the constructor is the *only* place you can directly assign/mutate this.state
    //   -- all other locations in the component must use the "async-ish" this.setState() function
    //   -- all other locations that do directly mutate this.state may have their changes overwritten and lost
    //     -- as you can imagine, this can lead to some incredibly hard-to-find bugs for those without this knowledge

    // -- ignore following line until you reach `onChange` declaration
    this.onChangeMEH = this.onChangeMEH.bind(this);
  }

  render() {
    const { state, onChange, mapStateToProps } = this;
    // -- in ES5:
    // const state = this.state;
    // const onChange = this.onChange;
    // const mapStateToProps = this.mapStateToProps;
    const { bodyweight, workout, multiplier } = state;
    const { restingCalories, workoutCalories, baseCalories, newCalories } = mapStateToProps(state);
    const immaProp = {mup: ['mlem!']};

    // -- Where the magic happens!
    // -- The thing returned by a `render()` function *must* be either:
    //   -- A single, valid, "JSX" element (JSX refers to the HTML-esque syntax)
    //   -- A "string"
    //   -- A `null`
    return (
      // -- className becomes `class` in the rendered HTML
      //   - because `class` is a reserved word in JavaScript
      <div className='appMain'>
        <div className='mainSection'>
          <div className='sectionHeader'>Input</div>
          <SectionRow>
            <div className='inputLabel'>Bodyweight</div>
            <input className='inputField textInput' type='number' name='bodyweight' value={bodyweight || ''} {...{ onChange }} />
            {/* that freaky `{...{ onChange }}` syntax is equivalent to... `<input onChange={onChange} /> */}
            {/* if there were more same-named variables, it could be `{...{ onChange, value, name }}` */}
          </SectionRow>
          <SectionRow log='This is a prop.'>
            <div className='inputLabel'>Workouts</div>
            <select className='inputField' name='workout' value={workout} {...{ onChange }}>
              <option value='1'>1 hr</option>
              <option value='2'>2+ hr</option>
            </select>
          </SectionRow>
          {/* This `{/*....}` syntax is how all comments must look in JSX */}
          {/* The curly-braces `{}` tell JSX to evaluate its contents as a JavaScript expression,
              allowing the multiline `/*..../` syntax to be recognized as comments */}
          {/* Not even an HTML comment `<!-- .... -->` works */}
          {/* Fortunately, VSCode knows this distinction; press `Ctrl+/` (`CMD+/` on OSX) within JSX and it *knows*. Ooooooooh. */}
          <SectionRow log={immaProp}>
            <select className='inputField' name='multiplier' value={multiplier} {...{ onChange }}>
              <option value={0.75}>Cut/Lose</option>
              <option value={1.00}>Mantain/Lean</option>
              <option value={1.25}>Gain/Elite</option>
            </select>
          </SectionRow>
        </div>
        <div className='mainSection'>
          <div className='sectionHeader'>Output</div>
          <SectionRow>Target calories: {newCalories}</SectionRow>
          <SectionRow>{(newCalories * 0.3 / 4).toFixed(2)} grams of protein</SectionRow>
          <SectionRow>{(newCalories / 10).toFixed(2)} grams of carbs</SectionRow>
          <SectionRow>{(newCalories * 0.3 / 9).toFixed(2)} grams of fat</SectionRow>
        </div>
      </div>
    );
  }
  // --------- End of render function --------- //


  // -- Here, mapStateToProps is an arbitrarily named function like all the rest
  // -- In FL Blue code, mapStateToProps is actually a *Redux* function that injects *Redux state* into your *React props*
  mapStateToProps ({ bodyweight = 0, workout = '1', multiplier = 1 } = {}) {
    const restingCalories = bodyweight * 10;
    const workoutCalories = ((workout === '1') ? 300 : 500) + ((bodyweight > 165) ? 200 : 0);
    const baseCalories = restingCalories && (restingCalories + workoutCalories);
    const newCalories = baseCalories * multiplier;
    return {
      restingCalories,
      workoutCalories,
      baseCalories,
      newCalories
    };
  }

  // -- this is an "event handler"
  // -- the event "target" refers to the DOM element that fired the event
  // -- see this MDN link for documentation on onChange events --> https://developer.mozilla.org/en-US/docs/Web/Events/change
  // -- other typical event handlers: onClick, onMouseOver, onKeyDown
  //   -- note: in HTML, these attributes are *not* camelcased, they are all lowercased (e.g., <input onchange=.../>)
  onChange = (event) => {
    const newState = {};
    // -- this icky Joshua-syntax is so I can reuse the exact same function for all the simple onChanges
    newState[event.target.name] = event.target.value;
    // -- this.setState *merges* the object passed with the existing state object
    this.setState(newState);
    // -- if this.state were directly mutable, this would be equivalent to...
    // this.state = Object.assign(this.state, newState);
  }

  // -- if onChange were a regular class function (as below) instead of an arrow function (as above),
  //   - this.setState would fail because the function declares its own `this` context separate from the component's/class's
  // -- 3 ways around this caveat (in order of *ew* to *neat*)
  //   -- EW:   Manually pass your function a reference to this/this.setState
  //   -- MEH:  Manually bind the proper `this` to the function within the constructor
  //      -- See constructor above for syntax
  //      -- This method gets very out of hand when you have 5+ functions and need to manually bind each and every single one
  //        -- There are components on FL Blue Gitlab that, right now, have 10+ ```this.thing = this.thing.bind(this);```
  //   -- NEAT: Use an arrow function (as above) because arrow functions don't declare a new "this" context,
  //     - and thus automatically retain the `this` of their parent

  onChangeMEH (event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }
}
// --------- End of class declaration --------- //


// -- This is called a "stateless component"
//   -- Officially, it's called a "React Stateless Functional Component (RSFC)" by the developers of React
//   -- Unofficially, it's also called a "dumb component"
// -- It's called that because, obviously, it doesn't have a `state`
//   -- I.E., if you give it the same `props`, it will always return the same exact component
// -- See the following link for a crash course on props.children --> https://codeburst.io/a-quick-intro-to-reacts-props-children-cb3d2fce4891
function SectionRow(props) {
  if (props.log) {
    console.log(props.log);
  }
  return <div className='sectionRow'>{props.children}</div>
}
// const SectionRow = ({children}) => <div className='sectionRow'>{children}</div>
