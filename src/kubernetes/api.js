const { exec } = require('child_process');
const vscode = require('vscode');

const k8sArgsToString = args => args.join(' ');

const kubectl = (method, args) => {
  return new Promise((resolve, reject) => {
    const formattedArgs = k8sArgsToString(args);
    const command = `kubectl ${method} ${formattedArgs}`;

    vscode.window.showInformationMessage(`Running command: ${command}`);

    exec(command, (error, stdout, stderr) => {
      if(error || stderr) {
        reject(error || stderr);
      };

      resolve(stdout);
    });
  });
};

const applyFromFile = async (filePath, args = []) => {
  return await kubectl('apply', ['-f', filePath, ...args])
    .catch(error => { throw error });
};

const deleteFromFile = async (filePath,  args = []) => {
  return await kubectl('delete', ['-f', filePath, ...args])
    .catch(error => { throw error });
};

module.exports = {
  applyFromFile,
  deleteFromFile
}
