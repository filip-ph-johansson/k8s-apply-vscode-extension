const vscode = require('vscode');
const k8sApi = require('../kubernetes/api');

const commandHandler = k8sFunc => async context => {
  try {
    const result = await k8sFunc(context.path);

    vscode.window.showInformationMessage(result);
    console.log(result);
  } catch (error) {
    vscode.window.showErrorMessage(error.message);
    console.error(error.message);
  }
};

module.exports = {
  applyCommand: commandHandler(k8sApi.applyFromFile),
  deleteCommand: commandHandler(k8sApi.deleteFromFile)
};
