const vscode = require('vscode');
const k8sApi = require('../kubernetes/api');
const environment = require('../environment');

const commandHandler = (k8sFunc, outputChannel) => async context => {
  try {
    const result = await k8sFunc(context.path);

    vscode.window.showInformationMessage(result);
    outputChannel.append(`${result} \n`);
  } catch (error) {
    const { message } = error;

    vscode.window.showErrorMessage(message);
    outputChannel.append(`${error} \n`);
  }
};

const createCommands = () => {
  const outputChannel = vscode.window.createOutputChannel(environment.OUTPUT_CHANNEL_NAME);

  const commands = {
    applyCommand: commandHandler(k8sApi.applyFromFile, outputChannel),
    deleteCommand: commandHandler(k8sApi.deleteFromFile, outputChannel),
    getCommand: commandHandler(k8sApi.getFromFile, outputChannel),
    describeCommand: commandHandler(k8sApi.describeFromFile, outputChannel)
  };

  return commands;
};

module.exports = createCommands();
