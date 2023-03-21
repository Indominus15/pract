'use strict';
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
exports.activate = void 0;
const vscode = require("vscode");
const fs = require("fs");
// @ts-ignore
const settingsJson_1 = require("./settingsJson");
const testView_1 = require("./testView");
function timestamp() {
    return (new Date()).valueOf().toString();
}
function unique5() {
    return Math.random().toString(10).substring(6, 11);
}
function matchLineNumber(m) {
    if (!m) {
        return -1;
    }
    let lines = m[0].split("\n");
    if (lines.length > 1) {
        return lines.length;
    }
    return 1;
}
class PsqlDocumentSymbolProvider {
    provideDocumentSymbols(document, token) {
        return new Promise((resolve, reject) => {
            var aliasName = [];
            var aliasPosition = [];
            var symbols = [];
            var barisTerakhir = document.lineCount;
            for (var i = 0; i < barisTerakhir; i++) {
                let rangeToRead = new vscode.Range(i, 0, barisTerakhir + 1, 0);
                let content = document.getText(rangeToRead);
                let matchContent = content.match(/(( AS )\((?:\(.*\)|[^\(])*\))/i);
                // let matchContent = content.match(/(AS )\(\s*([^]+)\)/)
                if (matchContent) {
                    let barisContent = matchLineNumber(matchContent);
                    aliasPosition.push([i, (i + barisContent - 1)]);
                    aliasName.push(content.match(/\w+(?=\s+AS \()/i)[0]);
                    i += (barisContent - 1);
                }
                // else if (content.match(/(AS )\(([^]+)\)/)) {
                else if (content.match(/( AS )\(([^]+)\)\s(?=SELECT)/i)) {
                    let matchContent = content.match(/( AS )\(([^]+)\)\s(?=SELECT)/i);
                    let barisContent = matchLineNumber(matchContent);
                    aliasPosition.push([i, (i + barisContent - 1)]);
                    aliasName.push(content.match(/\w+(?=\s+AS \()/i)[0]);
                    i += (barisContent - 1);
                    if (content.match(/\w+(?=\s+AS \()/i)[0] == 'target') {
                        console.log("ASd");
                    }
                    // untuk terakhir
                    aliasPosition.push([i += 2, barisTerakhir + 1]);
                    aliasName.push("End Product");
                    i = barisTerakhir;
                }
                else {
                    aliasPosition.push([i += 2, barisTerakhir + 1]);
                    aliasName.push("End Product");
                    i = barisTerakhir;
                }
            }
            for (let i = 0; i < aliasName.length; i++) {
                let tes = new vscode.Range(aliasPosition[i][0], 0, aliasPosition[i][1], 0);
                symbols.push({
                    name: aliasName[i],
                    kind: vscode.SymbolKind.Function,
                    location: new vscode.Location(document.uri, tes)
                });
            }
            for (var i = 0; i < document.lineCount; i++) {
                var line = document.lineAt(i);
                if (line.text.match(/{[^\]\[\r\n]*\}/)) {
                    let hasil = line.text.match(/{[^\]\[\r\n]*\}/);
                    symbols.push({
                        name: hasil[0],
                        kind: vscode.SymbolKind.Key,
                        location: new vscode.Location(document.uri, line.range)
                    });
                }
            }
            resolve(symbols);
        });
    }
}
function activate(context) {
    // // Test View
    // new TaskTreeDataProvider(context);
    const taskTreeDataProvider = new testView_1.TaskTreeDataProvider(context);
    vscode.window.registerTreeDataProvider('testView', taskTreeDataProvider);
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider({ language: "sql" }, new PsqlDocumentSymbolProvider()));
    vscode.debug.onDidChangeActiveDebugSession((e) => {
        if (e == undefined) {
            vscode.window.setStatusBarMessage("$(debug-stop) Debugging is Stopped ...", 2000);
        }
        else {
            vscode.window.setStatusBarMessage("$(debug-start) Debugging is Started ...  $(debug-step-over)", 6000);
        }
    });
    context.subscriptions.push(vscode.commands.registerCommand('arkademy.toggleIndentGuides', () => __awaiter(this, void 0, void 0, function* () {
        var currentState = yield vscode.workspace.getConfiguration('editor');
        yield vscode.workspace.getConfiguration().update('editor.renderIndentGuides', !currentState.renderIndentGuides, vscode.ConfigurationTarget.Global);
        vscode.commands.executeCommand("editor.action.toggleRenderWhitespace");
    })));
    context.subscriptions.push(vscode.commands.registerCommand('arkademy.toggleIndentToSpace', () => __awaiter(this, void 0, void 0, function* () {
        vscode.commands.executeCommand("editor.action.indentationToSpaces");
    })));
    context.subscriptions.push(vscode.commands.registerCommand('arkademy.toggleIndentToTab', () => __awaiter(this, void 0, void 0, function* () {
        vscode.commands.executeCommand("editor.action.indentationToTabs");
    })));
    context.subscriptions.push(vscode.commands.registerCommand('arkademy.toggleBreadcrumb', () => __awaiter(this, void 0, void 0, function* () {
        vscode.commands.executeCommand("breadcrumbs.toggle");
    })));
    context.subscriptions.push(vscode.commands.registerCommand('arkademy.toggleEditorTabs', () => __awaiter(this, void 0, void 0, function* () {
        vscode.commands.executeCommand("workbench.action.toggleTabsVisibility");
    })));
    context.subscriptions.push(vscode.commands.registerCommand('arkademy.openWorkspaceSettings', () => __awaiter(this, void 0, void 0, function* () {
        vscode.commands.executeCommand("workbench.action.openWorkspaceSettings");
    })));
    context.subscriptions.push(vscode.commands.registerCommand('arkademy.openSettingsJson', () => __awaiter(this, void 0, void 0, function* () {
        vscode.commands.executeCommand("workbench.action.openSettingsJson");
    })));
    context.subscriptions.push(vscode.commands.registerCommand('arkademy.openSettingsUi', () => __awaiter(this, void 0, void 0, function* () {
        vscode.commands.executeCommand("workbench.action.openSettings2");
    })));
    context.subscriptions.push(vscode.commands.registerCommand('arkademy.setup_vscode', () => __awaiter(this, void 0, void 0, function* () {
        const dialogOption = yield vscode.window.showQuickPick(["Iya, biar lebih mudah", "Tidak"], {
            placeHolder: 'Anda ingin konfigurasi disesuaikan dengan Trainer ? (Compact Folder, Autosave, Emmet disable, Hide Breadcrumb dan lain2)',
            onDidSelectItem: (dialogOption) => {
                if (dialogOption == "Iya, biar lebih mudah") {
                    vscode.window.showInformationMessage(`Good Choice !!`);
                }
                else {
                    vscode.window.showInformationMessage(`Very Bad Choice !!`);
                }
            }
        });
        if (dialogOption == "Iya, biar lebih mudah") {
            vscode.commands.executeCommand("workbench.action.openSettingsJson");
            for (var key in settingsJson_1.config) {
                var value = settingsJson_1.config[key];
                yield vscode.workspace.getConfiguration().update(key, value, vscode.ConfigurationTarget.Global);
            }
            vscode.window.showInformationMessage("Global Config pada setting.json sudah di-update secara otomatis");
            vscode.window.showInformationMessage("Arkademy Setup sukses");
        }
    })));
    context.subscriptions.push(vscode.commands.registerCommand('arkademy.get_unique_date', () => {
        let editor = vscode.window.activeTextEditor;
        editor.edit(editBuilder => {
            const unique = timestamp() + unique5();
            editBuilder.replace(editor.selection, unique);
        }).then(success => {
            var cursorEndPosition = editor.selection.end;
            editor.selection = new vscode.Selection(cursorEndPosition, cursorEndPosition);
        });
    }));
    let disposable = vscode.commands.registerCommand('arkademy.createLaunchJson', () => __awaiter(this, void 0, void 0, function* () {
        const dialogOption = yield vscode.window.showQuickPick(["Iya, biar lebih mudah", "Tidak"], {
            placeHolder: 'Anda ingin running Odoo dengan Tombol? (Debugging, No Connect Timeout)',
            onDidSelectItem: (dialogOption) => {
                if (dialogOption == "Iya, biar lebih mudah") {
                    vscode.window.showInformationMessage(`Good Choice !!`);
                }
                else {
                    vscode.window.showInformationMessage(`Very Bad Choice !!`);
                }
            }
        });
        if (dialogOption == "Iya, biar lebih mudah") {
            vscode.window.showInformationMessage('New Launch.json is created!');
            if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
                var filePath = vscode.workspace.rootPath || '';
                filePath += '/.vscode';
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                }
                let fileName = filePath + '/launch.json';
                if (!fs.existsSync(fileName)) {
                    fs.createWriteStream(fileName).close();
                    vscode.workspace.openTextDocument(fileName).then((a) => {
                        vscode.window.showTextDocument(a, 1, false).then(e => {
                            e.edit(edit => {
                                edit.insert(new vscode.Position(0, 0), "Odoo ");
                            }).then(success => {
                                console.log(success);
                                vscode.commands.executeCommand("editor.action.triggerSuggest");
                            });
                        });
                    }, (error) => {
                        console.error(error);
                        debugger;
                    });
                }
                else {
                    vscode.workspace.openTextDocument(fileName).then((a) => {
                        vscode.window.showTextDocument(a, 1, false).then(e => {
                        });
                    }, (error) => {
                        console.error(error);
                        debugger;
                    });
                }
            }
        }
    }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map