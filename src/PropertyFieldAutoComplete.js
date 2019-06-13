"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldAutoComplete.ts
 * Define a custom field of type PropertyFieldAutoComplete for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldAutoCompleteHost_1 = require("./PropertyFieldAutoCompleteHost");
/**
 * @interface
 * Represents a PropertyFieldAutoComplete object
 *
 */
var PropertyFieldAutoCompleteBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldAutoCompleteBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.disabled = false;
        this.deferredValidationTime = 200;
        this.disableReactivePropertyChanges = false;
        this.render = this.render.bind(this);
        this.targetProperty = _properties.targetProperty;
        this.properties = _properties;
        this.label = _properties.label;
        this.initialValue = _properties.initialValue;
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
        this.suggestions = _properties.suggestions;
        this.placeHolder = _properties.placeHolder;
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
            this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }
    /**
     * @function
     * Renders the picker field content
     */
    PropertyFieldAutoCompleteBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldAutoCompleteHost_1.default, {
            label: this.label,
            initialValue: this.initialValue,
            targetProperty: this.targetProperty,
            suggestions: this.suggestions,
            placeHolder: this.placeHolder,
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
    PropertyFieldAutoCompleteBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldAutoCompleteBuilder;
}());
/**
 * @function
 * Helper method to create the customer field on the PropertyPane.
 * @param targetProperty - Target property the custom field is associated to.
 * @param properties - Strongly typed custom field properties.
 */
function PropertyFieldAutoComplete(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        initialValue: properties.initialValue,
        suggestions: properties.suggestions,
        placeHolder: properties.placeHolder,
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
    //Calls the PropertyFieldAutoComplete builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldAutoCompleteBuilder(targetProperty, newProperties);
}
exports.PropertyFieldAutoComplete = PropertyFieldAutoComplete;
//# sourceMappingURL=PropertyFieldAutoComplete.js.map