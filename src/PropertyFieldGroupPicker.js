"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldGroupPicker.ts
 * Define a custom field of type PropertyFieldGroupPicker for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldGroupPickerHost_1 = require("./PropertyFieldGroupPickerHost");
/**
 * @enum
 * Group type
 */
var IGroupType;
(function (IGroupType) {
    /**
     * SharePoint Group
     */
    IGroupType[IGroupType["SharePoint"] = 0] = "SharePoint";
    /**
     * Security Group
     */
    IGroupType[IGroupType["Security"] = 1] = "Security";
})(IGroupType = exports.IGroupType || (exports.IGroupType = {}));
/**
 * @interface
 * Represents a PropertyFieldGroupPicker object
 *
 */
var PropertyFieldGroupPickerBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldGroupPickerBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.allowDuplicate = false;
        this.deferredValidationTime = 200;
        this.disableReactivePropertyChanges = false;
        this.render = this.render.bind(this);
        this.label = _properties.label;
        this.targetProperty = _properties.targetProperty;
        this.properties = _properties;
        this.properties.onDispose = this.dispose;
        this.properties.onRender = this.render;
        this.onPropertyChange = _properties.onPropertyChange;
        this.context = _properties.context;
        this.initialData = _properties.initialData;
        this.customProperties = _properties.properties;
        this.key = _properties.key;
        this.onGetErrorMessage = _properties.onGetErrorMessage;
        if (_properties.deferredValidationTime !== undefined)
            this.deferredValidationTime = _properties.deferredValidationTime;
        this.groupType = _properties.groupType;
        if (_properties.allowDuplicate !== undefined)
            this.allowDuplicate = _properties.allowDuplicate;
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
            this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }
    /**
     * @function
     * Renders the PeoplePicker field content
     */
    PropertyFieldGroupPickerBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldGroupPickerHost_1.default, {
            label: this.label,
            targetProperty: this.targetProperty,
            initialData: this.initialData,
            allowDuplicate: this.allowDuplicate,
            groupType: this.groupType,
            onDispose: this.dispose,
            onRender: this.render,
            onPropertyChange: this.onPropertyChange,
            context: this.context,
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
    PropertyFieldGroupPickerBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldGroupPickerBuilder;
}());
/**
 * @function
 * Helper method to create a People Picker on the PropertyPane.
 * @param targetProperty - Target property the people picker is associated to.
 * @param properties - Strongly typed people Picker properties.
 */
function PropertyFieldGroupPicker(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        onPropertyChange: properties.onPropertyChange,
        context: properties.context,
        initialData: properties.initialData,
        allowDuplicate: properties.allowDuplicate,
        groupType: properties.groupType,
        properties: properties.properties,
        onDispose: null,
        onRender: null,
        key: properties.key,
        onGetErrorMessage: properties.onGetErrorMessage,
        deferredValidationTime: properties.deferredValidationTime,
        render: properties.render,
        disableReactivePropertyChanges: properties.disableReactivePropertyChanges
    };
    //Calls the PropertyFieldGroupPicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldGroupPickerBuilder(targetProperty, newProperties);
}
exports.PropertyFieldGroupPicker = PropertyFieldGroupPicker;
//# sourceMappingURL=PropertyFieldGroupPicker.js.map