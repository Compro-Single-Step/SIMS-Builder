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
      mapper: 'mapper',
      locator: 'locator',
      linkage : 'linkage'
    },
    script: {
      getBlankScript: getBlankScript
    },
    runner: {
      url: 'http://34.209.150.28',
      runtask : '/sims/runtask'
    }
  },
  local: {
    runner: {
      url: 'http://loadrunner1:9001',
      runtask : '/sims/runtask'
    }
  },
  development: {
    runner: {
      url: 'http://loadrunner1:9001',
      runtask : '/sims/runtask'
    }
  },
  production: {
    runner: {
      url: 'http://34.209.150.28',
      runtask : '/sims/runtask'
    }
  }
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

function getBlankScript(meta) {

  let script = {
    sle_id: (meta.task_id + '.' + meta.scenario),
    version: '1.0',
    task_json: [
      {
        "items": [],
        "appName": "",
        "id": meta.task_id,
        "scenario": meta.scenario
      },
      [
        ["\"1\", \"1\""], "\"Primary\""
      ]
    ]
  };

  return script;
}
