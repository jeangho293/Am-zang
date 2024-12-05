module.exports = {
  extends: ['anogle-front'],
  rules: {
    'no-param-reassign': 'off',
    'react/no-unstable-nested-components': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  },
};
