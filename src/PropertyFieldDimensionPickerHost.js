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
 * @file PropertyFieldDimensionPickerHost.tsx
 * Renders the controls for PropertyFieldDimensionPicker component
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var Checkbox_1 = require("office-ui-fabric-react/lib/Checkbox");
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
var GuidHelper_1 = require("./GuidHelper");
var strings = require("sp-client-custom-fields/strings");
/**
 * @class
 * Renders the controls for PropertyFieldDimensionPicker component
 */
var PropertyFieldDimensionPickerHost = /** @class */ (function (_super) {
    __extends(PropertyFieldDimensionPickerHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldDimensionPickerHost(props) {
        var _this = _super.call(this, props) || this;
        _this.units = [
            { key: 'px', text: 'px' },
            { key: '%', text: '%' }
        ];
        _this._key = GuidHelper_1.default.getGuid();
        _this.async = new Utilities_1.Async(_this);
        _this.state = {
            errorMessage: '',
            width: 0,
            height: 0,
            widthUnit: 'px',
            heightUnit: 'px',
            conserveRatio: _this.props.preserveRatio
        };
        _this.loadDefaultData();
        //Bind the current object to the external called onSelectDate method
        _this.onWidthChanged = _this.onWidthChanged.bind(_this);
        _this.onHeightChanged = _this.onHeightChanged.bind(_this);
        _this.onWidthUnitChanged = _this.onWidthUnitChanged.bind(_this);
        _this.onHeightUnitChanged = _this.onHeightUnitChanged.bind(_this);
        _this.onRatioChanged = _this.onRatioChanged.bind(_this);
        _this.saveDimension = _this.saveDimension.bind(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        return _this;
    }
    /**
     * @function
     * Function called to load data from the initialValue
     */
    PropertyFieldDimensionPickerHost.prototype.loadDefaultData = function () {
        if (this.props.initialValue != null && this.props.initialValue !== undefined) {
            if (this.props.initialValue.width != null && this.props.initialValue.width !== undefined) {
                if (this.props.initialValue.width.indexOf('px') > -1) {
                    this.state.widthUnit = 'px';
                    this.state.width = Math.round(+this.props.initialValue.width.replace('px', ''));
                }
                else if (this.props.initialValue.height.indexOf('%') > -1) {
                    this.state.widthUnit = '%';
                    this.state.width = Math.round(+this.props.initialValue.width.replace('%', ''));
                }
            }
            if (this.props.initialValue.height != null && this.props.initialValue.height !== undefined) {
                if (this.props.initialValue.height.indexOf('px') > -1) {
                    this.state.heightUnit = 'px';
                    this.state.height = Math.round(+this.props.initialValue.height.replace('px', ''));
                }
                else if (this.props.initialValue.height.indexOf('%') > -1) {
                    this.state.heightUnit = '%';
                    this.state.height = Math.round(+this.props.initialValue.height.replace('%', ''));
                }
            }
        }
    };
    /**
     * @function
     * Function called when the width changed
     */
    PropertyFieldDimensionPickerHost.prototype.onWidthChanged = function (newValue) {
        if (this.state.widthUnit === this.state.heightUnit && this.state.conserveRatio === true && this.props.preserveRatioEnabled === true) {
            if (this.state.width != 0)
                this.state.height = Math.round((this.state.height / this.state.width) * +newValue);
        }
        this.state.width = Math.round(+newValue);
        this.setState(this.state);
        this.saveDimension();
    };
    /**
     * @function
     * Function called when the height changed
     */
    PropertyFieldDimensionPickerHost.prototype.onHeightChanged = function (newValue) {
        if (this.state.widthUnit === this.state.heightUnit && this.state.conserveRatio === true && this.props.preserveRatioEnabled === true) {
            if (this.state.height != 0)
                this.state.width = Math.round((this.state.width / this.state.height) * +newValue);
        }
        this.state.height = Math.round(+newValue);
        this.setState(this.state);
        this.saveDimension();
    };
    /**
     * @function
     * Function called when the width unit changed
     */
    PropertyFieldDimensionPickerHost.prototype.onWidthUnitChanged = function (element) {
        if (element != null) {
            var newValue = element.key.toString();
            this.state.widthUnit = newValue;
            this.setState(this.state);
            this.saveDimension();
        }
    };
    /**
     * @function
     * Function called when the height unit changed
     */
    PropertyFieldDimensionPickerHost.prototype.onHeightUnitChanged = function (element) {
        if (element != null) {
            var newValue = element.key.toString();
            this.state.heightUnit = newValue;
            this.setState(this.state);
            this.saveDimension();
        }
    };
    /**
     * @function
     * Function called when the ratio changed
     */
    PropertyFieldDimensionPickerHost.prototype.onRatioChanged = function (element, isChecked) {
        if (element) {
            this.state.conserveRatio = isChecked;
            this.setState(this.state);
        }
    };
    /**
     * @function
     * Saves the dimension
     */
    PropertyFieldDimensionPickerHost.prototype.saveDimension = function () {
        var dimension = {
            width: this.state.width + this.state.widthUnit,
            height: this.state.height + this.state.heightUnit
        };
        this.delayedValidate(dimension);
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldDimensionPickerHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.initialValue, value);
            return;
        }
        var result = this.props.onGetErrorMessage(value || '');
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
    PropertyFieldDimensionPickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
        this.props.properties[this.props.targetProperty] = newValue;
        this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
        if (!this.props.disableReactivePropertyChanges && this.props.render != null)
            this.props.render();
    };
    /**
     * @function
     * Called when the component will unmount
     */
    PropertyFieldDimensionPickerHost.prototype.componentWillUnmount = function () {
        if (this.async != null)
            this.async.dispose();
    };
    /**
     * @function
     * Renders the controls
     */
    PropertyFieldDimensionPickerHost.prototype.render = function () {
        //Renders content
        return (React.createElement("div", { style: { marginBottom: '8px' } },
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement("table", { style: { paddingTop: '10px' } },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', minWidth: '55px' } },
                            React.createElement(Label_1.Label, { disabled: this.props.disabled }, strings.DimensionWidth)),
                        React.createElement("td", { style: { verticalAlign: 'top', width: '80px' } },
                            React.createElement(TextField_1.TextField, { disabled: this.props.disabled, role: "textbox", "aria-multiline": "false", type: "number", min: '0', value: this.state.width !== undefined ? this.state.width.toString() : '', onChanged: this.onWidthChanged })),
                        React.createElement("td", { style: { verticalAlign: 'top' } },
                            React.createElement(Dropdown_1.Dropdown, { label: "", options: this.units, selectedKey: this.state.widthUnit, disabled: this.props.disabled, onChanged: this.onWidthUnitChanged }))),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', minWidth: '55px' } },
                            React.createElement(Label_1.Label, { disabled: this.props.disabled }, strings.DimensionHeight)),
                        React.createElement("td", { style: { verticalAlign: 'top', width: '80px' } },
                            React.createElement(TextField_1.TextField, { disabled: this.props.disabled, role: "textbox", "aria-multiline": "false", type: "number", min: '0', value: this.state.height !== undefined ? this.state.height.toString() : '', onChanged: this.onHeightChanged })),
                        React.createElement("td", { style: { verticalAlign: 'top' } },
                            React.createElement(Dropdown_1.Dropdown, { label: "", options: this.units, selectedKey: this.state.heightUnit, disabled: this.props.disabled, onChanged: this.onHeightUnitChanged }))),
                    this.props.preserveRatioEnabled === true ?
                        React.createElement("tr", null,
                            React.createElement("td", null),
                            React.createElement("td", { colSpan: 2 },
                                React.createElement("div", { className: "ms-ChoiceField", style: { paddingLeft: '0px' } },
                                    React.createElement(Checkbox_1.Checkbox, { checked: this.state.conserveRatio, disabled: this.props.disabled, label: strings.DimensionRatio, onChange: this.onRatioChanged }))))
                        : '')),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", null,
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    return PropertyFieldDimensionPickerHost;
}(React.Component));
exports.default = PropertyFieldDimensionPickerHost;
//# sourceMappingURL=PropertyFieldDimensionPickerHost.js.map