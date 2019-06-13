"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldSPFolderPicker.ts
 * Define a custom field of type PropertyFieldSPFolderPicker for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldSPFolderPickerHost_1 = require("./PropertyFieldSPFolderPickerHost");
/**
 * @interface
 * Represents a PropertyFieldSPFolderPicker object
 *
 */
var PropertyFieldSPFolderPickerBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldSPFolderPickerBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.disabled = false;
        this.deferredValidationTime = 200;
        this.disableReactivePropertyChanges = false;
        this.render = this.render.bind(this);
        this.targetProperty = _properties.targetProperty;
        this.properties = _properties;
        this.label = _properties.label;
        this.initialFolder = _properties.initialFolder;
        this.baseFolder = this.baseFolder;
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
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
            this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }
    /**
     * @function
     * Renders the SPFolderPicker field content
     */
    PropertyFieldSPFolderPickerBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldSPFolderPickerHost_1.default, {
            label: this.label,
            initialFolder: this.initialFolder,
            baseFolder: this.baseFolder,
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
    PropertyFieldSPFolderPickerBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldSPFolderPickerBuilder;
}());
/**
 * @function
 * Helper method to create a SharePoint Folder Picker on the PropertyPane.
 * @param targetProperty - Target property the Folder picker is associated to.
 * @param properties - Strongly typed Folder Picker properties.
 */
function PropertyFieldSPFolderPicker(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        initialFolder: properties.initialFolder,
        baseFolder: properties.baseFolder,
        context: properties.context,
        targetProperty: targetProperty,
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
    //Calls the PropertyFieldSPFolderPicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldSPFolderPickerBuilder(targetProperty, newProperties);
}
exports.PropertyFieldSPFolderPicker = PropertyFieldSPFolderPicker;
//# sourceMappingURL=PropertyFieldSPFolderPicker.js.map