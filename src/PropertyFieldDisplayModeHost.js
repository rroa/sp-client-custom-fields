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
 * @file PropertyFieldDisplayModeHost.tsx
 * Renders the controls for PropertyFieldDisplayMode component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var PropertyFields_module_scss_1 = require("./PropertyFields.module.scss");
var GuidHelper_1 = require("./GuidHelper");
/**
 * @class
 * Renders the controls for PropertyFieldDisplayMode component
 */
var PropertyFieldDisplayModeHost = /** @class */ (function (_super) {
    __extends(PropertyFieldDisplayModeHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldDisplayModeHost(props) {
        var _this = _super.call(this, props) || this;
        //Bind the current object to the external called onSelectDate method
        _this.onValueChanged = _this.onValueChanged.bind(_this);
        _this.onClickBullets = _this.onClickBullets.bind(_this);
        _this.onClickTiles = _this.onClickTiles.bind(_this);
        _this.mouseListEnterDropDown = _this.mouseListEnterDropDown.bind(_this);
        _this.mouseListLeaveDropDown = _this.mouseListLeaveDropDown.bind(_this);
        _this.mouseTilesEnterDropDown = _this.mouseTilesEnterDropDown.bind(_this);
        _this.mouseTilesLeaveDropDown = _this.mouseTilesLeaveDropDown.bind(_this);
        _this._key = GuidHelper_1.default.getGuid();
        _this.state = {
            mode: _this.props.initialValue != null && _this.props.initialValue != '' ? _this.props.initialValue : '',
            overList: false, overTiles: false,
            errorMessage: ''
        };
        _this.async = new Utilities_1.Async(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        return _this;
    }
    /**
     * @function
     * Function called when the selected value changed
     */
    PropertyFieldDisplayModeHost.prototype.onValueChanged = function (element, value) {
        this.delayedValidate(value);
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldDisplayModeHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.initialValue, value);
            return;
        }
        if (this.latestValidateValue === value)
            return;
        this.latestValidateValue = value;
        var result = this.props.onGetErrorMessage(value || '');
        if (result !== undefined) {
            if (typeof result === 'string') {
                if (result === undefined || result === '')
                    this.notifyAfterValidate(this.props.initialValue, value);
                this.state.errorMessage = result;
                this.setState(this.state);
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(_this.props.initialValue, value);
                    _this.state.errorMessage = errorMessage;
                    _this.setState(_this.state);
                });
            }
        }
        else {
            this.notifyAfterValidate(this.props.initialValue, value);
        }
    };
    /**
     * @function
     * Notifies the parent Web Part of a property value change
     */
    PropertyFieldDisplayModeHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
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
    PropertyFieldDisplayModeHost.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    PropertyFieldDisplayModeHost.prototype.onClickBullets = function (element) {
        this.state.mode = 'list';
        this.setState(this.state);
        this.onValueChanged(this, this.state.mode);
    };
    PropertyFieldDisplayModeHost.prototype.onClickTiles = function (element) {
        this.state.mode = 'tiles';
        this.setState(this.state);
        this.onValueChanged(this, this.state.mode);
    };
    PropertyFieldDisplayModeHost.prototype.mouseListEnterDropDown = function () {
        if (this.props.disabled === true)
            return;
        this.state.overList = true;
        this.setState(this.state);
    };
    PropertyFieldDisplayModeHost.prototype.mouseListLeaveDropDown = function () {
        if (this.props.disabled === true)
            return;
        this.state.overList = false;
        this.setState(this.state);
    };
    PropertyFieldDisplayModeHost.prototype.mouseTilesEnterDropDown = function () {
        if (this.props.disabled === true)
            return;
        this.state.overTiles = true;
        this.setState(this.state);
    };
    PropertyFieldDisplayModeHost.prototype.mouseTilesLeaveDropDown = function () {
        if (this.props.disabled === true)
            return;
        this.state.overTiles = false;
        this.setState(this.state);
    };
    /**
     * @function
     * Renders the control
     */
    PropertyFieldDisplayModeHost.prototype.render = function () {
        var backgroundTiles = this.state.overTiles ? '#DFDFDF' : '';
        var backgroundLists = this.state.overList ? '#DFDFDF' : '';
        if (this.state.mode == 'list')
            backgroundLists = '#EEEEEE';
        if (this.state.mode == 'tiles')
            backgroundTiles = '#EEEEEE';
        var styleList = PropertyFields_module_scss_1.default['spcfChoiceFieldField'];
        var styleTiles = PropertyFields_module_scss_1.default['spcfChoiceFieldField'];
        if (this.state.mode === 'list')
            styleList += ' is-checked';
        else if (this.state.mode === 'tiles')
            styleTiles += ' is-checked';
        if (this.props.disabled === true) {
            styleList += ' is-disabled';
            styleTiles += ' is-disabled';
        }
        //Renders content
        return (React.createElement("div", { style: { marginBottom: '8px' } },
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement("div", { style: { display: 'inline-flex' } },
                React.createElement("div", { style: { cursor: this.props.disabled === false ? 'pointer' : 'default', width: '100px', marginRight: '30px', paddingLeft: '8px', backgroundColor: backgroundLists }, onMouseEnter: this.mouseListEnterDropDown, onMouseLeave: this.mouseListLeaveDropDown },
                    React.createElement("div", { style: { float: 'left' }, className: PropertyFields_module_scss_1.default['spcfChoiceField'] },
                        React.createElement("input", { id: "bulletRadio-" + this._key, className: PropertyFields_module_scss_1.default['spcfChoiceFieldInput'], onChange: this.onClickBullets, type: "radio", name: "display-mode-" + this._key, role: "radio", disabled: this.props.disabled, defaultChecked: this.state.mode == "list" ? true : false, "aria-checked": this.state.mode == "list" ? true : false, value: "list", style: { cursor: this.props.disabled === false ? 'pointer' : 'default', width: '18px', height: '18px', opacity: 0 } }),
                        React.createElement("label", { htmlFor: "bulletRadio-" + this._key, className: styleList },
                            React.createElement("div", { className: PropertyFields_module_scss_1.default['spcfChoiceFieldInnerField'] },
                                React.createElement("div", { className: PropertyFields_module_scss_1.default['spcfChoiceFieldIconWrapper'] },
                                    React.createElement("i", { className: 'ms-Icon ms-Icon--List', "aria-hidden": "true", style: { cursor: this.props.disabled === false ? 'pointer' : 'default', fontSize: '60px', paddingLeft: '30px', color: this.props.disabled === false ? '#808080' : '#A6A6A6' } })))))),
                React.createElement("div", { style: { cursor: this.props.disabled === false ? 'pointer' : 'default', width: '100px', marginRight: '30px', paddingLeft: '8px', backgroundColor: backgroundTiles }, onMouseEnter: this.mouseTilesEnterDropDown, onMouseLeave: this.mouseTilesLeaveDropDown },
                    React.createElement("div", { style: { float: 'left' }, className: PropertyFields_module_scss_1.default['spcfChoiceField'] },
                        React.createElement("input", { id: "tilesRadio-" + this._key, className: PropertyFields_module_scss_1.default['spcfChoiceFieldInput'], onChange: this.onClickTiles, type: "radio", name: "display-mode-" + this._key, role: "radio", disabled: this.props.disabled, defaultChecked: this.state.mode == "tiles" ? true : false, "aria-checked": this.state.mode == "tiles" ? true : false, value: "tiles", style: { cursor: this.props.disabled === false ? 'pointer' : 'default', width: '18px', height: '18px', opacity: 0 } }),
                        React.createElement("label", { htmlFor: "tilesRadio-" + this._key, className: styleTiles },
                            React.createElement("div", { className: PropertyFields_module_scss_1.default['spcfChoiceFieldInnerField'] },
                                React.createElement("div", { className: PropertyFields_module_scss_1.default['spcfChoiceFieldIconWrapper'] },
                                    React.createElement("i", { className: 'ms-Icon ms-Icon--Tiles', "aria-hidden": "true", style: { cursor: this.props.disabled === false ? 'pointer' : 'default', fontSize: '48px', paddingLeft: '30px', color: this.props.disabled === false ? '#808080' : '#A6A6A6' } }))))))),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", null,
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    return PropertyFieldDisplayModeHost;
}(React.Component));
exports.default = PropertyFieldDisplayModeHost;
//# sourceMappingURL=PropertyFieldDisplayModeHost.js.map