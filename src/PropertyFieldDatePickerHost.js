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
 * @file PropertyFieldDatePickerHost.tsx
 * Renders the controls for PropertyFieldDatePicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var DatePicker_1 = require("office-ui-fabric-react/lib/DatePicker");
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
 * Renders the controls for PropertyFieldDatePicker component
 */
var PropertyFieldDatePickerHost = /** @class */ (function (_super) {
    __extends(PropertyFieldDatePickerHost, _super);
    /**
     * @function
     * Contructor
     */
    function PropertyFieldDatePickerHost(props) {
        var _this = _super.call(this, props) || this;
        //Bind the current object to the external called onSelectDate method
        _this.onSelectDate = _this.onSelectDate.bind(_this);
        _this.state = {
            date: _this.props.initialDate,
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
    PropertyFieldDatePickerHost.prototype.onSelectDate = function (date) {
        var dateAsString = '';
        if (this.props.formatDate) {
            dateAsString = this.props.formatDate(date);
        }
        else {
            dateAsString = date.toDateString();
        }
        this.state.date = dateAsString;
        this.setState(this.state);
        this.delayedValidate(dateAsString);
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldDatePickerHost.prototype.validate = function (value) {
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
    PropertyFieldDatePickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
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
    PropertyFieldDatePickerHost.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    /**
     * @function
     * Renders the control
     */
    PropertyFieldDatePickerHost.prototype.render = function () {
        //Defines the DatePicker control labels
        var dateStrings = new DatePickerStrings();
        //Constructs a Date type object from the initalDate string property
        var date;
        if (this.state.date != null && this.state.date != '')
            date = new Date(this.state.date);
        //Renders content
        return (React.createElement("div", null,
            React.createElement(DatePicker_1.DatePicker, { label: this.props.label, value: date, strings: dateStrings, isMonthPickerVisible: false, onSelectDate: this.onSelectDate, allowTextInput: false, formatDate: this.props.formatDate }),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", { style: { paddingBottom: '8px' } },
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    return PropertyFieldDatePickerHost;
}(React.Component));
exports.default = PropertyFieldDatePickerHost;
//# sourceMappingURL=PropertyFieldDatePickerHost.js.map