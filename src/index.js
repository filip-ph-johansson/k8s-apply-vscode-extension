const vscode = require('vscode');
const {
  applyCommand,
  deleteCommand
} = require('./commands');

const activate = (context) => {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.apply', applyCommand),
    vscode.commands.registerCommand('extension.delete', deleteCommand)
  );
};

module.exports = {
  activate
};
