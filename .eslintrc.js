// eslint-disable-next-line import/no-extraneous-dependencies
const { createConfig } = require('@edx/frontend-build');

// module.exports = createConfig('eslint');

module.exports = {
    "rules": {
        "import/no-extraneous-dependencies": [
          "error",
          {"devDependencies": true}
        ]
    },
};