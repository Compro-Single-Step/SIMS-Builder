const config = {
  default: {
    apps: {
      list: ['word', 'excel', 'ppt', 'access'],
      isValid: isValidApp
    }
  },
  local: {},
  development: {},
  production: {}
};

const env = process.env.NODE_ENV || 'development';
module.exports = Object.assign(config['default'], config[env]);

/**
 * Config Helpers
 */

function isValidApp(appType) {
  if (appType) {
    appType = appType.trim().toLowerCase();
  }
  return this.list.includes(appType);
}
