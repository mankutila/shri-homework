module.exports = {
  "extends": ["eslint:recommended", "react"],
  "rules": {
    "indent": ["error", 2],
    "space-before-function-paren": ["error", "never"],
    "react/sort-comp": [0]
  },
  "env": {
    "jest": true,
    "browser": true,
    "node": true
  }
};