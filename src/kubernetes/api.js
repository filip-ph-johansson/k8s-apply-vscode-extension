const { exec } = require('child_process');

const k8sArgsToString = args => args.join(' ');

const kubectl = (method, args, output) => {
  return new Promise((resolve, reject) => {
    const formattedArgs = k8sArgsToString(args);
    const command = `kubectl ${method} ${formattedArgs}`;

    output && output(command);

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

const applyFromFile = (filePath, options, output) =>
  kubectl('apply', ['-f', filePath, ...optionsToArgs(options)], output);

const deleteFromFile = (filePath, options, output) =>
  kubectl('delete', ['-f', filePath, ...optionsToArgs(options)], output);

const getFromFile = (filePath, options, output) =>
  kubectl('get', ['-f', filePath, ...optionsToArgs(options), '-o yaml'], output);

const describeFromFile = (filePath, options, output) =>
  kubectl('describe', ['-f', filePath, ...optionsToArgs(options)], output);

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
