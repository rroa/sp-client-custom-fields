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
 * @file PropertyFieldAutoCompleteHost.tsx
 * Renders the controls for PropertyFieldAutoComplete component
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
var GuidHelper_1 = require("./GuidHelper");
/**
 * @class
 * Renders the controls for PropertyFieldAutoComplete component
 */
var PropertyFieldAutoCompleteHost = /** @class */ (function (_super) {
    __extends(PropertyFieldAutoCompleteHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldAutoCompleteHost(props) {
        var _this = _super.call(this, props) || this;
        _this.async = new Utilities_1.Async(_this);
        _this.state = {
            scrollPosition: -1,
            shouldAutoComplete: false,
            keyPosition: -1,
            errorMessage: '',
            isOpen: false,
            isHoverDropdown: false,
            hover: '',
            guid: GuidHelper_1.default.getGuid(),
            currentValue: _this.props.initialValue !== undefined ? _this.props.initialValue : '',
            shortCurrentValue: _this.props.initialValue !== undefined ? _this.props.initialValue : '',
            suggestions: _this.props.suggestions
        };
        //Bind the current object to the external called onSelectDate method
        _this.onValueChanged = _this.onValueChanged.bind(_this);
        _this.onOpenDialog = _this.onOpenDialog.bind(_this);
        _this.toggleHover = _this.toggleHover.bind(_this);
        _this.getSuggestions = _this.getSuggestions.bind(_this);
        _this.toggleHoverLeave = _this.toggleHoverLeave.bind(_this);
        _this.onClickItem = _this.onClickItem.bind(_this);
        _this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
        _this.onInputBlur = _this.onInputBlur.bind(_this);
        _this.onInputKeyPress = _this.onInputKeyPress.bind(_this);
        _this.onClickInput = _this.onClickInput.bind(_this);
        _this.mouseEnterDropDown = _this.mouseEnterDropDown.bind(_this);
        _this.mouseLeaveDropDown = _this.mouseLeaveDropDown.bind(_this);
        _this.automaticScroll = _this.automaticScroll.bind(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        return _this;
    }
    /**
     * @function
     * Function called when the component value changed
     */
    PropertyFieldAutoCompleteHost.prototype.onValueChanged = function (newValue) {
        //Checks if there is a method to called
        this.state.shortCurrentValue = newValue;
        this.state.currentValue = newValue;
        this.state.keyPosition = -1;
        this.state.isOpen = true;
        this.state.suggestions = this.getSuggestions(newValue);
        if (this.state.shouldAutoComplete === true) {
            if (this.state.suggestions !== undefined && this.state.suggestions.length > 0) {
                this.state.currentValue = this.state.suggestions[0];
                this.state.keyPosition = 0;
                this.state.shouldAutoComplete = false;
            }
        }
        this.setState(this.state);
        this.delayedValidate(this.state.currentValue);
    };
    PropertyFieldAutoCompleteHost.prototype.componentDidUpdate = function (prevProps, prevState, prevContext) {
        if (this.state.currentValue != this.state.shortCurrentValue && this.state.isOpen === true) {
            //Set cursor position
            this.input.focus();
            this.input.setSelectionStart(this.state.shortCurrentValue.length);
            this.input.setSelectionEnd(this.state.currentValue.length);
            if (this.state.scrollPosition !== -1) {
                var divDrop = document.getElementById("drop-" + this.state.guid);
                divDrop.scrollTop = this.state.scrollPosition;
                this.state.scrollPosition = -1;
            }
        }
    };
    PropertyFieldAutoCompleteHost.prototype.getSuggestions = function (value) {
        if (value == '') {
            return this.props.suggestions;
        }
        var escapeRegexCharacters = function (str) { return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };
        var escapedValue = escapeRegexCharacters(value.trim());
        if (escapedValue === '') {
            return [];
        }
        var regex = new RegExp('^' + escapedValue, 'i');
        return this.props.suggestions.filter(function (language) { return regex.test(language); });
    };
    ;
    PropertyFieldAutoCompleteHost.prototype.onInputBlur = function (elm) {
        if (this.state.hover == '') {
            this.state.isOpen = false;
            this.state.hover = '';
            this.state.keyPosition = -1;
            this.setState(this.state);
        }
    };
    PropertyFieldAutoCompleteHost.prototype.onInputKeyPress = function (elm) {
        if (elm.keyCode != 40 && elm.keyCode != 38) {
            this.state.keyPosition = -1;
            this.state.hover = '';
            this.state.shouldAutoComplete = true;
            this.setState(this.state);
        }
        if (elm.charCode === 13) {
            this.state.isOpen = false;
            this.state.hover = '';
            this.state.keyPosition = -1;
            this.setState(this.state);
            this.input.setSelectionStart(this.state.currentValue.length);
            this.input.setSelectionEnd(this.state.currentValue.length);
        }
    };
    PropertyFieldAutoCompleteHost.prototype.onInputKeyDown = function (elm) {
        if (elm.keyCode === 40) {
            this.state.keyPosition = this.state.keyPosition + 1;
            if (this.state.keyPosition >= this.state.suggestions.length)
                this.state.keyPosition = this.state.suggestions.length - 1;
            this.state.currentValue = this.state.suggestions[this.state.keyPosition];
            this.setState(this.state);
            this.automaticScroll(true);
            this.delayedValidate(this.state.currentValue);
        }
        else if (elm.keyCode === 38) {
            this.state.keyPosition = this.state.keyPosition - 1;
            if (this.state.keyPosition < 0)
                this.state.keyPosition = 0;
            this.state.currentValue = this.state.suggestions[this.state.keyPosition];
            this.setState(this.state);
            this.automaticScroll(false);
            this.delayedValidate(this.state.currentValue);
        }
    };
    PropertyFieldAutoCompleteHost.prototype.automaticScroll = function (down) {
        var lineHeight = 28;
        var maxHeight = 7 * lineHeight;
        var divDrop = document.getElementById("drop-" + this.state.guid);
        var currentScrollTop = divDrop.scrollTop;
        var currentTopInPixel = this.state.keyPosition * lineHeight;
        if (currentTopInPixel < currentScrollTop || (currentTopInPixel + lineHeight) > (currentScrollTop + maxHeight)) {
            //The current element is not displayed
            if (down === true) {
                if ((currentScrollTop + lineHeight) <= currentTopInPixel)
                    this.state.scrollPosition = currentScrollTop + lineHeight;
                else
                    this.state.scrollPosition = currentTopInPixel;
            }
            else {
                this.state.scrollPosition = currentTopInPixel;
            }
        }
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldAutoCompleteHost.prototype.validate = function (value) {
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
    PropertyFieldAutoCompleteHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
        this.props.properties[this.props.targetProperty] = newValue;
        this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
        if (!this.props.disableReactivePropertyChanges && this.props.render != null)
            this.props.render();
    };
    /**
     * @function
     * Called when the component will unmount
     */
    PropertyFieldAutoCompleteHost.prototype.componentWillUnmount = function () {
        if (this.async !== undefined)
            this.async.dispose();
    };
    /**
   * @function
   * Function to open the dialog
   */
    PropertyFieldAutoCompleteHost.prototype.onOpenDialog = function () {
        if (this.props.disabled === true)
            return;
        this.state.isOpen = !this.state.isOpen;
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is hover a font
     */
    PropertyFieldAutoCompleteHost.prototype.toggleHover = function (element) {
        var hoverFont = element.currentTarget.textContent;
        this.state.hover = hoverFont;
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is leaving a font
     */
    PropertyFieldAutoCompleteHost.prototype.toggleHoverLeave = function (element) {
        this.state.hover = '';
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is hover the fontpicker
     */
    PropertyFieldAutoCompleteHost.prototype.mouseEnterDropDown = function (element) {
        this.state.isHoverDropdown = true;
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is leaving the fontpicker
     */
    PropertyFieldAutoCompleteHost.prototype.mouseLeaveDropDown = function (element) {
        this.state.isHoverDropdown = false;
        this.setState(this.state);
    };
    /**
     * @function
     * User clicked on a font
     */
    PropertyFieldAutoCompleteHost.prototype.onClickItem = function (element) {
        element.stopPropagation();
        var clickedFont = element.currentTarget.textContent;
        this.state.currentValue = clickedFont;
        this.onOpenDialog();
        this.delayedValidate(clickedFont);
    };
    PropertyFieldAutoCompleteHost.prototype.onClickInput = function (elm) {
        this.state.isOpen = true;
        this.state.suggestions = this.getSuggestions(this.state.currentValue);
        this.setState(this.state);
    };
    /**
     * @function
     * Renders the controls
     */
    PropertyFieldAutoCompleteHost.prototype.render = function () {
        var _this = this;
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
            //fontFamily: this.state.safeSelectedFont != null && this.state.safeSelectedFont != '' ? this.state.safeSelectedFont : 'Arial',
            //fontSize: this.state.safeSelectedFont,
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
            top: '32px',
            left: '0',
            width: 'calc(100% - 2px)',
            //boxShadow: '0 4px 5px rgba(0,0,0,.15)',
            zIndex: 999,
            display: this.props.disabled === true ? 'none' : this.state.isOpen ? 'block' : 'none'
        };
        var fsResults = {
            margin: '0 4px 4px 0',
            maxHeight: '190px',
            width: 'calc(100% - 4px)',
            padding: '0 0 0 4px',
            position: 'relative',
            overflowX: 'hidden',
            overflowY: 'auto'
        };
        var carret = this.state.isOpen ? 'ms-Icon ms-Icon--ChevronUp' : 'ms-Icon ms-Icon--ChevronDown';
        //Renders content
        return (React.createElement("div", { style: { marginBottom: '8px' } },
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement("div", { style: fontSelect },
                React.createElement(TextField_1.TextField, { disabled: this.props.disabled, ref: function (input) { return _this.input = input; }, placeholder: this.props.placeHolder !== undefined ? this.props.placeHolder : '', value: this.state.currentValue, onClick: this.onClickInput, onBlur: this.onInputBlur, onKeyUp: this.onInputKeyDown, onKeyPress: this.onInputKeyPress, onChanged: this.onValueChanged, "aria-invalid": !!this.state.errorMessage }),
                React.createElement("div", { style: fsDrop },
                    React.createElement("ul", { style: fsResults, id: "drop-" + this.state.guid }, this.state.suggestions.map(function (sug, index) {
                        var backgroundColor = 'transparent';
                        if (_this.state.currentValue === sug)
                            backgroundColor = '#c7e0f4';
                        else if (_this.state.hover === sug)
                            backgroundColor = '#eaeaea';
                        var innerStyle = {
                            //lineHeight: '80%',
                            height: '20px',
                            padding: '4px 7px 4px',
                            margin: '0',
                            listStyle: 'none',
                            backgroundColor: backgroundColor,
                            cursor: 'pointer'
                        };
                        return (React.createElement("li", { key: 'autocompletepicker-' + index, role: "menuitem", onMouseEnter: _this.toggleHover, onClick: _this.onClickItem, onMouseLeave: _this.toggleHoverLeave, style: innerStyle }, sug));
                    })))),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", null,
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    return PropertyFieldAutoCompleteHost;
}(React.Component));
exports.default = PropertyFieldAutoCompleteHost;
//# sourceMappingURL=PropertyFieldAutoCompleteHost.js.map