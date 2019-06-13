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
 * @file PropertyFieldColorPickerHost.tsx
 * Renders the controls for PropertyFieldColorPicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ColorPicker_1 = require("office-ui-fabric-react/lib/ColorPicker");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
/**
 * @class
 * Renders the controls for PropertyFieldColorPicker component
 */
var PropertyFieldColorPickerHost = /** @class */ (function (_super) {
    __extends(PropertyFieldColorPickerHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldColorPickerHost(props) {
        var _this = _super.call(this, props) || this;
        //Inits state
        var defaultColor = '#FFFFFF';
        if (_this.props.initialColor && _this.props.initialColor != '')
            defaultColor = _this.props.initialColor;
        _this.state = {
            color: defaultColor,
            errorMessage: ''
        };
        _this.async = new Utilities_1.Async(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        //Bind the current object to the external called onSelectDate method
        _this.onColorChanged = _this.onColorChanged.bind(_this);
        return _this;
    }
    /**
     * @function
     * Function called when the ColorPicker Office UI Fabric component selected color changed
     */
    PropertyFieldColorPickerHost.prototype.onColorChanged = function (color) {
        this.state.color = color;
        this.setState(this.state);
        this.delayedValidate(color);
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldColorPickerHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.initialColor, value);
            return;
        }
        if (this.latestValidateValue === value)
            return;
        this.latestValidateValue = value;
        var result = this.props.onGetErrorMessage(value || '');
        if (result !== undefined) {
            if (typeof result === 'string') {
                if (result === undefined || result === '')
                    this.notifyAfterValidate(this.props.initialColor, value);
                this.state.errorMessage = result;
                this.setState(this.state);
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(_this.props.initialColor, value);
                    _this.state.errorMessage = errorMessage;
                    _this.setState(_this.state);
                });
            }
        }
        else {
            this.notifyAfterValidate(this.props.initialColor, value);
        }
    };
    /**
     * @function
     * Notifies the parent Web Part of a property value change
     */
    PropertyFieldColorPickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
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
    PropertyFieldColorPickerHost.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    /**
     * @function
     * Renders the control
     */
    PropertyFieldColorPickerHost.prototype.render = function () {
        //Renders content
        return (React.createElement("div", null,
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement(ColorPicker_1.ColorPicker, { color: this.state.color, onColorChanged: this.onColorChanged }),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", { style: { paddingBottom: '8px' } },
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    return PropertyFieldColorPickerHost;
}(React.Component));
exports.default = PropertyFieldColorPickerHost;
//# sourceMappingURL=PropertyFieldColorPickerHost.js.map