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
 * @file PropertyFieldSortableListHost.tsx
 * Renders the controls for PropertyFieldSortableList component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Checkbox_1 = require("office-ui-fabric-react/lib/Checkbox");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var GuidHelper_1 = require("./GuidHelper");
var PropertyFieldSortableList_1 = require("./PropertyFieldSortableList");
/**
 * @class
 * Renders the controls for PropertyFieldSortableList component
 */
var PropertyFieldSortableListHost = /** @class */ (function (_super) {
    __extends(PropertyFieldSortableListHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldSortableListHost(props) {
        var _this = _super.call(this, props) || this;
        _this._key = GuidHelper_1.default.getGuid();
        _this.onChanged = _this.onChanged.bind(_this);
        _this.state = {
            results: _this.props.items !== undefined ? _this.props.items : [],
            selectedKeys: _this.props.selectedItems !== undefined ? _this.props.selectedItems : [],
            errorMessage: ''
        };
        _this.sortDescending = _this.sortDescending.bind(_this);
        _this.sortAscending = _this.sortAscending.bind(_this);
        _this.async = new Utilities_1.Async(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        _this.initDefaultValue();
        return _this;
    }
    /**
     * Inits the default items checked values
     */
    PropertyFieldSortableListHost.prototype.initDefaultValue = function () {
        if (this.props.selectedItems !== undefined && this.props.selectedItems != null) {
            for (var i = 0; i < this.props.selectedItems.length; i++) {
                var currItem = this.props.selectedItems[i];
                var choice = this.getStateItemFromKey(currItem);
                if (choice != null) {
                    choice.isChecked = true;
                }
            }
        }
    };
    /**
     * Gets the item from key
     * @param key
     */
    PropertyFieldSortableListHost.prototype.getStateItemFromKey = function (key) {
        for (var i = 0; i < this.state.results.length; i++) {
            var currItem = this.state.results[i];
            if (currItem.key === key)
                return currItem;
        }
        return null;
    };
    /**
     * @function
     * Remove a string from the selected keys
     */
    PropertyFieldSortableListHost.prototype.removeSelected = function (element) {
        var res = [];
        for (var i = 0; i < this.state.selectedKeys.length; i++) {
            if (this.state.selectedKeys[i] !== element)
                res.push(this.state.selectedKeys[i]);
        }
        this.state.selectedKeys = res;
        this.getStateItemFromKey(element).isChecked = false;
        this.setState(this.state);
    };
    /**
     * @function
     * Raises when a list has been selected
     */
    PropertyFieldSortableListHost.prototype.onChanged = function (element, isChecked) {
        if (element) {
            var value = element.currentTarget.value;
            if (isChecked === false) {
                this.removeSelected(value);
            }
            else {
                this.getStateItemFromKey(value).isChecked = true;
                this.state.selectedKeys.push(value);
                this.setState(this.state);
            }
            this.delayedValidate(this.state.selectedKeys);
        }
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldSortableListHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.selectedItems, value);
            return;
        }
        var result = this.props.onGetErrorMessage(value || []);
        if (result !== undefined) {
            if (typeof result === 'string') {
                if (result === undefined || result === '')
                    this.notifyAfterValidate(this.props.selectedItems, value);
                this.state.errorMessage = result;
                this.setState(this.state);
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(_this.props.selectedItems, value);
                    _this.state.errorMessage = errorMessage;
                    _this.setState(_this.state);
                });
            }
        }
        else {
            this.notifyAfterValidate(this.props.selectedItems, value);
        }
    };
    /**
     * @function
     * Notifies the parent Web Part of a property value change
     */
    PropertyFieldSortableListHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
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
    PropertyFieldSortableListHost.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    PropertyFieldSortableListHost.prototype.sortDescending = function (elm) {
        var _this = this;
        this.state.results.sort(function (a, b) {
            if (_this.props.sortBy == PropertyFieldSortableList_1.ISortableListOrder.Key) {
                return (a.key > b.key) ? 1 : ((b.key > a.key) ? -1 : 0);
            }
            else {
                return (a.text > b.text) ? 1 : ((b.text > a.text) ? -1 : 0);
            }
        });
        this.setState(this.state);
    };
    PropertyFieldSortableListHost.prototype.sortAscending = function (elm) {
        var _this = this;
        this.state.results.sort(function (a, b) {
            if (_this.props.sortBy == PropertyFieldSortableList_1.ISortableListOrder.Key) {
                return (a.key > b.key) ? -1 : ((b.key > a.key) ? 1 : 0);
            }
            else {
                return (a.text > b.text) ? -1 : ((b.text > a.text) ? 1 : 0);
            }
        });
        this.setState(this.state);
    };
    /**
     * @function
     * Renders the SPListMultiplePicker controls with Office UI  Fabric
     */
    PropertyFieldSortableListHost.prototype.render = function () {
        var _this = this;
        var styleOfLabel = {
            color: this.props.disabled === true ? '#A6A6A6' : 'auto',
            width: '160px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        };
        //Renders content
        return (React.createElement("div", null,
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement("div", { style: { position: 'absolute', right: '0', marginRight: '20px', zIndex: 998 } },
                React.createElement("table", { style: { width: '100%', borderSpacing: 0 } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement(Button_1.IconButton, { iconProps: { iconName: 'ChevronUp' }, onClick: this.sortDescending, disabled: this.props.disabled })),
                            React.createElement("td", null,
                                React.createElement(Button_1.IconButton, { iconProps: { iconName: 'ChevronDown' }, onClick: this.sortAscending, disabled: this.props.disabled })))))),
            this.state.results.map(function (item, index) {
                var uniqueKey = _this.props.targetProperty + '-' + item.key;
                var checked = item.isChecked != null && item.isChecked !== undefined ? item.isChecked : false;
                return (React.createElement("div", { className: "ms-ChoiceField", key: _this._key + '-sortablelistpicker-' + index },
                    React.createElement(Checkbox_1.Checkbox, { checked: checked, disabled: _this.props.disabled, label: item.text, onChange: _this.onChanged, inputProps: { value: item.key } })));
            }),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", { style: { paddingBottom: '8px' } },
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    return PropertyFieldSortableListHost;
}(React.Component));
exports.default = PropertyFieldSortableListHost;
//# sourceMappingURL=PropertyFieldSortableListHost.js.map