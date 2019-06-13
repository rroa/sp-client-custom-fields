"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldSPListPicker.ts
 * Define a custom field of type PropertyFieldSPListPicker for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldSPListPickerHost_1 = require("./PropertyFieldSPListPickerHost");
var PropertyFieldSPListPickerOrderBy;
(function (PropertyFieldSPListPickerOrderBy) {
    PropertyFieldSPListPickerOrderBy[PropertyFieldSPListPickerOrderBy["Id"] = 0] = "Id";
    PropertyFieldSPListPickerOrderBy[PropertyFieldSPListPickerOrderBy["Title"] = 1] = "Title";
})(PropertyFieldSPListPickerOrderBy = exports.PropertyFieldSPListPickerOrderBy || (exports.PropertyFieldSPListPickerOrderBy = {}));
/**
 * @interface
 * Represents a PropertyFieldSPListPicker object
 *
 */
var PropertyFieldSPListPickerBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldSPListPickerBuilder(_targetProperty, _properties) {
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
        this.selectedList = _properties.selectedList;
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
    PropertyFieldSPListPickerBuilder.prototype.onPropertyChange = function (propertyPath, oldValue, newValue) { };
    /**
     * @function
     * Renders the SPListPicker field content
     */
    PropertyFieldSPListPickerBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldSPListPickerHost_1.default, {
            label: this.label,
            targetProperty: this.targetProperty,
            context: this.context,
            selectedList: this.selectedList,
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
    PropertyFieldSPListPickerBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldSPListPickerBuilder;
}());
/**
 * @function
 * Helper method to create a SPList Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint list picker is associated to.
 * @param properties - Strongly typed SPList Picker properties.
 */
function PropertyFieldSPListPicker(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        context: properties.context,
        selectedList: properties.selectedList,
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
    //Calls the PropertyFieldSPListPicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldSPListPickerBuilder(targetProperty, newProperties);
}
exports.PropertyFieldSPListPicker = PropertyFieldSPListPicker;
//# sourceMappingURL=PropertyFieldSPListPicker.js.map