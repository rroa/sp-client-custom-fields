"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldDocumentPicker.ts
 * Define a custom field of type PropertyFieldDocumentPicker for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldDocumentPickerHost_1 = require("./PropertyFieldDocumentPickerHost");
/**
 * @interface
 * Represents a PropertyFieldDocumentPicker object
 *
 */
var PropertyFieldDocumentPickerBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldDocumentPickerBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.disabled = false;
        this.deferredValidationTime = 200;
        this.previewDocument = true;
        this.readOnly = true;
        this.allowedFileExtensions = ".doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.txt";
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
        if (_properties.previewDocument !== undefined)
            this.previewDocument = _properties.previewDocument;
        if (_properties.readOnly === false)
            this.readOnly = _properties.readOnly;
        if (_properties.allowedFileExtensions != null && _properties.allowedFileExtensions !== undefined && _properties.allowedFileExtensions != '')
            this.allowedFileExtensions = _properties.allowedFileExtensions;
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
            this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }
    /**
     * @function
     * Renders the ColorPicker field content
     */
    PropertyFieldDocumentPickerBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldDocumentPickerHost_1.default, {
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
            previewDocument: this.previewDocument,
            readOnly: this.readOnly,
            allowedFileExtensions: this.allowedFileExtensions,
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
    PropertyFieldDocumentPickerBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldDocumentPickerBuilder;
}());
/**
 * @function
 * Helper method to create the customer field on the PropertyPane.
 * @param targetProperty - Target property the custom field is associated to.
 * @param properties - Strongly typed custom field properties.
 */
function PropertyFieldDocumentPicker(targetProperty, properties) {
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
        previewDocument: properties.previewDocument,
        readOnly: properties.readOnly,
        allowedFileExtensions: properties.allowedFileExtensions,
        render: properties.render,
        disableReactivePropertyChanges: properties.disableReactivePropertyChanges
    };
    //Calls the PropertyFieldDocumentPicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldDocumentPickerBuilder(targetProperty, newProperties);
}
exports.PropertyFieldDocumentPicker = PropertyFieldDocumentPicker;
//# sourceMappingURL=PropertyFieldDocumentPicker.js.map