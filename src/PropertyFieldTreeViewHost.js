"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldTreeViewHost.tsx
 * Renders the controls for PropertyFieldTreeView component
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var Checkbox_1 = require("office-ui-fabric-react/lib/Checkbox");
require('react-ui-tree-draggable/dist/react-ui-tree.css');
var Tree = require('react-ui-tree-draggable/dist/react-ui-tree');
/**
 * @class
 * Renders the controls for PropertyFieldTreeView component
 */
var PropertyFieldTreeViewHost = /** @class */ (function (_super) {
    __extends(PropertyFieldTreeViewHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldTreeViewHost(props) {
        var _this = _super.call(this, props) || this;
        _this.async = new Utilities_1.Async(_this);
        _this.state = {
            errorMessage: '',
            tree: _this.props.tree,
            activeNodes: _this.getDefaultActiveNodesFromTree()
        };
        _this.renderNode = _this.renderNode.bind(_this);
        _this.onClickNode = _this.onClickNode.bind(_this);
        _this.saveSelectedNodes = _this.saveSelectedNodes.bind(_this);
        _this.handleTreeChange = _this.handleTreeChange.bind(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        return _this;
    }
    PropertyFieldTreeViewHost.prototype.getDefaultActiveNodesFromTree = function () {
        var _this = this;
        var res = [];
        this.props.tree.map(function (node) {
            var subTreeViewNodes = _this.getDefaultActiveNodes(node);
            subTreeViewNodes.map(function (subNode) {
                res.push(subNode);
            });
        });
        return res;
    };
    /**
     * @function
     * Gets the list of activated nodes from the  selectedNodesIDs property
     * @param node
     */
    PropertyFieldTreeViewHost.prototype.getDefaultActiveNodes = function (node) {
        var res = [];
        if (node === undefined || node == null || this.props.selectedNodesIDs === undefined || this.props.selectedNodesIDs == null)
            return res;
        if (this.props.selectedNodesIDs.indexOf(node.id) != -1)
            res.push(node);
        if (node.children !== undefined) {
            for (var i = 0; i < node.children.length; i++) {
                var subTreeViewNodes = this.getDefaultActiveNodes(node.children[i]);
                subTreeViewNodes.map(function (subNode) {
                    res.push(subNode);
                });
            }
        }
        return res;
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldTreeViewHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.selectedNodesIDs, value);
            return;
        }
        var result = this.props.onGetErrorMessage(value || []);
        if (result !== undefined) {
            if (typeof result === 'string') {
                if (result === undefined || result === '')
                    this.notifyAfterValidate(this.props.selectedNodesIDs, value);
                this.state.errorMessage = result;
                this.setState(this.state);
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(_this.props.selectedNodesIDs, value);
                    _this.state.errorMessage = errorMessage;
                    _this.setState(_this.state);
                });
            }
        }
        else {
            this.notifyAfterValidate(this.props.selectedNodesIDs, value);
        }
    };
    /**
     * @function
     * Notifies the parent Web Part of a property value change
     */
    PropertyFieldTreeViewHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
        this.props.properties[this.props.targetProperty] = newValue;
        this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
        if (!this.props.disableReactivePropertyChanges && this.props.render != null)
            this.props.render();
    };
    /**
     * @function
     * Called when the component will unmount
     */
    PropertyFieldTreeViewHost.prototype.componentWillUnmount = function () {
        if (this.async !== undefined)
            this.async.dispose();
    };
    /**
     * @function
     * Gets the given node position in the active nodes collection
     * @param node
     */
    PropertyFieldTreeViewHost.prototype.getSelectedNodePosition = function (node) {
        for (var i = 0; i < this.state.activeNodes.length; i++) {
            if (node === this.state.activeNodes[i])
                return i;
        }
        return -1;
    };
    /**
     * @function
     * Renders the given node
     * @param node
     */
    PropertyFieldTreeViewHost.prototype.renderNode = function (node) {
        var style = { padding: '4px 5px', width: '100%', display: 'flex' };
        var selected = this.getSelectedNodePosition(node) != -1;
        if (selected === true) {
            style.backgroundColor = '#EAEAEA';
        }
        var isFolder = false;
        if (node.leaf === false || (node.children !== undefined && node.children.length != 0))
            isFolder = true;
        var checkBoxAvailable = this.props.checkboxEnabled;
        if (this.props.allowFoldersSelections === false && isFolder === true)
            checkBoxAvailable = false;
        var picUrl = '';
        if (selected === true && node.selectedPictureUrl !== undefined)
            picUrl = node.selectedPictureUrl;
        else if (node.collapsed !== true && node.expandedPictureUrl !== undefined)
            picUrl = node.expandedPictureUrl;
        else if (node.pictureUrl !== undefined)
            picUrl = node.pictureUrl;
        return (React.createElement("div", { style: style, onClick: this.onClickNode.bind(null, node), name: node.id, id: node.id, role: "menuitem" },
            checkBoxAvailable ?
                React.createElement("div", { style: { marginRight: '5px' } },
                    " ",
                    React.createElement(Checkbox_1.Checkbox, { checked: selected, disabled: this.props.disabled, label: '', onChange: this.onClickNode.bind(null, node) }))
                : '',
            React.createElement("div", { style: { paddingTop: '7px' } },
                picUrl !== undefined && picUrl != '' ?
                    React.createElement("img", { src: picUrl, width: "18", height: "18", style: { paddingRight: '5px' }, alt: node.label })
                    : '',
                node.label)));
    };
    /**
     * clicks on a node
     * @param node
     */
    PropertyFieldTreeViewHost.prototype.onClickNode = function (node) {
        if (this.props.allowFoldersSelections === false && (node.children !== undefined && node.children.length != 0))
            return;
        if (this.props.allowMultipleSelections === false) {
            this.state.activeNodes = [node];
        }
        else {
            var index = this.getSelectedNodePosition(node);
            if (index != -1)
                this.state.activeNodes.splice(index, 1);
            else
                this.state.activeNodes.push(node);
        }
        this.setState(this.state);
        this.saveSelectedNodes();
    };
    /**
     * Saves the selected nodes
     */
    PropertyFieldTreeViewHost.prototype.saveSelectedNodes = function () {
        var res = [];
        for (var i = 0; i < this.state.activeNodes.length; i++) {
            res.push(this.state.activeNodes[i].id);
        }
        this.delayedValidate(res);
    };
    /**
     * Handles tree changes
     * @param rootNode
     * @param index
     */
    PropertyFieldTreeViewHost.prototype.handleTreeChange = function (rootNode, index) {
        this.state.tree[index] = rootNode;
        this.setState(this.state);
    };
    /**
     * @function
     * Renders the controls
     */
    PropertyFieldTreeViewHost.prototype.render = function () {
        var _this = this;
        //Renders content
        return (React.createElement("div", { style: { marginBottom: '8px' } },
            React.createElement(Label_1.Label, null, this.props.label),
            this.state.tree.map(function (rootNode, index) {
                return (React.createElement(Tree, { paddingLeft: _this.props.nodesPaddingLeft, tree: rootNode, isNodeCollapsed: false, onChange: _this.handleTreeChange.bind(null, rootNode, index), renderNode: _this.renderNode, draggable: false, key: 'rootNode-' + index }));
            }),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", null,
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    return PropertyFieldTreeViewHost;
}(React.Component));
exports.default = PropertyFieldTreeViewHost;
//# sourceMappingURL=PropertyFieldTreeViewHost.js.map