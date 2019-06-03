# Lazy-k8s

This extension allows you to run Apply, Delete, Describe and Get operations on your Kubernetes yaml resource definitions with the click of a button.

## Requirements
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) installed

## Usage

Right-click any .yaml-file in the explorer side bar or in the file editor and select which operation you want to perform. If no context is provided Kubectl default context will be used.

To specify which context to use select **..with context** after right-clicking a definition. This will open a quick select menu with the available contexts.

## Output
Kubernetes output and errors will be available in the VS Code output panel by selecting `Lazy k8s` in the dropdown-menu.

## Known Issues


## Release Notes

### 1.0.0

Initial release of the extension.
