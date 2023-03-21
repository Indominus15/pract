"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskTreeDataProvider = void 0;
const vscode = require("vscode");
class TaskTreeDataProvider {
    constructor(context) {
        this.context = context;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.autoRefresh = true;
        this.autoRefresh = vscode.workspace.getConfiguration('taskOutline').get('autorefresh');
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getChildren(task) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskNames = [];
            if (true) {
                for (var i = 0; i < 1; i++) {
                    taskNames[i] = new TreeTask("npm", "Setup Config", vscode.TreeItemCollapsibleState.None, {
                        command: 'arkademy.setup_vscode', title: "Execute"
                    });
                }
            }
            taskNames.push(new TreeTask("npm", "Setup Launch Json", vscode.TreeItemCollapsibleState.None, {
                title: "Execute",
                command: "arkademy.createLaunchJson",
            }));
            return taskNames;
        });
    }
    getTreeItem(task) {
        return task;
    }
}
exports.TaskTreeDataProvider = TaskTreeDataProvider;
class TreeTask extends vscode.TreeItem {
    constructor(type, label, collapsibleState, command) {
        super(label, collapsibleState);
        this.type = type;
        this.command = command;
    }
}
//# sourceMappingURL=testView.js.map