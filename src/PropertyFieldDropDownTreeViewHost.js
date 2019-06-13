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
 * @file PropertyFieldDropDownTreeViewHost.tsx
 * Renders the controls for PropertyFieldDropDownTreeView component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var Checkbox_1 = require("office-ui-fabric-react/lib/Checkbox");
var GuidHelper_1 = require("./GuidHelper");
require('react-ui-tree-draggable/dist/react-ui-tree.css');
var Tree = require('react-ui-tree-draggable/dist/react-ui-tree');
/**
 * @class
 * Renders the controls for PropertyFieldDropDownTreeView component
 */
var PropertyFieldDropDownTreeViewHost = /** @class */ (function (_super) {
    __extends(PropertyFieldDropDownTreeViewHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldDropDownTreeViewHost(props) {
        var _this = _super.call(this, props) || this;
        //Bind the current object to the external called onSelectDate method
        _this.onOpenDialog = _this.onOpenDialog.bind(_this);
        _this.mouseEnterDropDown = _this.mouseEnterDropDown.bind(_this);
        _this.mouseLeaveDropDown = _this.mouseLeaveDropDown.bind(_this);
        _this._key = GuidHelper_1.default.getGuid();
        //Init the state
        _this.state = {
            isOpen: false,
            isHoverDropdown: false,
            errorMessage: '',
            tree: _this.props.tree,
            activeNodes: _this.getDefaultActiveNodesFromTree()
        };
        _this.renderNode = _this.renderNode.bind(_this);
        _this.onClickNode = _this.onClickNode.bind(_this);
        _this.saveSelectedNodes = _this.saveSelectedNodes.bind(_this);
        _this.handleTreeChange = _this.handleTreeChange.bind(_this);
        _this.async = new Utilities_1.Async(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        return _this;
    }
    PropertyFieldDropDownTreeViewHost.prototype.getDefaultActiveNodesFromTree = function () {
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
    PropertyFieldDropDownTreeViewHost.prototype.getDefaultActiveNodes = function (node) {
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
     * Gets the given node position in the active nodes collection
     * @param node
     */
    PropertyFieldDropDownTreeViewHost.prototype.getSelectedNodePosition = function (node) {
        for (var i = 0; i < this.state.activeNodes.length; i++) {
            if (node === this.state.activeNodes[i])
                return i;
        }
        return -1;
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldDropDownTreeViewHost.prototype.validate = function (value) {
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
    PropertyFieldDropDownTreeViewHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
        if (this.props.onPropertyChange && newValue != null) {
            this.props.properties[this.props.targetProperty] = newValue;
            this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
            if (!this.props.disableReactivePropertyChanges && this.props.render != null)
                this.props.render();
        }
    };
    /**
     * @function
     * Called when the component will unmount
     */
    PropertyFieldDropDownTreeViewHost.prototype.componentWillUnmount = function () {
        if (this.async !== undefined)
            this.async.dispose();
    };
    /**
     * @function
     * Function to open the dialog
     */
    PropertyFieldDropDownTreeViewHost.prototype.onOpenDialog = function () {
        if (this.props.disabled === true)
            return;
        this.state.isOpen = !this.state.isOpen;
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is hover the fontpicker
     */
    PropertyFieldDropDownTreeViewHost.prototype.mouseEnterDropDown = function (element) {
        this.state.isHoverDropdown = true;
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is leaving the fontpicker
     */
    PropertyFieldDropDownTreeViewHost.prototype.mouseLeaveDropDown = function (element) {
        this.state.isHoverDropdown = false;
        this.setState(this.state);
    };
    /**
     * clicks on a node
     * @param node
     */
    PropertyFieldDropDownTreeViewHost.prototype.onClickNode = function (node) {
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
    PropertyFieldDropDownTreeViewHost.prototype.saveSelectedNodes = function () {
        var res = [];
        for (var i = 0; i < this.state.activeNodes.length; i++) {
            res.push(this.state.activeNodes[i].id);
        }
        this.delayedValidate(res);
    };
    /**
     * @function
     * Renders the given node
     * @param node
     */
    PropertyFieldDropDownTreeViewHost.prototype.renderNode = function (node) {
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
        return (React.createElement("div", { style: style, onClick: this.onClickNode.bind(null, node), role: "menuitem" },
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
     * Handles tree changes
     * @param rootNode
     * @param index
     */
    PropertyFieldDropDownTreeViewHost.prototype.handleTreeChange = function (rootNode, index) {
        this.state.tree[index] = rootNode;
        this.setState(this.state);
    };
    /**
     * @function
     * Renders the control
     */
    PropertyFieldDropDownTreeViewHost.prototype.render = function () {
        var _this = this;
        //User wants to use the preview font picker, so just build it
        var fontSelect = {
            fontSize: '16px',
            width: '100%',
            position: 'relative',
            display: 'inline-block',
            zoom: 1
        };
        var dropdownColor = '1px solid #c8c8c8';
        if (this.props.disabled === true)
            dropdownColor = '1px solid #f4f4f4';
        else if (this.state.isOpen === true)
            dropdownColor = '1px solid #3091DE';
        else if (this.state.isHoverDropdown === true)
            dropdownColor = '1px solid #767676';
        var fontSelectA = {
            backgroundColor: this.props.disabled === true ? '#f4f4f4' : '#fff',
            borderRadius: '0px',
            backgroundClip: 'padding-box',
            border: dropdownColor,
            display: 'block',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            position: 'relative',
            height: '26px',
            lineHeight: '26px',
            padding: '0 0 0 8px',
            color: this.props.disabled === true ? '#a6a6a6' : '#444',
            textDecoration: 'none',
            cursor: this.props.disabled === true ? 'default' : 'pointer'
        };
        var fontSelectASpan = {
            marginRight: '26px',
            display: 'block',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            lineHeight: '1.8',
            textOverflow: 'ellipsis',
            cursor: this.props.disabled === true ? 'default' : 'pointer',
            fontWeight: 400
        };
        var fontSelectADiv = {
            borderRadius: '0 0px 0px 0',
            backgroundClip: 'padding-box',
            border: '0px',
            position: 'absolute',
            right: '0',
            top: '0',
            display: 'block',
            height: '100%',
            width: '22px'
        };
        var fontSelectADivB = {
            display: 'block',
            width: '100%',
            height: '100%',
            cursor: this.props.disabled === true ? 'default' : 'pointer',
            marginTop: '2px'
        };
        var fsDrop = {
            background: '#fff',
            border: '1px solid #aaa',
            borderTop: '0',
            position: 'absolute',
            top: '29px',
            left: '0',
            width: 'calc(100% - 2px)',
            //boxShadow: '0 4px 5px rgba(0,0,0,.15)',
            zIndex: 999,
            display: this.state.isOpen ? 'block' : 'none'
        };
        var fsResults = {
            margin: '0 4px 4px 0',
            maxHeight: '360px',
            width: 'calc(100% - 4px)',
            padding: '0 0 0 4px',
            position: 'relative',
            overflowX: 'auto',
            overflowY: 'auto'
        };
        var carret = this.state.isOpen ? 'ms-Icon ms-Icon--ChevronUp' : 'ms-Icon ms-Icon--ChevronDown';
        var foundSelected = false;
        //Renders content
        return (React.createElement("div", { style: { marginBottom: '8px' } },
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement("div", { style: fontSelect },
                React.createElement("a", { style: fontSelectA, onClick: this.onOpenDialog, onMouseEnter: this.mouseEnterDropDown, onMouseLeave: this.mouseLeaveDropDown, role: "menuitem" },
                    React.createElement("span", { style: fontSelectASpan }, this.state.activeNodes.map(function (elm, index) {
                        if (index !== undefined && index == 0) {
                            return (React.createElement("span", { key: _this._key + '-spanselect-' + index }, elm.label));
                        }
                        else {
                            return (React.createElement("span", { key: _this._key + '-spanselect-' + index },
                                ", ",
                                elm.label));
                        }
                    })),
                    React.createElement("div", { style: fontSelectADiv },
                        React.createElement("i", { style: fontSelectADivB, className: carret }))),
                React.createElement("div", { style: fsDrop },
                    React.createElement("div", { style: fsResults }, this.state.tree.map(function (rootNode, index) {
                        return (React.createElement(Tree, { paddingLeft: _this.props.nodesPaddingLeft, tree: rootNode, isNodeCollapsed: false, onChange: _this.handleTreeChange.bind(null, rootNode, index), renderNode: _this.renderNode, draggable: false, key: 'rootNode-' + index }));
                    })))),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", null,
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    return PropertyFieldDropDownTreeViewHost;
}(React.Component));
exports.default = PropertyFieldDropDownTreeViewHost;
//# sourceMappingURL=PropertyFieldDropDownTreeViewHost.js.map