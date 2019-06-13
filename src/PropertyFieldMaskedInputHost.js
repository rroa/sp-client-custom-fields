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
 * @file PropertyFieldMaskedInputHost.tsx
 * Renders the controls for PropertyFieldMaskedInput component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
require("office-ui-fabric-react/lib/components/TextField/TextField.scss");
/**
 * @interface
 * MaskedInput control.
 * This control is a fork of the input masking component available on GitHub
 * https://github.com/estelle/input-masking
 * by Estelle Weyl. & Alex Schmitz (c)
 *
 */
var MaskedInput = /** @class */ (function (_super) {
    __extends(MaskedInput, _super);
    function MaskedInput(props) {
        var _this = _super.call(this, props) || this;
        //Binds events
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        //Inits default value
        _this.state = {
            firstLoading: true,
            errorMessage: '',
            value: _this.props.initialValue != null ? _this.props.initialValue : ''
        };
        _this.async = new Utilities_1.Async(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        return _this;
    }
    MaskedInput.prototype.componentDidMount = function () {
        var e = this.refs['inputShell'];
        var event = { target: e };
        this.handleChange(event);
    };
    /**
     * @function
     * Called when the component will unmount
     */
    MaskedInput.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    MaskedInput.prototype.handleChange = function (e) {
        var previousValue = this.state.value;
        e.target.value = this.handleCurrentValue(e);
        this.state.value = e.target.value;
        if (this.state.firstLoading === true && previousValue == '')
            this.state.value = '';
        this.state.firstLoading = false;
        this.setState(this.state);
        this.delayedValidate(e.target.value);
    };
    /**
     * @function
     * Validates the new custom field value
     */
    MaskedInput.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(value);
            return;
        }
        if (this.latestValidateValue === value)
            return;
        this.latestValidateValue = value;
        var result = this.props.onGetErrorMessage(value || '');
        if (result !== undefined) {
            if (typeof result === 'string') {
                if (result === undefined || result === '')
                    this.notifyAfterValidate(value);
                this.state.errorMessage = result;
                this.setState(this.state);
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(value);
                    _this.state.errorMessage = errorMessage;
                    _this.setState(_this.state);
                });
            }
        }
        else {
            this.notifyAfterValidate(value);
        }
    };
    /**
     * @function
     * Notifies the parent Web Part of a property value change
     */
    MaskedInput.prototype.notifyAfterValidate = function (newValue) {
        if (this.props.onChange != null)
            this.props.onChange(newValue);
    };
    MaskedInput.prototype.handleCurrentValue = function (e) {
        var isCharsetPresent = e.target.getAttribute('data-charset'), maskedNumber = 'XMDY', maskedLetter = '_', placeholder = isCharsetPresent || e.target.getAttribute('data-placeholder'), value = e.target.value, l = placeholder.length, newValue = '', i, j, isInt, isLetter, strippedValue, matchesNumber, matchesLetter;
        // strip special characters
        strippedValue = isCharsetPresent ? value.replace(/\W/g, "") : value.replace(/\D/g, "");
        for (i = 0, j = 0; i < l; i++) {
            isInt = !isNaN(parseInt(strippedValue[j]));
            isLetter = strippedValue[j] ? strippedValue[j].match(/[A-Z]/i) : false;
            matchesNumber = (maskedNumber.indexOf(placeholder[i]) >= 0);
            matchesLetter = (maskedLetter.indexOf(placeholder[i]) >= 0);
            if ((matchesNumber && isInt) || (isCharsetPresent && matchesLetter && isLetter)) {
                newValue += strippedValue[j++];
            }
            else if ((!isCharsetPresent && !isInt && matchesNumber) || (isCharsetPresent && ((matchesLetter && !isLetter) || (matchesNumber && !isInt)))) {
                //this.options.onError( e ); // write your own error handling function
                return newValue;
            }
            else {
                newValue += placeholder[i];
            }
            // break if no characters left and the pattern is non-special character
            if (strippedValue[j] == undefined) {
                break;
            }
        }
        if (this.props['data-valid-example']) {
            return this.validateProgress(e, newValue);
        }
        return newValue;
    };
    ;
    MaskedInput.prototype.validateProgress = function (e, value) {
        var validExample = this.props['data-valid-example'], pattern = new RegExp(this.props.pattern), placeholder = e.target.getAttribute('data-placeholder'), l = value.length, testValue = '', i;
        //convert to months
        if ((l == 1) && (placeholder.toUpperCase().substr(0, 2) == 'MM')) {
            if (value > 1 && value < 10) {
                value = '0' + value;
            }
            return value;
        }
        for (i = l; i >= 0; i--) {
            testValue = value + validExample.substr(value.length);
            if (pattern.test(testValue)) {
                return value;
            }
            else {
                value = value.substr(0, value.length - 1);
            }
        }
        return value;
    };
    ;
    MaskedInput.prototype.handleBlur = function (e) {
        var currValue = e.target.value, pattern;
        // if value is empty, remove label parent class
        if (currValue.length == 0) {
            if (e.target.required) {
                this.updateLabelClass(e, "required", true);
                this.handleError(e, 'required');
            }
        }
        else {
            pattern = new RegExp('^' + this.props.pattern + '$');
            if (pattern.test(currValue)) {
                this.updateLabelClass(e, "good", true);
            }
            else {
                this.updateLabelClass(e, "error", true);
                this.handleError(e, 'invalidValue');
            }
        }
    };
    ;
    MaskedInput.prototype.handleFocus = function (e) {
        this.updateLabelClass(e, 'focus', false);
    };
    ;
    MaskedInput.prototype.updateLabelClass = function (e, className, replaceExistingClass) {
        var parentLI = e.target.parentNode.parentNode, pastClasses = ['error', 'required', 'focus', 'good'], i;
        if (replaceExistingClass) {
            for (i = 0; i < pastClasses.length; i++) {
                parentLI.classList.remove(pastClasses[i]);
            }
        }
        parentLI.classList.add(className);
    };
    ;
    MaskedInput.prototype.handleError = function (e, errorMsg) {
        return true;
    };
    ;
    MaskedInput.prototype.render = function () {
        var props = {
            type: (this.props && this.props.type) || '',
            id: this.props.id,
            placeholder: this.props.placeholder,
            className: "masked " + (this.props.className || ''),
            pattern: this.props.pattern,
            maxLength: this.props.pattern.length,
            title: this.props.title,
            label: this.props.label,
            dataCharset: this.props['data-charset'],
            required: this.props.required,
            initialValue: this.props.initialValue,
            disabled: this.props.disabled
        };
        var shellStyle = {
            position: 'relative',
            lineHeight: '1',
        };
        var shellStyleSpan = {
            position: 'absolute',
            left: '12px',
            top: '3px',
            color: '#ccc',
            pointerEvents: 'none',
            fontSize: '16px',
            fontFamily: 'monospace',
            paddingRight: '10px',
            backgroundColor: 'transparent',
            textTransform: 'uppercase'
        };
        var shellStyleSpanI = {
            fontStyle: 'normal',
            color: 'transparent',
            //opacity: '0',
            visibility: 'hidden'
        };
        var inputShell = {
            fontSize: '16px',
            fontFamily: 'monospace',
            paddingRight: '10px',
            backgroundColor: 'transparent',
            textTransform: 'uppercase',
            boxSizing: 'border-box',
            margin: '0',
            boxShadow: 'none',
            border: '1px solid #c8c8c8',
            borderRadius: '0',
            fontWeight: 400,
            color: '#333333',
            height: '32px',
            padding: '0 12px 0 12px',
            width: '100%',
            outline: '0',
            textOverflow: 'ellipsis'
        };
        var placeHolderContent = props.placeholder.substr(this.state.value.length);
        return (React.createElement("div", null,
            React.createElement("span", { style: shellStyle },
                React.createElement("span", { style: shellStyleSpan, "aria-hidden": "true", ref: "spanMask", id: props.id + 'Mask' },
                    React.createElement("i", { style: shellStyleSpanI }, this.state.value),
                    placeHolderContent),
                React.createElement("input", { style: inputShell, id: props.id, ref: "inputShell", disabled: props.disabled, onChange: this.handleChange, onFocus: this.handleFocus, onBlur: this.handleBlur, name: props.id, 
                    //type={props.type}
                    className: props.className, "data-placeholder": props.placeholder, "data-pattern": props.pattern, "aria-required": props.required, "data-charset": props.dataCharset, required: props.required, value: this.state.value, title: props.title })),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", null,
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    ;
    return MaskedInput;
}(React.Component));
/**
 * @class
 * Renders the controls for PropertyFieldMaskedInput component
 */
var PropertyFieldMaskedInputHost = /** @class */ (function (_super) {
    __extends(PropertyFieldMaskedInputHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldMaskedInputHost(props) {
        var _this = _super.call(this, props) || this;
        //Bind the current object to the external called onSelectDate method
        _this.onValueChanged = _this.onValueChanged.bind(_this);
        return _this;
    }
    /**
     * @function
     * Function called when the the text changed
     */
    PropertyFieldMaskedInputHost.prototype.onValueChanged = function (element) {
        //Checks if there is a method to called
        if (this.props.onPropertyChange && element != null) {
            this.props.properties[this.props.targetProperty] = element;
            this.props.onPropertyChange(this.props.targetProperty, this.props.initialValue, element);
            if (!this.props.disableReactivePropertyChanges && this.props.render != null)
                this.props.render();
        }
    };
    /**
     * @function
     * Renders the controls
     */
    PropertyFieldMaskedInputHost.prototype.render = function () {
        //Renders content
        return (React.createElement("div", { style: { marginBottom: '8px' } },
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement(MaskedInput, { id: "tel", type: "tel", disabled: this.props.disabled, placeholder: this.props.placeholder, pattern: this.props.pattern, className: "ms-TextField-field", maxLength: this.props.maxLength, onChange: this.onValueChanged, initialValue: this.props.initialValue, onGetErrorMessage: this.props.onGetErrorMessage, deferredValidationTime: this.props.deferredValidationTime })));
    };
    return PropertyFieldMaskedInputHost;
}(React.Component));
exports.default = PropertyFieldMaskedInputHost;
//# sourceMappingURL=PropertyFieldMaskedInputHost.js.map