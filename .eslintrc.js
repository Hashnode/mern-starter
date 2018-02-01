module.exports = {
  "extends": "airbnb",
  "rules": {
    "react/jsx-filename-extension": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0
  },
  "globals": {
    "document": true,
    "window": true,
    "describe": true,
    "beforeEach": true,
    "test": true,
    "expect": true,
    "module": true
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ]
};
