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

const applyFromFile = (filePath, args = []) =>
  kubectl('apply', ['-f', filePath, ...args]);

const deleteFromFile = (filePath,  args = []) =>
  kubectl('delete', ['-f', filePath, ...args]);

const getFromFile = (filePath, args = []) =>
  kubectl('get', ['-f', filePath, ...args, '-o', 'yaml']);

const describeFromFile = (filePath, args = []) =>
  kubectl('describe', ['-f', filePath, ...args]);

module.exports = {
  applyFromFile,
  deleteFromFile,
  getFromFile,
  describeFromFile
};
