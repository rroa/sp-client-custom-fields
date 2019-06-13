"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldDimensionPicker.ts
 * Define a custom field of type PropertyFieldDimensionPicker for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldDimensionPickerHost_1 = require("./PropertyFieldDimensionPickerHost");
/**
 * @interface
 * Represents a PropertyFieldDimensionPicker object
 *
 */
var PropertyFieldDimensionPickerBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldDimensionPickerBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.disabled = false;
        this.deferredValidationTime = 200;
        this.preserveRatio = true;
        this.preserveRatioEnabled = true;
        this.disableReactivePropertyChanges = false;
        this.render = this.render.bind(this);
        this.targetProperty = _properties.targetProperty;
        this.properties = _properties;
        this.label = _properties.label;
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
        if (_properties.preserveRatio === false)
            this.preserveRatio = _properties.preserveRatio;
        if (_properties.preserveRatioEnabled === false)
            this.preserveRatioEnabled = _properties.preserveRatioEnabled;
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
            this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }
    /**
     * @function
     * Renders the Picker field content
     */
    PropertyFieldDimensionPickerBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldDimensionPickerHost_1.default, {
            label: this.label,
            initialValue: this.initialValue,
            targetProperty: this.targetProperty,
            onDispose: this.dispose,
            onRender: this.render,
            onPropertyChange: this.onPropertyChange,
            properties: this.customProperties,
            key: this.key,
            disabled: this.disabled,
            onGetErrorMessage: this.onGetErrorMessage,
            deferredValidationTime: this.deferredValidationTime,
            preserveRatio: this.preserveRatio,
            preserveRatioEnabled: this.preserveRatioEnabled,
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
    PropertyFieldDimensionPickerBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldDimensionPickerBuilder;
}());
/**
 * @function
 * Helper method to create the customer field on the PropertyPane.
 * @param targetProperty - Target property the custom field is associated to.
 * @param properties - Strongly typed custom field properties.
 */
function PropertyFieldDimensionPicker(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        initialValue: properties.initialValue,
        onPropertyChange: properties.onPropertyChange,
        properties: properties.properties,
        onDispose: null,
        onRender: null,
        key: properties.key,
        disabled: properties.disabled,
        onGetErrorMessage: properties.onGetErrorMessage,
        deferredValidationTime: properties.deferredValidationTime,
        preserveRatio: properties.preserveRatio,
        preserveRatioEnabled: properties.preserveRatioEnabled,
        render: properties.render,
        disableReactivePropertyChanges: properties.disableReactivePropertyChanges
    };
    //Calls the PropertyFieldDimensionPicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldDimensionPickerBuilder(targetProperty, newProperties);
}
exports.PropertyFieldDimensionPicker = PropertyFieldDimensionPicker;
//# sourceMappingURL=PropertyFieldDimensionPicker.js.map