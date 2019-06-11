const vscode = require('vscode');
const k8sApi = require('../kubernetes/api');
const environment = require('../environment');

const getK8sContexts = async () => {
  const k8sContexts = await k8sApi.getContexts();
  const selectedContext = await vscode.window.showQuickPick(k8sContexts
    .map(context => ({
      description: context.isCurrent && 'current' || '',
      label: context.context
    })));

  return selectedContext && selectedContext.label || null;
};

const commandHandler = (k8sFunc, output, withContext) => async commandContext => {
  try {
    const options = {};
    const context = withContext && await getK8sContexts();

    if (context) {
      options.context = context;
    } else if (withContext) {
      return;
    }

    const result = await k8sFunc(commandContext.path, options, output);

    vscode.window.showInformationMessage(result);
    output(result);
  } catch (error) {
    const { message } = error;

    vscode.window.showErrorMessage(message);
    output(message);
  }
};

const selectContext = output => async () => {
  try {
    const context = await getK8sContexts();

    if (!context) {
      return;
    }

    const result = await k8sApi.useContext(context, output);

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
    describeWithContextCommand: commandHandler(k8sApi.describeFromFile, writeToOutput, true),
    selectContext: selectContext(writeToOutput)
  };

  return commands;
};

module.exports = createCommands();
