const { exec } = require('child_process');
const vscode = require('vscode');

const k8sArgsToString = args => args.join(' ');

const kubectl = (method, args) => {
  return new Promise((resolve, reject) => {
    const formattedArgs = k8sArgsToString(args);
    const command = `kubectl ${method} ${formattedArgs}`;

    vscode.window.showInformationMessage(`Running command: ${command}`);

    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(error || stderr);
      };

      resolve(stdout);
    });
  });
};

const strategies = {
  context: value => `--context=${value}`
};

const optionsToArgs = (options = {}) => {
  return Object.entries(options).reduce((acc, [key, value]) => {
    const strategy = strategies[key];

    if (strategy) {
      acc.push(strategy(value));
    }

    return acc;
  },[]);
};

const applyFromFile = (filePath, options) =>
  kubectl('apply', ['-f', filePath, ...optionsToArgs(options)]);

const deleteFromFile = (filePath, options) =>
  kubectl('delete', ['-f', filePath, ...optionsToArgs(options)]);

const getFromFile = (filePath, options) =>
  kubectl('get', ['-f', filePath, ...optionsToArgs(options), '-o yaml']);

const describeFromFile = (filePath, options) =>
  kubectl('describe', ['-f', filePath, ...optionsToArgs(options)]);

const getContexts = async () => {
  const rawOutput = await kubectl('config', ['get-contexts', '-o name']);
  return rawOutput
    .trim()
    .split('\n');
};

module.exports = {
  applyFromFile,
  deleteFromFile,
  getFromFile,
  describeFromFile,
  getContexts
};
