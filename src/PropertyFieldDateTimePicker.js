"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldDateTimePicker.ts
 * Define a custom field of type PropertyFieldDateTimePicker for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldDateTimePickerHost_1 = require("./PropertyFieldDateTimePickerHost");
/**
  * @enum
  * Time convention
  */
var ITimeConvention;
(function (ITimeConvention) {
    /**
     * The 12-hour clock is a time convention in which the 24 hours of the day are
     * divided into two periods: a.m. and p.m.
     */
    ITimeConvention[ITimeConvention["Hours12"] = 0] = "Hours12";
    /**
     * The 24-hour clock is the convention of time keeping in which the day runs from midnight to
     * midnight and is divided into 24 hours, indicated by the hours passed since midnight, from 0 to 23
     */
    ITimeConvention[ITimeConvention["Hours24"] = 1] = "Hours24";
})(ITimeConvention = exports.ITimeConvention || (exports.ITimeConvention = {}));
/**
 * @interface
 * Represents a PropertyFieldDateTimePicker object
 *
 */
var PropertyFieldDateTimePickerBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldDateTimePickerBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.deferredValidationTime = 200;
        this.disableReactivePropertyChanges = false;
        this.render = this.render.bind(this);
        this.targetProperty = _properties.targetProperty;
        this.properties = _properties;
        this.label = _properties.label;
        this.initialDate = _properties.initialDate;
        this.properties.onDispose = this.dispose;
        this.properties.onRender = this.render;
        this.onPropertyChange = _properties.onPropertyChange;
        this.formatDate = _properties.formatDate;
        this.customProperties = _properties.properties;
        this.key = _properties.key;
        this.onGetErrorMessage = _properties.onGetErrorMessage;
        if (_properties.deferredValidationTime !== undefined)
            this.deferredValidationTime = _properties.deferredValidationTime;
        if (_properties.timeConvention !== undefined)
            this.timeConvention = _properties.timeConvention;
        else
            this.timeConvention = ITimeConvention.Hours24;
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
            this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }
    /**
     * @function
     * Renders the DatePicker field content
     */
    PropertyFieldDateTimePickerBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldDateTimePickerHost_1.default, {
            label: this.label,
            initialDate: this.initialDate,
            targetProperty: this.targetProperty,
            formatDate: this.formatDate,
            timeConvention: this.timeConvention,
            onDispose: this.dispose,
            onRender: this.render,
            onPropertyChange: this.onPropertyChange,
            properties: this.customProperties,
            key: this.key,
            onGetErrorMessage: this.onGetErrorMessage,
            deferredValidationTime: this.deferredValidationTime,
            render: this.renderWebPart,
            disableReactivePropertyChanges: this.disableReactivePropertyChanges
        });
        //Calls the REACT content generator
        ReactDom.render(element, elem);
    };
    /**
     * @function
     * Disposes the current object
     */
    PropertyFieldDateTimePickerBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldDateTimePickerBuilder;
}());
/**
 * @function
 * Helper method to create the customer field on the PropertyPane.
 * @param targetProperty - Target property the custom field is associated to.
 * @param properties - Strongly typed custom field properties.
 */
function PropertyFieldDateTimePicker(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        initialDate: properties.initialDate,
        timeConvention: properties.timeConvention,
        onPropertyChange: properties.onPropertyChange,
        properties: properties.properties,
        formatDate: properties.formatDate,
        onDispose: null,
        onRender: null,
        key: properties.key,
        onGetErrorMessage: properties.onGetErrorMessage,
        deferredValidationTime: properties.deferredValidationTime,
        render: properties.render,
        disableReactivePropertyChanges: properties.disableReactivePropertyChanges
    };
    //Calls the PropertyFieldDateTimePicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldDateTimePickerBuilder(targetProperty, newProperties);
}
exports.PropertyFieldDateTimePicker = PropertyFieldDateTimePicker;
//# sourceMappingURL=PropertyFieldDateTimePicker.js.map