"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldDatePicker.ts
 * Define a custom field of type PropertyFieldDatePicker for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldDatePickerHost_1 = require("./PropertyFieldDatePickerHost");
/**
 * @interface
 * Represents a PropertyFieldDatePicker object
 *
 */
var PropertyFieldDatePickerBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldDatePickerBuilder(_targetProperty, _properties) {
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
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
            this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }
    /**
     * @function
     * Renders the DatePicker field content
     */
    PropertyFieldDatePickerBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldDatePickerHost_1.default, {
            label: this.label,
            initialDate: this.initialDate,
            targetProperty: this.targetProperty,
            formatDate: this.formatDate,
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
    PropertyFieldDatePickerBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldDatePickerBuilder;
}());
exports.PropertyFieldDatePickerBuilder = PropertyFieldDatePickerBuilder;
/**
 * @function
 * Helper method to create the customer field on the PropertyPane.
 * @param targetProperty - Target property the custom field is associated to.
 * @param properties - Strongly typed custom field properties.
 */
function PropertyFieldDatePicker(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        initialDate: properties.initialDate,
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
    //Calls the PropertyFieldDatePicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldDatePickerBuilder(targetProperty, newProperties);
}
exports.PropertyFieldDatePicker = PropertyFieldDatePicker;
//# sourceMappingURL=PropertyFieldDatePicker.js.map