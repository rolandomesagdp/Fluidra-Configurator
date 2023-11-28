const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

function getCurrentBranch() {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}

function setCoverageThresholdForLines(threshold) {
  const karmaConfigPath = path.join(__dirname, 'karma.conf.js');
  let config = fs.readFileSync(karmaConfigPath, 'utf-8');

  config = config.replace(/(lines):\s*\d+/g, `$1: ${threshold}`);

  fs.writeFileSync(karmaConfigPath, config);
}

const branchName = getCurrentBranch();
let coverageThreshold;

if (branchName === 'development') {
  coverageThreshold = 55;
} else if (branchName.startsWith('main')) {
  coverageThreshold = 75;
} else {
  coverageThreshold = 0;
}

setCoverageThresholdForLines(coverageThreshold);

console.log(coverageThreshold);
