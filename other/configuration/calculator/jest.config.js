module.exports = {
  // testEnvironment: 'node',
  moduleNameMapper: {
    '\\module.\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock'),
  },
  setupTestFrameworkScriptFile: require.resolve('./test/setup-test-framework'),
}
