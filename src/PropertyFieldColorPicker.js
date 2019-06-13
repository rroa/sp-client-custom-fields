"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldColorPicker.ts
 * Define a custom field of type PropertyFieldColorPicker for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldColorPickerHost_1 = require("./PropertyFieldColorPickerHost");
/**
 * @interface
 * Represents a PropertyFieldColorPicker object
 *
 */
var PropertyFieldColorPickerBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldColorPickerBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.deferredValidationTime = 200;
        this.disableReactivePropertyChanges = false;
        this.render = this.render.bind(this);
        this.targetProperty = _properties.targetProperty;
        this.properties = _properties;
        this.label = _properties.label;
        this.initialColor = _properties.initialColor;
        this.properties.onDispose = this.dispose;
        this.properties.onRender = this.render;
        this.onPropertyChange = _properties.onPropertyChange;
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
     * Renders the ColorPicker field content
     */
    PropertyFieldColorPickerBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldColorPickerHost_1.default, {
            label: this.label,
            initialColor: this.initialColor,
            targetProperty: this.targetProperty,
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
    PropertyFieldColorPickerBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldColorPickerBuilder;
}());
/**
 * @function
 * Helper method to create a Color Picker on the PropertyPane.
 * @param targetProperty - Target property the Color picker is associated to.
 * @param properties - Strongly typed Color Picker properties.
 */
function PropertyFieldColorPicker(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        initialColor: properties.initialColor,
        onPropertyChange: properties.onPropertyChange,
        properties: properties.properties,
        onDispose: null,
        onRender: null,
        key: properties.key,
        onGetErrorMessage: properties.onGetErrorMessage,
        deferredValidationTime: properties.deferredValidationTime,
        render: properties.render,
        disableReactivePropertyChanges: properties.disableReactivePropertyChanges
    };
    //Calls the PropertyFieldColorPicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldColorPickerBuilder(targetProperty, newProperties);
}
exports.PropertyFieldColorPicker = PropertyFieldColorPicker;
//# sourceMappingURL=PropertyFieldColorPicker.js.map