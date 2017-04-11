const useColors = require('supports-color');
const tty = require('tty');
const ms = require('./ms');

const isatty = tty.isatty(1) && tty.isatty(2);

const window = { width: 75 };

if (isatty) {
  window.width = process.stdout.getWindowSize
    ? process.stdout.getWindowSize(1)[0]
    : tty.getWindowSize()[1];
}

const colors = {
  'total tests': 93,
  pass: 90,
  fail: 31,
  'bright pass': 92,
  'bright fail': 91,
  'bright yellow': 93,
  pending: 36,
  suite: 0,
  'error title': 0,
  'error message': 31,
  'error stack': 90,
  checkmark: 32,
  fast: 90,
  medium: 33,
  slow: 31,
  green: 32,
  light: 90,
  'diff gutter': 90,
  'diff added': 32,
  'diff removed': 31,
};

const symbols = {
  ok: '✓',
  err: '✖',
  dot: '․',
  comma: ',',
  bang: '!',
};

if (process.platform === 'win32') {
  symbols.ok = '\u221A';
  symbols.err = '\u00D7';
  symbols.dot = '.';
}

const color = (type, str) => {
  if (!useColors) {
    return String(str);
  }

  const colorStr = '\u001b[' + colors[type] + 'm' + str + '\u001b[0m';
  return colorStr;
};

const cursor = {
  hide: () => isatty && process.stdout.write('\u001b[?25l'),
  show: () => isatty && process.stdout.write('\u001b[?25h'),
  deleteLine: () => isatty && process.stdout.write('\u001b[2K'),
  beginningOfLine: () => isatty && process.stdout.write('\u001b[0G'),
  CR: function() {
    if (isatty) {
      this.deleteLine();
      this.beginningOfLine();
    } else {
      process.stdout.write('\r');
    }
  },
};

const epilogue = ({
  numPassedTests,
  numFailedTests,
  numPendingTests,
  numTotalTests,
  startTime,
}) => {
  const duration = Date.now() - startTime;
  let fmt;

  console.log();

  fmt = color('total tests', '   %d total') +
    color('light', ' (%s) ');

  console.log(fmt, numTotalTests, ms(duration));

  fmt = color('bright pass', `   ${symbols.ok}`) +
    color('green', ' %d passing');

  console.log(fmt, numPassedTests || 0);

  if (numFailedTests) {
    fmt = color('fail', `   ${symbols.err} %d failing `);
    console.log(fmt, numFailedTests);
  }

  if (numPendingTests) {
    fmt = (color('pending', `   ${symbols.bang}`) + color('pending', ' %d pending'));
    console.log(fmt, numPendingTests);
  }

  console.log();

  if (numTotalTests === numPassedTests) {
    console.log(color('bright pass', `   ${symbols.ok}  All Tests Passed`));
  }
};

/**
 * Prints failure messsages for the reporters to be displayed
 */
function printFailureMessages(results) {
  console.log(color('bright fail', `  ${symbols.err} Failed Tests:`));
  console.log('\n');

  results.testResults.forEach(({failureMessage}) => {
    if (failureMessage) {
      console.log(failureMessage);
    }
  });

  process.stdout.write('\n');
}


module.exports = {
  cursor,
  color,
  symbols,
  colors,
  printFailureMessages,
  window,
  epilogue,
  isatty,
  useColors,
};