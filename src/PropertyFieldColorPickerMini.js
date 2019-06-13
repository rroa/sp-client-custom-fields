"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldColorPickerMini.ts
 * Define a custom field of type PropertyFieldColorPickerMini for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldColorPickerMiniHost_1 = require("./PropertyFieldColorPickerMiniHost");
/**
 * @interface
 * Represents a PropertyFieldColorPickerMini object
 *
 */
var PropertyFieldColorPickerMiniBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldColorPickerMiniBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.initialColor = '#FFFFFF';
        this.disabled = false;
        this.deferredValidationTime = 200;
        this.disableReactivePropertyChanges = false;
        this.render = this.render.bind(this);
        this.targetProperty = _properties.targetProperty;
        this.properties = _properties;
        this.label = _properties.label;
        if (_properties.initialColor !== undefined && _properties.initialColor != '')
            this.initialColor = _properties.initialColor;
        this.properties.onDispose = this.dispose;
        this.properties.onRender = this.render;
        this.onPropertyChange = _properties.onPropertyChange;
        this.customProperties = _properties.properties;
        this.key = _properties.key;
        this.onGetErrorMessage = _properties.onGetErrorMessage;
        if (_properties.deferredValidationTime !== undefined)
            this.deferredValidationTime = _properties.deferredValidationTime;
        if (_properties.disabled !== undefined)
            this.disabled = _properties.disabled;
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
            this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }
    /**
     * @function
     * Renders the ColorPicker field content
     */
    PropertyFieldColorPickerMiniBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldColorPickerMiniHost_1.default, {
            label: this.label,
            initialColor: this.initialColor,
            targetProperty: this.targetProperty,
            disabled: this.disabled,
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
    PropertyFieldColorPickerMiniBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldColorPickerMiniBuilder;
}());
/**
 * @function
 * Helper method to create a Color Picker on the PropertyPane.
 * @param targetProperty - Target property the Color picker is associated to.
 * @param properties - Strongly typed Color Picker properties.
 */
function PropertyFieldColorPickerMini(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        initialColor: properties.initialColor,
        disabled: properties.disabled,
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
    //Calls the PropertyFieldColorPickerMini builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldColorPickerMiniBuilder(targetProperty, newProperties);
}
exports.PropertyFieldColorPickerMini = PropertyFieldColorPickerMini;
//# sourceMappingURL=PropertyFieldColorPickerMini.js.map