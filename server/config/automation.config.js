
const config = {
  default: {
    appList: ['word','excel','ppt','access']
  },
  local: {},
  development: {},
  production: {}
};

const env = process.env.NODE_ENV || 'development';
module.exports = Object.assign(config['default'], config[env]);
