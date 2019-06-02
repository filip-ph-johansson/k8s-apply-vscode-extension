const {
  commands: {
    registerCommand
  }
} = require('vscode');
const {
  applyCommand,
  deleteCommand,
  getCommand,
  describeCommand,
  applyWithContextCommand,
  deleteWithContextCommand,
  getWithContextCommand,
  describeWithContextCommand
} = require('./commands');

const activate = (context) => {
  context.subscriptions.push(
    registerCommand('extension.apply', applyCommand),
    registerCommand('extension.delete', deleteCommand),
    registerCommand('extension.get', getCommand),
    registerCommand('extension.describe', describeCommand),
    registerCommand('extension.applyWithContext', applyWithContextCommand),
    registerCommand('extension.deleteWithContext', deleteWithContextCommand),
    registerCommand('extension.getWithContext', getWithContextCommand),
    registerCommand('extension.describeWithContext', describeWithContextCommand)
  );
};

module.exports = {
  activate
};
