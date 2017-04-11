# jest-nyan-reporter

<!--Badges Start-->
[![npm version](https://badge.fury.io/js/jest-nyan-reporter.svg)](https://badge.fury.io/js/jest-nyan-reporter)
<!--Badges End-->


Nyan Cat style Custom Reporter for Jest, heavily based on Mocha's fabulous
[Nyan reporter](https://github.com/mochajs/mocha/blob/master/lib/reporters/nyan.js).

![Jest Nyan Reporter Image](https://i.imgur.com/i9BHK8k.png)

## Installation

You can install by typing the following command in terminal.

For **Yarn**
```
yarn add -D jest-nyan-reporter
```

For **NPM**
```
npm --save-dev jest-nyan-reporter
```

### Configure them for your tests

*Note: The configuration pattern for the Jest Testing Framework is experimental and can change in the future, depending on the community's decision. This is a very initial version of the configuration file*

In order to configure the Nyan Reporter, you can add the following configuration in your `package.json` under jest property.

```json
{
  "jest": {
  "reporters": [
      ["jest-nyan-reporter", {
        "suppressErrorReporter": false
      }]
    ]
  }
}
```

**CLI Option to add Reporters is not available currently but maybe in the future**

#### LICENSE

MIT LICENSE. See [LICENSE](LICENSE) for more details. :heart: