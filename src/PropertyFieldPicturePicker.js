"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldPicturePicker.ts
 * Define a custom field of type PropertyFieldPicturePicker for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldPicturePickerHost_1 = require("./PropertyFieldPicturePickerHost");
/**
 * @interface
 * Represents a PropertyFieldPicturePicker object
 *
 */
var PropertyFieldPicturePickerBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldPicturePickerBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.disabled = false;
        this.deferredValidationTime = 200;
        this.previewImage = true;
        this.readOnly = true;
        this.allowedFileExtensions = ".gif,.jpg,.jpeg,.bmp,.dib,.tif,.tiff,.ico,.png";
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
        if (_properties.previewImage != null && _properties.previewImage != undefined)
            this.previewImage = _properties.previewImage;
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
    PropertyFieldPicturePickerBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldPicturePickerHost_1.default, {
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
            previewImage: this.previewImage,
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
    PropertyFieldPicturePickerBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldPicturePickerBuilder;
}());
/**
 * @function
 * Helper method to create a Picture Picker on the PropertyPane.
 * @param targetProperty - Target property the Picture picker is associated to.
 * @param properties - Strongly typed Picture Picker properties.
 */
function PropertyFieldPicturePicker(targetProperty, properties) {
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
        previewImage: properties.previewImage,
        readOnly: properties.readOnly,
        allowedFileExtensions: properties.allowedFileExtensions,
        render: properties.render,
        disableReactivePropertyChanges: properties.disableReactivePropertyChanges
    };
    //Calls the PropertyFieldPicturePicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldPicturePickerBuilder(targetProperty, newProperties);
}
exports.PropertyFieldPicturePicker = PropertyFieldPicturePicker;
//# sourceMappingURL=PropertyFieldPicturePicker.js.map