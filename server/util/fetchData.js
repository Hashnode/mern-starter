/* This was inspired from https://github.com/caljrimmer/isomorphic-redux-app/blob/73e6e7d43ccd41e2eb557a70be79cebc494ee54b/src/common/api/fetchComponentDataBeforeRender.js */

export function fetchComponentData(dispatch, components, params) {
  const needs = components.reduce((prev, current) => {
    return (current.need || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.need : []) || [])
      .concat(prev);
  }, []);
  const promises = needs.map(need => dispatch(need(params)));
  return Promise.all(promises);
}
