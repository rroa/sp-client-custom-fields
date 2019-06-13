"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldPeoplePicker.ts
 * Define a custom field of type PropertyFieldPeoplePicker for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldPeoplePickerHost_1 = require("./PropertyFieldPeoplePickerHost");
/**
 * @interface
 * Represents a PropertyFieldPeoplePicker object
 *
 */
var PropertyFieldPeoplePickerBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldPeoplePickerBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.allowDuplicate = true;
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
        this.allowDuplicate = _properties.allowDuplicate;
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
     * Renders the PeoplePicker field content
     */
    PropertyFieldPeoplePickerBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldPeoplePickerHost_1.default, {
            label: this.label,
            targetProperty: this.targetProperty,
            initialData: this.initialData,
            allowDuplicate: this.allowDuplicate,
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
    PropertyFieldPeoplePickerBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldPeoplePickerBuilder;
}());
/**
 * @function
 * Helper method to create a People Picker on the PropertyPane.
 * @param targetProperty - Target property the people picker is associated to.
 * @param properties - Strongly typed people Picker properties.
 */
function PropertyFieldPeoplePicker(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        onPropertyChange: properties.onPropertyChange,
        context: properties.context,
        initialData: properties.initialData,
        allowDuplicate: properties.allowDuplicate,
        properties: properties.properties,
        onDispose: null,
        onRender: null,
        key: properties.key,
        onGetErrorMessage: properties.onGetErrorMessage,
        deferredValidationTime: properties.deferredValidationTime,
        render: properties.render,
        disableReactivePropertyChanges: properties.disableReactivePropertyChanges
    };
    //Calls the PropertyFieldPeoplePicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldPeoplePickerBuilder(targetProperty, newProperties);
}
exports.PropertyFieldPeoplePicker = PropertyFieldPeoplePicker;
//# sourceMappingURL=PropertyFieldPeoplePicker.js.map