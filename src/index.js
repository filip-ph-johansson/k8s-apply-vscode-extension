const vscode = require('vscode');
const { applyCommand } = require('./commands');

const activate = (context) => {
  const apply = vscode.commands.registerCommand('extension.apply', applyCommand);

  context.subscriptions.push(apply);
};

module.exports = {
  activate
};
