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
 * @file PropertyFieldFontSizePickerHost.tsx
 * Renders the controls for PropertyFieldFontSizePicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var GuidHelper_1 = require("./GuidHelper");
/**
 * @class
 * Renders the controls for PropertyFieldFontSizePicker component
 */
var PropertyFieldFontSizePickerHost = /** @class */ (function (_super) {
    __extends(PropertyFieldFontSizePickerHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldFontSizePickerHost(props) {
        var _this = _super.call(this, props) || this;
        /**
         * @var
         * Defines the font series
         */
        _this.fontsPixels = [
            { Name: "8px", SafeValue: '8px' },
            { Name: "9px", SafeValue: '9px' },
            { Name: "10px", SafeValue: '10px' },
            { Name: "11px", SafeValue: '11px' },
            { Name: "12px", SafeValue: '12px' },
            { Name: "14px", SafeValue: '14px' },
            { Name: "16px", SafeValue: '16px' },
            { Name: "18px", SafeValue: '18px' },
            { Name: "20px", SafeValue: '20px' },
            { Name: "24px", SafeValue: '24px' },
            { Name: "28px", SafeValue: '28px' },
            { Name: "36px", SafeValue: '36px' },
            { Name: "48px", SafeValue: '48px' }
        ];
        _this.fontsLabels = [
            { Name: "xx-small", SafeValue: 'xx-small' },
            { Name: "x-small", SafeValue: 'x-small' },
            { Name: "small", SafeValue: 'small' },
            { Name: "medium", SafeValue: 'medium' },
            { Name: "large", SafeValue: 'large' },
            { Name: "x-large", SafeValue: 'x-large' },
            { Name: "xx-large", SafeValue: 'xx-large' }
        ];
        if (props.usePixels === true)
            _this.fonts = _this.fontsPixels;
        else
            _this.fonts = _this.fontsLabels;
        //Bind the current object to the external called onSelectDate method
        _this.onOpenDialog = _this.onOpenDialog.bind(_this);
        _this.toggleHover = _this.toggleHover.bind(_this);
        _this.toggleHoverLeave = _this.toggleHoverLeave.bind(_this);
        _this.onClickFont = _this.onClickFont.bind(_this);
        _this.onFontDropdownChanged = _this.onFontDropdownChanged.bind(_this);
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
        if (props.initialValue != null && props.initialValue != '') {
            for (var i = 0; i < _this.fonts.length; i++) {
                var font = _this.fonts[i];
                //Checks if we must use the font name or the font safe value
                if (props.usePixels === false && props.initialValue === font.Name) {
                    _this.state.selectedFont = font.Name;
                    _this.state.safeSelectedFont = font.SafeValue;
                }
                else if (props.initialValue === font.SafeValue) {
                    _this.state.selectedFont = font.Name;
                    _this.state.safeSelectedFont = font.SafeValue;
                }
            }
        }
        return _this;
    }
    /**
     * @function
     * Function to refresh the Web Part properties
     */
    PropertyFieldFontSizePickerHost.prototype.changeSelectedFont = function (newValue) {
        this.delayedValidate(newValue);
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldFontSizePickerHost.prototype.validate = function (value) {
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
    PropertyFieldFontSizePickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
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
    PropertyFieldFontSizePickerHost.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    /**
     * @function
     * Function to open the dialog
     */
    PropertyFieldFontSizePickerHost.prototype.onOpenDialog = function () {
        if (this.props.disabled === true)
            return;
        this.state.isOpen = !this.state.isOpen;
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is hover a font
     */
    PropertyFieldFontSizePickerHost.prototype.toggleHover = function (element) {
        var hoverFont = element.currentTarget.textContent;
        this.state.hoverFont = hoverFont;
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is leaving a font
     */
    PropertyFieldFontSizePickerHost.prototype.toggleHoverLeave = function (element) {
        this.state.hoverFont = '';
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is hover the fontpicker
     */
    PropertyFieldFontSizePickerHost.prototype.mouseEnterDropDown = function (element) {
        this.state.isHoverDropdown = true;
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is leaving the fontpicker
     */
    PropertyFieldFontSizePickerHost.prototype.mouseLeaveDropDown = function (element) {
        this.state.isHoverDropdown = false;
        this.setState(this.state);
    };
    /**
     * @function
     * User clicked on a font
     */
    PropertyFieldFontSizePickerHost.prototype.onClickFont = function (element) {
        var clickedFont = element.currentTarget.textContent;
        this.state.selectedFont = clickedFont;
        this.state.safeSelectedFont = this.getSafeFont(clickedFont);
        this.onOpenDialog();
        if (this.props.usePixels === false) {
            this.changeSelectedFont(this.state.selectedFont);
        }
        else {
            this.changeSelectedFont(this.state.safeSelectedFont);
        }
    };
    /**
     * @function
     * Gets a safe font value from a font name
     */
    PropertyFieldFontSizePickerHost.prototype.getSafeFont = function (fontName) {
        for (var i = 0; i < this.fonts.length; i++) {
            var font = this.fonts[i];
            if (font.Name === fontName)
                return font.SafeValue;
        }
        return '';
    };
    /**
     * @function
     * The font dropdown selected value changed (used when the previewFont property equals false)
     */
    PropertyFieldFontSizePickerHost.prototype.onFontDropdownChanged = function (option, index) {
        this.changeSelectedFont(option.key);
    };
    /**
     * @function
     * Renders the controls
     */
    PropertyFieldFontSizePickerHost.prototype.render = function () {
        var _this = this;
        if (this.props.preview === false) {
            //If the user don't want to use the preview font picker,
            //we're building a classical drop down picker
            var dropDownOptions = [];
            var selectedKey;
            this.fonts.map(function (font) {
                var isSelected = false;
                if (_this.props.usePixels === false && font.Name == _this.props.initialValue) {
                    isSelected = true;
                    selectedKey = font.Name;
                }
                else if (font.SafeValue == _this.props.initialValue) {
                    isSelected = true;
                    selectedKey = font.SafeValue;
                }
                dropDownOptions.push({
                    key: _this.props.usePixels === false ? font.Name : font.SafeValue,
                    text: font.Name,
                    isSelected: isSelected
                });
            });
            return (React.createElement("div", null,
                React.createElement(Dropdown_1.Dropdown, { label: this.props.label, options: dropDownOptions, selectedKey: selectedKey, onChanged: this.onFontDropdownChanged, disabled: this.props.disabled }),
                this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                    React.createElement("div", null,
                        React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                        React.createElement("span", null,
                            React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                    : ''));
        }
        else {
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
            //Renders content
            return (React.createElement("div", { style: { marginBottom: '8px' } },
                React.createElement(Label_1.Label, null, this.props.label),
                React.createElement("div", { style: fontSelect },
                    React.createElement("a", { style: fontSelectA, onClick: this.onOpenDialog, onMouseEnter: this.mouseEnterDropDown, onMouseLeave: this.mouseLeaveDropDown, role: "menuitem" },
                        React.createElement("span", { style: fontSelectASpan }, this.state.selectedFont),
                        React.createElement("div", { style: fontSelectADiv },
                            React.createElement("i", { style: fontSelectADivB, className: carret }))),
                    React.createElement("div", { style: fsDrop },
                        React.createElement("ul", { style: fsResults }, this.fonts.map(function (font, index) {
                            var backgroundColor = 'transparent';
                            if (_this.state.selectedFont === font.Name)
                                backgroundColor = '#c7e0f4';
                            else if (_this.state.hoverFont === font.Name)
                                backgroundColor = '#eaeaea';
                            var innerStyle = {
                                lineHeight: '80%',
                                padding: '7px 7px 8px',
                                margin: '0',
                                listStyle: 'none',
                                fontSize: font.SafeValue,
                                backgroundColor: backgroundColor,
                                cursor: 'pointer'
                            };
                            return (React.createElement("li", { value: font.Name, key: _this._key + '-fontsizepicker-' + index, role: "menuitem", onMouseEnter: _this.toggleHover, onClick: _this.onClickFont, onMouseLeave: _this.toggleHoverLeave, style: innerStyle }, font.Name));
                        })))),
                this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                    React.createElement("div", null,
                        React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                        React.createElement("span", null,
                            React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                    : ''));
        }
    };
    return PropertyFieldFontSizePickerHost;
}(React.Component));
exports.default = PropertyFieldFontSizePickerHost;
//# sourceMappingURL=PropertyFieldFontSizePickerHost.js.map