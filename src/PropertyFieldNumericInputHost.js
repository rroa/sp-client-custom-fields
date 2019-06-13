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
 * @file PropertyFieldNumericInputHost.tsx
 * Renders the controls for PropertyFieldNumericInput component
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
//import 'office-ui-fabric-react/lib/components/TextField/TextField.scss';
var PropertyFields_module_scss_1 = require("./PropertyFields.module.scss");
var NumericInput = require('react-numeric-input');
/**
 * @class
 * Renders the controls for PropertyFieldNumericInput component
 */
var PropertyFieldNumericInputHost = /** @class */ (function (_super) {
    __extends(PropertyFieldNumericInputHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldNumericInputHost(props) {
        var _this = _super.call(this, props) || this;
        _this.async = new Utilities_1.Async(_this);
        _this.state = { errorMessage: '', currentValue: _this.props.initialValue };
        //Bind the current object to the external called onSelectDate method
        _this.onValueChanged = _this.onValueChanged.bind(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        return _this;
    }
    /**
     * @function
     * Function called when the component value changed
     */
    PropertyFieldNumericInputHost.prototype.onValueChanged = function (value) {
        this.state.currentValue = value;
        this.setState(this.state);
        this.delayedValidate(value);
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldNumericInputHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.initialValue, value);
            return;
        }
        var result = this.props.onGetErrorMessage(value || 0);
        if (result !== undefined) {
            if (typeof result === 'string') {
                if (result === undefined || result === '')
                    this.notifyAfterValidate(this.props.initialValue, value);
                this.setState({ errorMessage: result });
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(_this.props.initialValue, value);
                    _this.setState({ errorMessage: errorMessage });
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
    PropertyFieldNumericInputHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
        this.props.properties[this.props.targetProperty] = newValue;
        this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
        if (!this.props.disableReactivePropertyChanges && this.props.render != null)
            this.props.render();
    };
    /**
     * @function
     * Called when the component will unmount
     */
    PropertyFieldNumericInputHost.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    /**
     * @function
     * Renders the controls
     */
    PropertyFieldNumericInputHost.prototype.render = function () {
        //Renders content
        return (React.createElement("div", { style: { marginBottom: '8px' } },
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement(NumericInput, { className: PropertyFields_module_scss_1.default.customTextField, size: this.props.size, disabled: this.props.disabled, onChange: this.onValueChanged, min: this.props.min, max: this.props.max, value: this.state.currentValue, step: this.props.step, precision: this.props.precision }),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", null,
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    return PropertyFieldNumericInputHost;
}(React.Component));
exports.default = PropertyFieldNumericInputHost;
//# sourceMappingURL=PropertyFieldNumericInputHost.js.map