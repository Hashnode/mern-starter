/* This was inspired from https://github.com/caljrimmer/isomorphic-redux-app/blob/73e6e7d43ccd41e2eb557a70be79cebc494ee54b/src/common/api/fetchComponentDataBeforeRender.js */
import { stripComments } from './stripComments';
import { sequence } from './promiseUtils';

export function fetchComponentData(store, components, params) {
  const needs = components.reduce((prev, current) => {
    return (current.need || [])
      .concat((current.WrappedComponent && (current.WrappedComponent.need !== current.need) ? current.WrappedComponent.need : []) || [])
      .concat(prev);
  }, []);

  // Test if component "needs" (with comments removed) contain the string "state"
  // if so they are assumed state dependent and must be fetched synchronously with "sequence"
  // Note that we do not need to include last "need" as it will not have anything run before it with "synchronous" fetching
  const needsAreStateDependent = needs.length > 1 && stripComments(needs.slice(0, -1).toString().toLowerCase()).indexOf('state') > -1;

  return needsAreStateDependent ?
         sequence(needs, need => store.dispatch(need(params, store.getState()))) :  // fetch synchronously
         Promise.all(needs.map(need => store.dispatch(need(params))));              // fetch asynchronously
}
