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
 * @file PropertyFieldFontPickerHost.tsx
 * Renders the controls for PropertyFieldFontPicker component
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
 * Renders the controls for PropertyFieldFontPicker component
 */
var PropertyFieldFontPickerHost = /** @class */ (function (_super) {
    __extends(PropertyFieldFontPickerHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldFontPickerHost(props) {
        var _this = _super.call(this, props) || this;
        /**
         * @var
         * Defines the font series
         */
        _this.fonts = [
            { Name: "Andale Mono", SafeValue: '"Andale Mono",AndaleMono,monospace' },
            { Name: "Arial", SafeValue: 'Arial,""Helvetica Neue",Helvetica,sans-serif' },
            { Name: "Arial Black", SafeValue: '"Arial Black","Arial Bold",Gadget,sans-serif' },
            { Name: "Arial Narrow", SafeValue: '"Arial Narrow",Arial,sans-serif' },
            { Name: "Arial Rounded MT Bold", SafeValue: '"Arial Rounded MT Bold","Helvetica Rounded",Arial,sans-serif' },
            { Name: "Avant Garde", SafeValue: '"Avant Garde",Avantgarde,"Century Gothic",CenturyGothic,AppleGothic,sans-serif' },
            { Name: "Baskerville", SafeValue: 'Baskerville,"Baskerville Old Face","Hoefler Text",Garamond,"Times New Roman",serif' },
            { Name: "Big Caslon", SafeValue: '"Big Caslon","Book Antiqua","Palatino Linotype",Georgia,serif' },
            { Name: "Bodoni MT", SafeValue: '"Bodoni MT",Didot,"Didot LT STD","Hoefler Text",Garamond,"Times New Roman",serif' },
            { Name: "Book Antiqua", SafeValue: '"Book Antiqua",Palatino,"Palatino Linotype","Palatino LT STD",Georgia,serif' },
            { Name: "Brush Script MT", SafeValue: '"Brush Script MT",cursive' },
            { Name: "Calibri", SafeValue: 'Calibri,Candara,Segoe,"Segoe UI",Optima,Arial,sans-serif' },
            { Name: "Calisto MT", SafeValue: '"Calisto MT","Bookman Old Style",Bookman,"Goudy Old Style",Garamond,"Hoefler Text","Bitstream Charter",Georgia,serif' },
            { Name: "Cambria", SafeValue: 'Cambria,Georgia,serif' },
            { Name: "Candara", SafeValue: 'Candara,Calibri,Segoe,"Segoe UI",Optima,Arial,sans-serif' },
            { Name: "Century Gothic", SafeValue: '"Century Gothic",CenturyGothic,AppleGothic,sans-serif' },
            { Name: "Consolas", SafeValue: 'Consolas,monaco,monospace' },
            { Name: "Copperplate", SafeValue: 'Copperplate,"Copperplate Gothic Light",fantasy' },
            { Name: "Courier New", SafeValue: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace' },
            { Name: "Didot", SafeValue: 'Didot,"Didot LT STD","Hoefler Text",Garamond,"Times New Roman",serif' },
            { Name: "Franklin Gothic Medium", SafeValue: '"Franklin Gothic Medium","Franklin Gothic","ITC Franklin Gothic",Arial,sans-serif' },
            { Name: "Futura", SafeValue: 'Futura,"Trebuchet MS",Arial,sans-serif' },
            { Name: "Garamond", SafeValue: 'Garamond,Baskerville,"Baskerville Old Face","Hoefler Text","Times New Roman",serif' },
            { Name: "Geneva", SafeValue: 'Geneva,Tahoma,Verdana,sans-serif' },
            { Name: "Georgia", SafeValue: 'Georgia,Times,"Times New Roman",serif' },
            { Name: "Gill Sans", SafeValue: '"Gill Sans","Gill Sans MT",Calibri,sans-serif' },
            { Name: "Goudy Old Style", SafeValue: '"Goudy Old Style",Garamond,"Big Caslon","Times New Roman",serif' },
            { Name: "Helvetica", SafeValue: '"Helvetica Neue",Helvetica,Arial,sans-serif' },
            { Name: "Hoefler Text", SafeValue: '"Hoefler Text","Baskerville Old Face",Garamond,"Times New Roman",serif' },
            { Name: "Impact", SafeValue: 'Impact,Haettenschweiler,"Franklin Gothic Bold",Charcoal,"Helvetica Inserat","Bitstream Vera Sans Bold","Arial Black","sans serif"' },
            { Name: "Lucida Bright", SafeValue: '"Lucida Bright",Georgia,serif' },
            { Name: "Lucida Console", SafeValue: '"Lucida Console","Lucida Sans Typewriter",monaco,"Bitstream Vera Sans Mono",monospace' },
            { Name: "Lucida Grande", SafeValue: '"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Verdana,sans-serif' },
            { Name: "Lucida Sans Typewriter", SafeValue: '"Lucida Sans Typewriter","Lucida Console",monaco,"Bitstream Vera Sans Mono",monospace' },
            { Name: "Monaco", SafeValue: 'monaco,Consolas,"Lucida Console",monospace' },
            { Name: "Optima", SafeValue: 'Optima,Segoe,"Segoe UI",Candara,Calibri,Arial,sans-serif' },
            { Name: "Palatino", SafeValue: 'Palatino,"Palatino Linotype","Palatino LT STD","Book Antiqua",Georgia,serif' },
            { Name: "Papyrus", SafeValue: 'Papyrus,fantasy' },
            { Name: "Perpetua", SafeValue: 'Perpetua,Baskerville,"Big Caslon","Palatino Linotype",Palatino,"URW Palladio L","Nimbus Roman No9 L",serif' },
            { Name: "Segoe UI", SafeValue: '"Segoe UI",Frutiger,"Frutiger Linotype","Dejavu Sans","Helvetica Neue",Arial,sans-serif' },
            { Name: "Rockwell", SafeValue: 'Rockwell,"Courier Bold",Courier,Georgia,Times,"Times New Roman",serif' },
            { Name: "Rockwell Extra Bold", SafeValue: '"Rockwell Extra Bold","Rockwell Bold",monospace' },
            { Name: "Tahoma", SafeValue: 'Tahoma,Verdana,Segoe,sans-serif' },
            { Name: "Times New Roman", SafeValue: 'TimesNewRoman,"Times New Roman",Times,Baskerville,Georgia,serif' },
            { Name: "Trebuchet MS", SafeValue: '"Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans",Tahoma,sans-serif' },
            { Name: "Verdana", SafeValue: 'Verdana,Geneva,sans-serif' }
        ];
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
                if (props.useSafeFont === false && props.initialValue === font.Name) {
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
    PropertyFieldFontPickerHost.prototype.changeSelectedFont = function (newValue) {
        this.delayedValidate(newValue);
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldFontPickerHost.prototype.validate = function (value) {
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
    PropertyFieldFontPickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
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
    PropertyFieldFontPickerHost.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    /**
     * @function
     * Function to open the dialog
     */
    PropertyFieldFontPickerHost.prototype.onOpenDialog = function () {
        if (this.props.disabled === true)
            return;
        this.state.isOpen = !this.state.isOpen;
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is hover a font
     */
    PropertyFieldFontPickerHost.prototype.toggleHover = function (element) {
        var hoverFont = element.currentTarget.textContent;
        this.state.hoverFont = hoverFont;
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is leaving a font
     */
    PropertyFieldFontPickerHost.prototype.toggleHoverLeave = function (element) {
        this.state.hoverFont = '';
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is hover the fontpicker
     */
    PropertyFieldFontPickerHost.prototype.mouseEnterDropDown = function (element) {
        this.state.isHoverDropdown = true;
        this.setState(this.state);
    };
    /**
     * @function
     * Mouse is leaving the fontpicker
     */
    PropertyFieldFontPickerHost.prototype.mouseLeaveDropDown = function (element) {
        this.state.isHoverDropdown = false;
        this.setState(this.state);
    };
    /**
     * @function
     * User clicked on a font
     */
    PropertyFieldFontPickerHost.prototype.onClickFont = function (element) {
        var clickedFont = element.currentTarget.textContent;
        this.state.selectedFont = clickedFont;
        this.state.safeSelectedFont = this.getSafeFont(clickedFont);
        this.onOpenDialog();
        if (this.props.useSafeFont === false) {
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
    PropertyFieldFontPickerHost.prototype.getSafeFont = function (fontName) {
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
    PropertyFieldFontPickerHost.prototype.onFontDropdownChanged = function (option, index) {
        this.changeSelectedFont(option.key);
    };
    /**
     * @function
     * Renders the control
     */
    PropertyFieldFontPickerHost.prototype.render = function () {
        var _this = this;
        if (this.props.previewFonts === false) {
            //If the user don't want to use the preview font picker,
            //we're building a classical drop down picker
            var dropDownOptions = [];
            var selectedKey;
            this.fonts.map(function (font) {
                var isSelected = false;
                if (_this.props.useSafeFont === false && font.Name == _this.props.initialValue) {
                    isSelected = true;
                    selectedKey = font.Name;
                }
                else if (font.SafeValue == _this.props.initialValue) {
                    isSelected = true;
                    selectedKey = font.SafeValue;
                }
                dropDownOptions.push({
                    key: _this.props.useSafeFont === false ? font.Name : font.SafeValue,
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
                fontFamily: this.state.safeSelectedFont != null && this.state.safeSelectedFont != '' ? this.state.safeSelectedFont : 'Arial',
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
                                fontSize: '18px',
                                fontFamily: font.SafeValue,
                                backgroundColor: backgroundColor,
                                cursor: 'pointer'
                            };
                            return (React.createElement("li", { value: font.Name, key: _this._key + '-fontpicker-' + index, role: "menuitem", onMouseEnter: _this.toggleHover, onClick: _this.onClickFont, onMouseLeave: _this.toggleHoverLeave, style: innerStyle }, font.Name));
                        })))),
                this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                    React.createElement("div", null,
                        React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                        React.createElement("span", null,
                            React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                    : ''));
        }
    };
    return PropertyFieldFontPickerHost;
}(React.Component));
exports.default = PropertyFieldFontPickerHost;
//# sourceMappingURL=PropertyFieldFontPickerHost.js.map