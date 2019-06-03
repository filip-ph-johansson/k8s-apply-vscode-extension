const vscode = require('vscode');
const k8sApi = require('../kubernetes/api');
const environment = require('../environment');

const getK8sContexts = async () => {
  const k8sContexts = await k8sApi.getContexts();
  return await vscode.window.showQuickPick(k8sContexts);
};

const commandHandler = (k8sFunc, output, withContext) => async commandContext => {
  try {
    const options = {};
    const context = withContext && await getK8sContexts();

    if (context) {
      options.context = context;
    }

    const result = await k8sFunc(commandContext.path, options);

    vscode.window.showInformationMessage(result);
    output(result);
  } catch (error) {
    const { message } = error;

    vscode.window.showErrorMessage(message);
    output(message);
  }
};

const createCommands = () => {
  const outputChannel = vscode.window.createOutputChannel(environment.OUTPUT_CHANNEL_NAME);

  const writeToOutput = stringPayload => outputChannel.append(`${stringPayload} \n`);

  const commands = {
    applyCommand: commandHandler(k8sApi.applyFromFile, writeToOutput),
    deleteCommand: commandHandler(k8sApi.deleteFromFile, writeToOutput),
    getCommand: commandHandler(k8sApi.getFromFile, writeToOutput),
    describeCommand: commandHandler(k8sApi.describeFromFile, writeToOutput),
    applyWithContextCommand: commandHandler(k8sApi.applyFromFile, writeToOutput, true),
    deleteWithContextCommand: commandHandler(k8sApi.deleteFromFile, writeToOutput, true),
    getWithContextCommand: commandHandler(k8sApi.getFromFile, writeToOutput, true),
    describeWithContextCommand: commandHandler(k8sApi.describeFromFile, writeToOutput, true)
  };

  return commands;
};

module.exports = createCommands();
