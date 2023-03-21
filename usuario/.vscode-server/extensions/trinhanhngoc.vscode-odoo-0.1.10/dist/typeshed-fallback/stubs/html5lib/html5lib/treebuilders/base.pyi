from _typeshed import Incomplete
from typing import Any

Marker: Any
listElementsMap: Any

class Node:
    name: Any
    parent: Any
    value: Any
    attributes: Any
    childNodes: Any
    def __init__(self, name) -> None: ...
    def appendChild(self, node) -> None: ...
    def insertText(self, data, insertBefore: Incomplete | None = ...) -> None: ...
    def insertBefore(self, node, refNode) -> None: ...
    def removeChild(self, node) -> None: ...
    def reparentChildren(self, newParent) -> None: ...
    def cloneNode(self) -> None: ...
    def hasContent(self) -> None: ...

class ActiveFormattingElements(list[Any]):
    def append(self, node) -> None: ...
    def nodesEqual(self, node1, node2): ...

class TreeBuilder:
    documentClass: Any
    elementClass: Any
    commentClass: Any
    doctypeClass: Any
    fragmentClass: Any
    defaultNamespace: str
    def __init__(self, namespaceHTMLElements) -> None: ...
    openElements: Any
    activeFormattingElements: Any
    headPointer: Any
    formPointer: Any
    insertFromTable: bool
    document: Any
    def reset(self) -> None: ...
    def elementInScope(self, target, variant: Incomplete | None = ...): ...
    def reconstructActiveFormattingElements(self) -> None: ...
    def clearActiveFormattingElements(self) -> None: ...
    def elementInActiveFormattingElements(self, name): ...
    def insertRoot(self, token) -> None: ...
    def insertDoctype(self, token) -> None: ...
    def insertComment(self, token, parent: Incomplete | None = ...) -> None: ...
    def createElement(self, token): ...
    def insertElementNormal(self, token): ...
    def insertElementTable(self, token): ...
    def insertText(self, data, parent: Incomplete | None = ...) -> None: ...
    def getTableMisnestedNodePosition(self): ...
    def generateImpliedEndTags(self, exclude: Incomplete | None = ...) -> None: ...
    def getDocument(self): ...
    def getFragment(self): ...
    def testSerializer(self, node) -> None: ...