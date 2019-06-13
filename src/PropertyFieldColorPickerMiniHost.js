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
 * @file PropertyFieldColorPickerMiniHost.tsx
 * Renders the controls for PropertyFieldColorPickerMini component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ColorPicker_1 = require("office-ui-fabric-react/lib/ColorPicker");
var Callout_1 = require("office-ui-fabric-react/lib/Callout");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
/**
 * @class
 * Renders the controls for PropertyFieldColorPickerMini component
 */
var PropertyFieldColorPickerMiniHost = /** @class */ (function (_super) {
    __extends(PropertyFieldColorPickerMiniHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldColorPickerMiniHost(props) {
        var _this = _super.call(this, props) || this;
        //Inits state
        var defaultColor = '#FFFFFF';
        if (_this.props.initialColor && _this.props.initialColor != '')
            defaultColor = _this.props.initialColor;
        _this.state = {
            color: defaultColor,
            calloutVisible: false,
            isHover: false,
            errorMessage: ''
        };
        _this.onClickButton = _this.onClickButton.bind(_this);
        _this.onMouseEnterButton = _this.onMouseEnterButton.bind(_this);
        _this.onMouseLeaveButton = _this.onMouseLeaveButton.bind(_this);
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
    PropertyFieldColorPickerMiniHost.prototype.onColorChanged = function (color) {
        this.state.color = color;
        this.setState(this.state);
        this.delayedValidate(color);
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldColorPickerMiniHost.prototype.validate = function (value) {
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
    PropertyFieldColorPickerMiniHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
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
    PropertyFieldColorPickerMiniHost.prototype.componentWillUnmount = function () {
        if (this.async !== undefined)
            this.async.dispose();
    };
    /**
     * @function
     * Called when the color button is clicked
     */
    PropertyFieldColorPickerMiniHost.prototype.onClickButton = function () {
        if (this.props.disabled === true)
            return;
        this.state.calloutVisible = !this.state.calloutVisible;
        this.setState(this.state);
    };
    PropertyFieldColorPickerMiniHost.prototype.onMouseEnterButton = function () {
        if (this.props.disabled === true)
            return;
        this.state.isHover = true;
        this.setState(this.state);
    };
    PropertyFieldColorPickerMiniHost.prototype.onMouseLeaveButton = function () {
        if (this.props.disabled === true)
            return;
        this.state.isHover = false;
        this.setState(this.state);
    };
    /**
     * @function
     * Renders the control
     */
    PropertyFieldColorPickerMiniHost.prototype.render = function () {
        var _this = this;
        //Renders content
        return (React.createElement("div", null,
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement("div", { ref: function (menuButton) { return _this.menuButtonElement = menuButton; }, style: { width: '70px', height: '35px',
                    backgroundColor: this.state.isHover ? '#eaeaea' : '#F4F4F4',
                    padding: '6px',
                    cursor: this.props.disabled === true ? 'default' : 'pointer',
                    borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }, onClick: this.onClickButton, onMouseEnter: this.onMouseEnterButton, onMouseLeave: this.onMouseLeaveButton, role: "button" },
                React.createElement("div", { style: { width: '100%', height: '100%', backgroundColor: this.state.color } })),
            this.state.calloutVisible && (React.createElement(Callout_1.Callout, { className: 'ms-CalloutExample-callout', gapSpace: 0, targetElement: this.menuButtonElement, setInitialFocus: true, onDismiss: this.onClickButton },
                React.createElement(ColorPicker_1.ColorPicker, { color: this.state.color, onColorChanged: this.onColorChanged }))),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", { style: { paddingBottom: '8px' } },
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    return PropertyFieldColorPickerMiniHost;
}(React.Component));
exports.default = PropertyFieldColorPickerMiniHost;
//# sourceMappingURL=PropertyFieldColorPickerMiniHost.js.map