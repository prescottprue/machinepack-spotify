module.exports = {

  friendlyName: 'Get login URL',
  description: 'Get the URL on Spotify that a user should visit to authorize the specified SoundCloud app (i.e. your app).',
  extendedDescription: 'This is the URL where you typically redirect a user in order for them to grant access to your Spotify app.',
  cacheable: true,

  inputs: {
    clientId: {
      example: 'abc123jdhs3h4js',
      description: 'The unique identifier for your Spotify app. It\'s listed on the application settings page.',
      required: true
    },
    callbackUrl: {
      example: 'https://example.com/callback?code=NApCCg..BkWtQ&state=profile%2Factivity',
      description: 'The URL in your app where users will be sent after authorization.',
      required: true
    },
    responseType: {
      example: ['code'],
      description: '(code, token_and_code)'
    },
    scope: {
      example: 'non-expiring',
      description: 'Must be `*` or `non-expiring`.'
    },
    display: {
      example: 'popup',
      description: 'Can specify a value of `popup` for mobile optimized screen'
    }
  },

  defaultExit: 'success',
  catchallExit: 'error',

  exits: {
    error: {
      description: 'Triggered when the Spotify API returns an error (i.e. a non-2xx status code)'
    },
    success: {
      example: 'https://accounts.spotify.com/authorize/?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09'
    }
  },

  fn: function (inputs, exits) {

    var util = require('util');
    var url = 'https://accounts.spotify.com';
    inputs.scope = inputs.scope || [];

    // Generate a semi-random string to use for the state
    var state = (Math.random() + 1).toString(36).substring(7);

    try {
      return exits.success(util.format(
        'https://accounts.spotify.com/authorize',
        inputs.clientId, inputs.callbackUrl, inputs.responseType, inputs.scope, state
      ));
    }
    catch(e) {
      return exits.error(e);
    }
  }
};
