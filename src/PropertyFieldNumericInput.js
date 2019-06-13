"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldNumericInput.ts
 * Define a custom field of type PropertyFieldNumericInput for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldNumericInputHost_1 = require("./PropertyFieldNumericInputHost");
/**
 * @interface
 * Represents a PropertyFieldNumericInput object
 *
 */
var PropertyFieldNumericInputBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldNumericInputBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.initialValue = 0;
        this.min = Number.MIN_VALUE;
        this.max = Number.MAX_VALUE;
        this.step = 1;
        this.precision = 0;
        this.size = 10;
        this.disabled = false;
        this.deferredValidationTime = 200;
        this.disableReactivePropertyChanges = false;
        this.render = this.render.bind(this);
        this.targetProperty = _properties.targetProperty;
        this.properties = _properties;
        this.label = _properties.label;
        if (_properties.initialValue !== undefined)
            this.initialValue = _properties.initialValue;
        this.properties.onDispose = this.dispose;
        this.properties.onRender = this.render;
        this.onPropertyChange = _properties.onPropertyChange;
        this.customProperties = _properties.properties;
        this.key = _properties.key;
        if (_properties.disabled === true)
            this.disabled = _properties.disabled;
        this.onGetErrorMessage = _properties.onGetErrorMessage;
        if (_properties.deferredValidationTime !== undefined)
            this.deferredValidationTime = _properties.deferredValidationTime;
        if (_properties.min !== undefined)
            this.min = _properties.min;
        if (_properties.max !== undefined)
            this.max = _properties.max;
        if (_properties.step !== undefined)
            this.step = _properties.step;
        if (_properties.precision !== undefined)
            this.precision = _properties.precision;
        if (_properties.size !== undefined)
            this.size = _properties.size;
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
            this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }
    /**
     * @function
     * Renders the picker field content
     */
    PropertyFieldNumericInputBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldNumericInputHost_1.default, {
            label: this.label,
            initialValue: this.initialValue,
            min: this.min,
            max: this.max,
            step: this.step,
            precision: this.precision,
            size: this.size,
            targetProperty: this.targetProperty,
            onDispose: this.dispose,
            onRender: this.render,
            onPropertyChange: this.onPropertyChange,
            properties: this.customProperties,
            key: this.key,
            disabled: this.disabled,
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
    PropertyFieldNumericInputBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldNumericInputBuilder;
}());
/**
 * @function
 * Helper method to create the customer field on the PropertyPane.
 * @param targetProperty - Target property the custom field is associated to.
 * @param properties - Strongly typed custom field properties.
 */
function PropertyFieldNumericInput(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        initialValue: properties.initialValue,
        min: properties.min,
        max: properties.max,
        step: properties.step,
        precision: properties.precision,
        size: properties.size,
        onPropertyChange: properties.onPropertyChange,
        properties: properties.properties,
        onDispose: null,
        onRender: null,
        key: properties.key,
        disabled: properties.disabled,
        onGetErrorMessage: properties.onGetErrorMessage,
        deferredValidationTime: properties.deferredValidationTime,
        render: properties.render,
        disableReactivePropertyChanges: properties.disableReactivePropertyChanges
    };
    //Calls the PropertyFieldNumericInput builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldNumericInputBuilder(targetProperty, newProperties);
}
exports.PropertyFieldNumericInput = PropertyFieldNumericInput;
//# sourceMappingURL=PropertyFieldNumericInput.js.map