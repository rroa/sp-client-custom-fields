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
 * @file PropertyFieldDateTimePickerHost.tsx
 * Renders the controls for PropertyFieldDateTimePicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var PropertyFieldDateTimePicker_1 = require("./PropertyFieldDateTimePicker");
var DatePicker_1 = require("office-ui-fabric-react/lib/DatePicker");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var strings = require("sp-client-custom-fields/strings");
/**
 * @class
 * Defines the labels of the DatePicker control (as months, days, etc.)
 *
 */
var DatePickerStrings = /** @class */ (function () {
    function DatePickerStrings() {
        /**
         * An array of strings for the full names of months.
         * The array is 0-based, so months[0] should be the full name of January.
         */
        this.months = [
            strings.DatePickerMonthLongJanuary, strings.DatePickerMonthLongFebruary,
            strings.DatePickerMonthLongMarch, strings.DatePickerMonthLongApril,
            strings.DatePickerMonthLongMay, strings.DatePickerMonthLongJune, strings.DatePickerMonthLongJuly,
            strings.DatePickerMonthLongAugust, strings.DatePickerMonthLongSeptember, strings.DatePickerMonthLongOctober,
            strings.DatePickerMonthLongNovember, strings.DatePickerMonthLongDecember
        ];
        /**
         * An array of strings for the short names of months.
         * The array is 0-based, so shortMonths[0] should be the short name of January.
         */
        this.shortMonths = [
            strings.DatePickerMonthShortJanuary, strings.DatePickerMonthShortFebruary,
            strings.DatePickerMonthShortMarch, strings.DatePickerMonthShortApril,
            strings.DatePickerMonthShortMay, strings.DatePickerMonthShortJune, strings.DatePickerMonthShortJuly,
            strings.DatePickerMonthShortAugust, strings.DatePickerMonthShortSeptember, strings.DatePickerMonthShortOctober,
            strings.DatePickerMonthShortNovember, strings.DatePickerMonthShortDecember
        ];
        /**
         * An array of strings for the full names of days of the week.
         * The array is 0-based, so days[0] should be the full name of Sunday.
         */
        this.days = [
            strings.DatePickerDayLongSunday, strings.DatePickerDayLongMonday, strings.DatePickerDayLongTuesday,
            strings.DatePickerDayLongWednesday, strings.DatePickerDayLongThursday, strings.DatePickerDayLongFriday,
            strings.DatePickerDayLongSaturday
        ];
        /**
         * An array of strings for the initials of the days of the week.
         * The array is 0-based, so days[0] should be the initial of Sunday.
         */
        this.shortDays = [
            strings.DatePickerDayShortSunday, strings.DatePickerDayShortMonday, strings.DatePickerDayShortTuesday,
            strings.DatePickerDayShortWednesday, strings.DatePickerDayShortThursday, strings.DatePickerDayShortFriday,
            strings.DatePickerDayShortSaturday
        ];
        /**
         * String to render for button to direct the user to today's date.
         */
        this.goToToday = "";
        /**
         * Error message to render for TextField if isRequired validation fails.
         */
        this.isRequiredErrorMessage = "";
        /**
         * Error message to render for TextField if input date string parsing fails.
         */
        this.invalidInputErrorMessage = "";
    }
    return DatePickerStrings;
}());
/**
 * @class
 * Renders the controls for PropertyFieldDateTimePicker component
 */
