export default {
  path: '*',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./view').default)
    })
  },
  config: {
    header: {
      branding: true,
      navigation: false
    },
    footer: false
  }
};
