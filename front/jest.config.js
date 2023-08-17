module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
