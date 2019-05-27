const vscode = require('vscode');

const activate = (context) => {
  const applyCommand = vscode.commands.registerCommand('extension.apply', (stuff) => {
    console.log(stuff);

		vscode.window.showInformationMessage(stuff);
  });

  context.subscriptions.push(applyCommand);
};

const deactivate = () => {};

module.exports = {
  activate,
  deactivate
};
