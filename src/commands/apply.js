const vscode = require('vscode');

const applyCommand = (context) => {
  console.log(context);

  vscode.window.showInformationMessage(context);
};

module.exports = applyCommand;
