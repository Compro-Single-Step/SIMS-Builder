const config = {
  default: {
    apps: {
      list: ['word', 'excel', 'ppt', 'access'],
      isValid: isValidApp
    },
    messages: {
      notFound: {
        error: 'NOT_FOUND',
        status: '404'
      },
      invalidRequest: {

      },
      saveSuccessful: {
        error: 'false',
        status: '200',
        message: 'SAVE_SUCCESSFUL'
      }
    },
    dao: {
      script: 'script',
      template: 'template',
      mapper: 'mapper'
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
