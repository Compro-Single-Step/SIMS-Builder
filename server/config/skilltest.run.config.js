const config = {

  default: {

    "defaults": {
      "environment": "hub",
      "client": "aws_test_client",
      "browser": "chrome",
      "os": "WINDOWS",
      "brversion": "ANY",
      "screenresolution": "1600x900"
    },
    "options": {
      "environment": [
        {
          "label": "Local Grid",
          "key": "hub"
        },
        {
          "label": "Saucelabs",
          "key": "saucelabs"
        }
      ],
      "os": {
        "hub": [
          {
            "label": "Windows",
            "key": "WINDOWS"
          }
        ],
        "saucelabs": [
          {
            "label": "Windows 7",
            "key": "WINDOWS"
          },
          {
            "label": "Windows 10",
            "key": "WIN10"
          },
          {
            "label": "Windows 8",
            "key": "WIN8"
          },
          {
            "label": "Windows 8.1",
            "key": "WIN8_1"
          },
          {
            "label": "Mac",
            "key": "MAC"
          }
        ]
      },
      "browser": {
        "WINDOWS": [
          {
            "label": "Chrome",
            "key": "chrome"
          },
          {
            "label": "Firefox",
            "key": "firefox"
          },
          {
            "label": "Internet Explorer",
            "key": "ieexplorer"
          }
        ],
        "WIN8": [
          {
            "label": "Chrome",
            "key": "chrome"
          },
          {
            "label": "Firefox",
            "key": "firefox"
          },
          {
            "label": "Internet Explorer",
            "key": "ieexplorer"
          }
        ],
        "WIN8_1": [
          {
            "label": "Chrome",
            "key": "chrome"
          },
          {
            "label": "Firefox",
            "key": "firefox"
          },
          {
            "label": "Internet Explorer",
            "key": "ieexplorer"
          }
        ],
        "WIN10": [
          {
            "label": "Chrome",
            "key": "chrome"
          },
          {
            "label": "Firefox",
            "key": "firefox"
          },
          {
            "label": "Internet Explorer",
            "key": "ieexplorer"
          }
        ],
        "MAC": [
          {
            "label": "Chrome",
            "key": "chrome"
          },
          {
            "label": "Firefox",
            "key": "firefox"
          },
          {
            "label": "Safari",
            "key": "safari"
          }
        ]
      }

    }


  },
  local: {},
  development: {},
  production: {}
};

const env = process.env.NODE_ENV || 'development';
module.exports = Object.assign(config['default'], config[env]);
