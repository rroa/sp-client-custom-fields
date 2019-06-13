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
 * @file PropertyFieldMapPickerHost.tsx
 * Renders the controls for PropertyFieldMapPicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
require("office-ui-fabric-react/lib/components/TextField/TextField.scss");
var Map_1 = require("react-cartographer/lib/components/Map");
/**
 * @class
 * Renders the controls for PropertyFieldMapPicker component
 */
var PropertyFieldMapPickerHost = /** @class */ (function (_super) {
    __extends(PropertyFieldMapPickerHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldMapPickerHost(props) {
        var _this = _super.call(this, props) || this;
        //Bind the current object to the external called onSelectDate method
        _this.onClickChevron = _this.onClickChevron.bind(_this);
        _this.onLongitudeChange = _this.onLongitudeChange.bind(_this);
        _this.onLatitudeChange = _this.onLatitudeChange.bind(_this);
        _this.onGetCurrentLocation = _this.onGetCurrentLocation.bind(_this);
        _this.showPosition = _this.showPosition.bind(_this);
        _this.state = {
            longitude: _this.props.longitude,
            latitude: _this.props.latitude,
            isOpen: _this.props.collapsed !== undefined ? !_this.props.collapsed : true,
            errorMessage: ''
        };
        _this.async = new Utilities_1.Async(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        return _this;
    }
    PropertyFieldMapPickerHost.prototype.onClickChevron = function (element) {
        this.state.isOpen = !this.state.isOpen;
        this.setState(this.state);
    };
    PropertyFieldMapPickerHost.prototype.onGetCurrentLocation = function (element) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        }
    };
    PropertyFieldMapPickerHost.prototype.showPosition = function (position) {
        this.state.latitude = position.coords.latitude;
        this.state.longitude = position.coords.longitude;
        this.setState(this.state);
        var newValue = this.state.longitude + ',' + this.state.latitude;
        this.delayedValidate(newValue);
    };
    PropertyFieldMapPickerHost.prototype.onLongitudeChange = function (value) {
        this.state.longitude = value;
        this.setState(this.state);
        var newValue = this.state.longitude + ',' + this.state.latitude;
        this.delayedValidate(newValue);
    };
    PropertyFieldMapPickerHost.prototype.onLatitudeChange = function (value) {
        this.state.latitude = value;
        this.setState(this.state);
        var newValue = this.state.longitude + ',' + this.state.latitude;
        this.delayedValidate(newValue);
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldMapPickerHost.prototype.validate = function (value) {
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
    PropertyFieldMapPickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
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
    PropertyFieldMapPickerHost.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    /**
     * @function
     * Renders the controls
     */
    PropertyFieldMapPickerHost.prototype.render = function () {
        //Renders content
        return (React.createElement("div", { style: { marginBottom: '8px' } },
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement("table", { style: { width: '100%', borderSpacing: 0 } },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", { width: "100", style: { marginRight: '10px' } },
                            React.createElement("span", { style: { paddingBottom: '6px', display: 'block', fontFamily: '"Segoe UI Regular WestEuropean","Segoe UI",Tahoma,Arial,sans-serif', fontSize: '12px', fontWeight: 400 } }, "Longitude"),
                            React.createElement(TextField_1.TextField, { style: { width: '90px' }, value: this.state.longitude, disabled: this.props.disabled, onChanged: this.onLongitudeChange })),
                        React.createElement("td", { width: "100", style: { marginRight: '10px' } },
                            React.createElement("span", { style: { paddingBottom: '6px', display: 'block', fontFamily: '"Segoe UI Regular WestEuropean","Segoe UI",Tahoma,Arial,sans-serif', fontSize: '12px', fontWeight: 400 } }, "Latitude"),
                            React.createElement(TextField_1.TextField, { style: { width: '90px' }, value: this.state.latitude, onChanged: this.onLatitudeChange, disabled: this.props.disabled })),
                        React.createElement("td", { style: { verticalAlign: 'bottom', paddingBottom: '10px' } },
                            React.createElement("table", { style: { width: '100%', borderSpacing: 0 } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement(Button_1.IconButton, { iconProps: { iconName: 'MapPin' }, disabled: this.props.disabled, onClick: this.onGetCurrentLocation })),
                                        React.createElement("td", null,
                                            React.createElement(Button_1.IconButton, { disabled: this.props.disabled, iconProps: { iconName: this.state.isOpen ? 'ChevronUpSmall' : 'ChevronDownSmall' }, onClick: this.onClickChevron }))))))))),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", null,
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : '',
            this.state.isOpen === true ?
                React.createElement("div", null,
                    React.createElement(Map_1.default, { provider: 'bing', providerKey: 'Ag3-9ixwWbFk4BdNzkj6MCnFN2_pQiL2hedXxiiuaF_DSuzDqAVp2mW9wPE0coeL', mapId: 'map', latitude: +this.state.latitude, longitude: +this.state.longitude, zoom: 15, height: 250, width: 283 }))
                : ''));
    };
    return PropertyFieldMapPickerHost;
}(React.Component));
exports.default = PropertyFieldMapPickerHost;
//# sourceMappingURL=PropertyFieldMapPickerHost.js.map