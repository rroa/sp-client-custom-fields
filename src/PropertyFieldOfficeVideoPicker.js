"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldOfficeVideoPicker.ts
 * Define a custom field of type PropertyFieldOfficeVideoPicker for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldOfficeVideoPickerHost_1 = require("./PropertyFieldOfficeVideoPickerHost");
/**
 * @interface
 * Represents a PropertyFieldOfficeVideoPicker object
 *
 */
var PropertyFieldOfficeVideoPickerBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldOfficeVideoPickerBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.disabled = false;
        this.deferredValidationTime = 200;
        this.readOnly = true;
        this.disableReactivePropertyChanges = false;
        this.render = this.render.bind(this);
        this.targetProperty = _properties.targetProperty;
        this.properties = _properties;
        this.label = _properties.label;
        this.initialValue = _properties.initialValue;
        this.context = _properties.context;
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
        if (_properties.readOnly === false)
            this.readOnly = _properties.readOnly;
        this.panelTitle = _properties.panelTitle;
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
            this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }
    /**
     * @function
     * Renders the ColorPicker field content
     */
    PropertyFieldOfficeVideoPickerBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldOfficeVideoPickerHost_1.default, {
            label: this.label,
            initialValue: this.initialValue,
            context: this.context,
            targetProperty: this.targetProperty,
            onDispose: this.dispose,
            onRender: this.render,
            onPropertyChange: this.onPropertyChange,
            properties: this.customProperties,
            key: this.key,
            disabled: this.disabled,
            onGetErrorMessage: this.onGetErrorMessage,
            deferredValidationTime: this.deferredValidationTime,
            readOnly: this.readOnly,
            panelTitle: this.panelTitle,
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
    PropertyFieldOfficeVideoPickerBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldOfficeVideoPickerBuilder;
}());
/**
 * @function
 * Helper method to create a Picture Picker on the PropertyPane.
 * @param targetProperty - Target property the Picture picker is associated to.
 * @param properties - Strongly typed Picture Picker properties.
 */
function PropertyFieldOfficeVideoPicker(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        initialValue: properties.initialValue,
        onPropertyChange: properties.onPropertyChange,
        properties: properties.properties,
        context: properties.context,
        onDispose: null,
        onRender: null,
        key: properties.key,
        disabled: properties.disabled,
        onGetErrorMessage: properties.onGetErrorMessage,
        deferredValidationTime: properties.deferredValidationTime,
        readOnly: properties.readOnly,
        panelTitle: properties.panelTitle,
        render: properties.render,
        disableReactivePropertyChanges: properties.disableReactivePropertyChanges
    };
    //Calls the PropertyFieldOfficeVideoPicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldOfficeVideoPickerBuilder(targetProperty, newProperties);
}
exports.PropertyFieldOfficeVideoPicker = PropertyFieldOfficeVideoPicker;
//# sourceMappingURL=PropertyFieldOfficeVideoPicker.js.map