const vscode = require('vscode');
const {
  applyCommand,
  deleteCommand,
  getCommand,
  describeCommand
} = require('./commands');

const activate = (context) => {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.apply', applyCommand),
    vscode.commands.registerCommand('extension.delete', deleteCommand),
    vscode.commands.registerCommand('extension.get', getCommand),
    vscode.commands.registerCommand('extension.describe', describeCommand)
  );
};

module.exports = {
  activate
};
