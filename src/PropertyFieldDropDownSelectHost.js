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
 * @file PropertyFieldDropDownSelectHost.tsx
 * Renders the controls for PropertyFieldDropDownSelect component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var Checkbox_1 = require("office-ui-fabric-react/lib/Checkbox");
var GuidHelper_1 = require("./GuidHelper");
/**
 * @class
 * Renders the controls for PropertyFieldDropDownSelect component
 */
var PropertyFieldDropDownSelectHost = /** @class */ (function (_super) {
    __extends(PropertyFieldDropDownSelectHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldDropDownSelectHost(props) {
        var _this = _super.call(this, props) || this;
        //Bind the current object to the external called onSelectDate method
        _this.onOpenDialog = _this.onOpenDialog.bind(_this);
        _this.toggleHover = _this.toggleHover.bind(_this);
        _this.toggleHoverLeave = _this.toggleHoverLeave.bind(_this);
        _this.onClickFont = _this.onClickFont.bind(_this);
        _this.mouseEnterDropDown = _this.mouseEnterDropDown.bind(_this);
        _this.mouseLeaveDropDown = _this.mouseLeaveDropDown.bind(_this);
        _this._key = GuidHelper_1.default.getGuid();
        //Init the state
        _this.state = {
            isOpen: false,
            isHoverDropdown: false,
            errorMessage: ''
        };
        _this.async = new Utilities_1.Async(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        //Inits the default value
        if (props.initialValue != null && props.initialValue.length > 0 && _this.props.options != null) {
            for (var i = 0; i < _this.props.options.length; i++) {
                var font = _this.props.options[i];
                var found = false;
                for (var j = 0; j < props.initialValue.length; j++) {
                    if (props.initialValue[j] == font.key) {
                        found = true;
                        break;
                    }
                }
                if (found == true)
                    font.isSelected = true;
            }
        }
        return _this;
    }
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldDropDownSelectHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.initialValue, value);
            return;
        }
        var result = this.props.onGetErrorMessage(value || []);
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
    PropertyFieldDropDownSelectHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
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
    PropertyFieldDropDownSelectHost.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    /**
     * @function
     * Function to open the dialog
     */
    PropertyFieldDropDownSelectHost.prototype.onOpenDialog = function () {
        if (this.props.disabled === true)
            return;
        this.state.isOpen = !this.state.isOpen;
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is hover a font
     */
    PropertyFieldDropDownSelectHost.prototype.toggleHover = function (element) {
        var hoverFont = element.currentTarget.textContent;
        this.state.hoverFont = hoverFont;
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is leaving a font
     */
    PropertyFieldDropDownSelectHost.prototype.toggleHoverLeave = function (element) {
        this.state.hoverFont = '';
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is hover the fontpicker
     */
    PropertyFieldDropDownSelectHost.prototype.mouseEnterDropDown = function (element) {
        this.state.isHoverDropdown = true;
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is leaving the fontpicker
     */
    PropertyFieldDropDownSelectHost.prototype.mouseLeaveDropDown = function (element) {
        this.state.isHoverDropdown = false;
        this.setState(this.state);
    };
    PropertyFieldDropDownSelectHost.prototype.saveOptions = function () {
        var res = [];
        this.props.options.map(function (elm) {
            if (elm.isSelected)
                res.push(elm.key.toString());
        });
        this.delayedValidate(res);
    };
    /**
     * @function
     * User clicked on a font
     */
    PropertyFieldDropDownSelectHost.prototype.onClickFont = function (element, isChecked) {
        var value = element.currentTarget.value;
        var option = this.getOption(value);
        option.isSelected = isChecked;
        this.setState(this.state);
        this.saveOptions();
    };
    PropertyFieldDropDownSelectHost.prototype.getOption = function (key) {
        for (var i = 0; i < this.props.options.length; i++) {
            var font = this.props.options[i];
            if (font.key === key)
                return font;
        }
        return null;
    };
    /**
     * @function
     * Renders the control
     */
    PropertyFieldDropDownSelectHost.prototype.render = function () {
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
            maxHeight: '190px',
            width: 'calc(100% - 4px)',
            padding: '0 0 0 4px',
            position: 'relative',
            overflowX: 'hidden',
            overflowY: 'auto'
        };
        var carret = this.state.isOpen ? 'ms-Icon ms-Icon--ChevronUp' : 'ms-Icon ms-Icon--ChevronDown';
        var foundSelected = false;
        //Renders content
        return (React.createElement("div", { style: { marginBottom: '8px' } },
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement("div", { style: fontSelect },
                React.createElement("a", { style: fontSelectA, onClick: this.onOpenDialog, onMouseEnter: this.mouseEnterDropDown, onMouseLeave: this.mouseLeaveDropDown, role: "menuitem" },
                    React.createElement("span", { style: fontSelectASpan },
                        this.props.options.map(function (elm, index) {
                            if (elm.isSelected) {
                                if (foundSelected == false) {
                                    foundSelected = true;
                                    return (React.createElement("span", { key: _this._key + '-spanselect-' + index }, elm.text));
                                }
                                else {
                                    return (React.createElement("span", { key: _this._key + '-spanselect-' + index },
                                        ", ",
                                        elm.text));
                                }
                            }
                        }),
                        this.state.selectedFont),
                    React.createElement("div", { style: fontSelectADiv },
                        React.createElement("i", { style: fontSelectADivB, className: carret }))),
                React.createElement("div", { style: fsDrop },
                    React.createElement("ul", { style: fsResults }, this.props.options.map(function (font, index) {
                        var backgroundColor = 'transparent';
                        if (_this.state.hoverFont === font.text)
                            backgroundColor = '#eaeaea';
                        var innerStyle = {
                            lineHeight: '80%',
                            padding: '7px 7px 8px',
                            margin: '0',
                            listStyle: 'none',
                            fontSize: '16px',
                            backgroundColor: backgroundColor
                        };
                        return (React.createElement("li", { value: font.text, key: _this._key + '-dropdownselect-' + index, onMouseEnter: _this.toggleHover, role: "menuitem", onMouseLeave: _this.toggleHoverLeave, style: innerStyle },
                            React.createElement(Checkbox_1.Checkbox, { defaultChecked: font.isSelected, disabled: _this.props.disabled, label: font.text, onChange: _this.onClickFont, inputProps: { value: font.key } })));
                    })))),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", null,
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    return PropertyFieldDropDownSelectHost;
}(React.Component));
exports.default = PropertyFieldDropDownSelectHost;
//# sourceMappingURL=PropertyFieldDropDownSelectHost.js.map