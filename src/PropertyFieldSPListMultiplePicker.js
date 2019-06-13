"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldSPListMultiplePicker.ts
 * Define a custom field of type PropertyFieldSPListMultiplePicker for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldSPListMultiplePickerHost_1 = require("./PropertyFieldSPListMultiplePickerHost");
/**
 * @enum
 * Enumerated the sort order of the lists
 *
 */
var PropertyFieldSPListMultiplePickerOrderBy;
(function (PropertyFieldSPListMultiplePickerOrderBy) {
    PropertyFieldSPListMultiplePickerOrderBy[PropertyFieldSPListMultiplePickerOrderBy["Id"] = 0] = "Id";
    PropertyFieldSPListMultiplePickerOrderBy[PropertyFieldSPListMultiplePickerOrderBy["Title"] = 1] = "Title";
})(PropertyFieldSPListMultiplePickerOrderBy = exports.PropertyFieldSPListMultiplePickerOrderBy || (exports.PropertyFieldSPListMultiplePickerOrderBy = {}));
/**
 * @interface
 * Represents a PropertyFieldSPListMultiplePicker object
 *
 */
var PropertyFieldSPListMultiplePickerBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldSPListMultiplePickerBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.disabled = false;
        this.deferredValidationTime = 200;
        this.disableReactivePropertyChanges = false;
        this.render = this.render.bind(this);
        this.targetProperty = _targetProperty;
        this.properties = _properties;
        this.properties.onDispose = this.dispose;
        this.properties.onRender = this.render;
        this.label = _properties.label;
        this.context = _properties.context;
        this.selectedLists = _properties.selectedLists;
        this.baseTemplate = _properties.baseTemplate;
        this.orderBy = _properties.orderBy;
        this.includeHidden = _properties.includeHidden;
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
    PropertyFieldSPListMultiplePickerBuilder.prototype.onPropertyChange = function (propertyPath, oldValue, newValue) { };
    /**
     * @function
     * Renders the SPListPicker field content
     */
    PropertyFieldSPListMultiplePickerBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldSPListMultiplePickerHost_1.default, {
            label: this.label,
            targetProperty: this.targetProperty,
            context: this.context,
            selectedLists: this.selectedLists,
            baseTemplate: this.baseTemplate,
            orderBy: this.orderBy,
            includeHidden: this.includeHidden,
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
    PropertyFieldSPListMultiplePickerBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldSPListMultiplePickerBuilder;
}());
/**
 * @function
 * Helper method to create a SPList Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint list picker is associated to.
 * @param properties - Strongly typed SPList Picker properties.
 */
function PropertyFieldSPListMultiplePicker(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        context: properties.context,
        selectedLists: properties.selectedLists,
        baseTemplate: properties.baseTemplate,
        orderBy: properties.orderBy,
        includeHidden: properties.includeHidden,
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
    //Calls the PropertyFieldSPListMultiplePicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldSPListMultiplePickerBuilder(targetProperty, newProperties);
}
exports.PropertyFieldSPListMultiplePicker = PropertyFieldSPListMultiplePicker;
//# sourceMappingURL=PropertyFieldSPListMultiplePicker.js.map