var PropertyFieldDateTimePickerHost = /** @class */ (function (_super) {
    __extends(PropertyFieldDateTimePickerHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldDateTimePickerHost(props) {
        var _this = _super.call(this, props) || this;
        //Bind the current object to the external called onSelectDate method
        _this.onSelectDate = _this.onSelectDate.bind(_this);
        _this.dropdownHoursChanged = _this.dropdownHoursChanged.bind(_this);
        _this.dropdownMinutesChanged = _this.dropdownMinutesChanged.bind(_this);
        _this.dropdownSecondsChanged = _this.dropdownSecondsChanged.bind(_this);
        _this.state = {
            day: (_this.props.initialDate != null && _this.props.initialDate != '') ? new Date(_this.props.initialDate) : null,
            hours: (_this.props.initialDate != null && _this.props.initialDate != '') ? new Date(_this.props.initialDate).getHours() : 0,
            minutes: (_this.props.initialDate != null && _this.props.initialDate != '') ? new Date(_this.props.initialDate).getMinutes() : 0,
            seconds: (_this.props.initialDate != null && _this.props.initialDate != '') ? new Date(_this.props.initialDate).getSeconds() : 0,
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
     * Function called when the DatePicker Office UI Fabric component selected date changed
     */
    PropertyFieldDateTimePickerHost.prototype.onSelectDate = function (date) {
        if (date == null)
            return;
        this.state.day = date;
        this.setState(this.state);
        this.saveDate();
    };
    PropertyFieldDateTimePickerHost.prototype.dropdownHoursChanged = function (element) {
        this.state.hours = Number(element.key);
        this.setState(this.state);
        this.saveDate();
    };
    PropertyFieldDateTimePickerHost.prototype.dropdownMinutesChanged = function (element) {
        this.state.minutes = Number(element.key);
        this.setState(this.state);
        this.saveDate();
    };
    PropertyFieldDateTimePickerHost.prototype.dropdownSecondsChanged = function (element) {
        this.state.seconds = Number(element.key);
        this.setState(this.state);
        this.saveDate();
    };
    PropertyFieldDateTimePickerHost.prototype.saveDate = function () {
        if (this.state.day == null)
            return;
        var finalDate = new Date(this.state.day.toISOString());
        finalDate.setHours(this.state.hours);
        finalDate.setMinutes(this.state.minutes);
        finalDate.setSeconds(this.state.seconds);
        if (finalDate != null) {
            var finalDateAsString = '';
            if (this.props.formatDate) {
                finalDateAsString = this.props.formatDate(finalDate);
            }
            else {
                finalDateAsString = finalDate.toString();
            }
            this.delayedValidate(finalDateAsString);
        }
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldDateTimePickerHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.initialDate, value);
            return;
        }
        if (this.latestValidateValue === value)
            return;
        this.latestValidateValue = value;
        var result = this.props.onGetErrorMessage(value || '');
        if (result !== undefined) {
            if (typeof result === 'string') {
                if (result === undefined || result === '')
                    this.notifyAfterValidate(this.props.initialDate, value);
                this.state.errorMessage = result;
                this.setState(this.state);
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(_this.props.initialDate, value);
                    _this.state.errorMessage = errorMessage;
                    _this.setState(_this.state);
                });
            }
        }
        else {
            this.notifyAfterValidate(this.props.initialDate, value);
        }
    };
    /**
     * @function
     * Notifies the parent Web Part of a property value change
     */
    PropertyFieldDateTimePickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
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
    PropertyFieldDateTimePickerHost.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    /**
     * @function
     * Renders the control
     */
    PropertyFieldDateTimePickerHost.prototype.render = function () {
        //Defines the DatePicker control labels
        var dateStrings = new DatePickerStrings();
        //Constructs a Date type object from the initalDate string property
        var hours = [];
        for (var i = 0; i < 24; i++) {
            var digit;
            if (this.props.timeConvention == PropertyFieldDateTimePicker_1.ITimeConvention.Hours24) {
                //24 hours time convention
                if (i < 10)
                    digit = '0' + i;
                else
                    digit = i.toString();
            }
            else {
                //12 hours time convention
                if (i == 0)
                    digit = '12 am';
                else if (i < 12) {
                    digit = i + ' am';
                }
                else {
                    if (i == 12)
                        digit = '12 pm';
                    else {
                        digit = (i % 12) + ' pm';
                    }
                }
            }
            var selected = false;
            if (i == this.state.hours)
                selected = true;
            hours.push({ key: i, text: digit, isSelected: selected });
        }
        var minutes = [];
        for (var j = 0; j < 60; j++) {
            var digitMin;
            if (j < 10)
                digitMin = '0' + j;
            else
                digitMin = j.toString();
            var selected2 = false;
            if (j == this.state.minutes)
                selected2 = true;
            minutes.push({ key: j, text: digitMin, isSelected: selected2 });
        }
        var seconds = [];
        for (var k = 0; k < 60; k++) {
            var digitSec;
            if (k < 10)
                digitSec = '0' + k;
            else
                digitSec = k.toString();
            var selected3 = false;
            if (k == this.state.seconds)
                selected3 = true;
            seconds.push({ key: k, text: digitSec, isSelected: selected3 });
        }
        //Renders content
        return (React.createElement("div", null,
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement("table", { cellPadding: "0", cellSpacing: "0", width: "100%", style: { marginTop: '10px' } },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top' } },
                            React.createElement(Label_1.Label, { style: { marginRight: '4px' } }, strings.DateTimePickerDate)),
                        React.createElement("td", { style: { verticalAlign: 'top' } },
                            React.createElement(DatePicker_1.DatePicker, { value: this.state.day, strings: dateStrings, isMonthPickerVisible: false, onSelectDate: this.onSelectDate, allowTextInput: false }))),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top' } },
                            React.createElement(Label_1.Label, { style: { marginRight: '4px' } }, strings.DateTimePickerTime)),
                        React.createElement("td", { style: { verticalAlign: 'top' } },
                            React.createElement("table", { cellPadding: "0", cellSpacing: "0" },
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", { width: "79" },
                                            React.createElement(Dropdown_1.Dropdown, { label: "", options: hours, onChanged: this.dropdownHoursChanged })),
                                        React.createElement("td", { width: "4", style: { paddingLeft: '2px', paddingRight: '2px' } },
                                            React.createElement(Label_1.Label, null, ":")),
                                        React.createElement("td", { width: "71" },
                                            React.createElement(Dropdown_1.Dropdown, { label: "", options: minutes, onChanged: this.dropdownMinutesChanged })),
                                        React.createElement("td", { width: "4", style: { paddingLeft: '2px', paddingRight: '2px' } },
                                            React.createElement(Label_1.Label, null, ":")),
                                        React.createElement("td", { width: "71" },
                                            React.createElement(Dropdown_1.Dropdown, { label: "", options: seconds, onChanged: this.dropdownSecondsChanged }))))))))),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", { style: { paddingBottom: '8px' } },
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    return PropertyFieldDateTimePickerHost;
}(React.Component));
exports.default = PropertyFieldDateTimePickerHost;
//# sourceMappingURL=PropertyFieldDateTimePickerHost.js.map