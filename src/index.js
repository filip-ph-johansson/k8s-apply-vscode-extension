const vscode = require('vscode');
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
    vscode.commands.registerCommand('extension.apply', applyCommand),
    vscode.commands.registerCommand('extension.delete', deleteCommand),
    vscode.commands.registerCommand('extension.get', getCommand),
    vscode.commands.registerCommand('extension.describe', describeCommand),
    vscode.commands.registerCommand('extension.applyWithContext', applyWithContextCommand),
    vscode.commands.registerCommand('extension.deleteWithContext', deleteWithContextCommand),
    vscode.commands.registerCommand('extension.getWithContext', getWithContextCommand),
    vscode.commands.registerCommand('extension.describeWithContext', describeWithContextCommand)
  );
};

module.exports = {
  activate
};
