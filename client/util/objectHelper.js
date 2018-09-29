
export default function valueOfProperty(item, name) {
  if (item === null || typeof(item) === 'undefined') {
    return '';
  }
  if (item.hasOwnProperty(name)) {
    return item[name];
  }
  return '';
}
