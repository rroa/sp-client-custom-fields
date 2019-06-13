"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldStarRating.ts
 * Define a custom field of type PropertyFieldStarRating for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldStarRatingHost_1 = require("./PropertyFieldStarRatingHost");
/**
 * @interface
 * Represents a PropertyFieldStarRating object
 *
 */
var PropertyFieldStarRatingBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldStarRatingBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.starCount = 5;
        this.starSize = 24;
        this.starColor = '#ffb400';
        this.emptyStarColor = '#333';
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
        if (_properties.starCount !== undefined)
            this.starCount = _properties.starCount;
        if (_properties.starColor !== undefined)
            this.starColor = _properties.starColor;
        if (_properties.emptyStarColor !== undefined)
            this.emptyStarColor = _properties.emptyStarColor;
        if (_properties.starSize !== undefined)
            this.starSize = _properties.starSize;
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
            this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }
    /**
     * @function
     * Renders the picker field content
     */
    PropertyFieldStarRatingBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldStarRatingHost_1.default, {
            label: this.label,
            initialValue: this.initialValue,
            starCount: this.starCount,
            starColor: this.starColor,
            emptyStarColor: this.emptyStarColor,
            starSize: this.starSize,
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
    PropertyFieldStarRatingBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldStarRatingBuilder;
}());
/**
 * @function
 * Helper method to create the customer field on the PropertyPane.
 * @param targetProperty - Target property the custom field is associated to.
 * @param properties - Strongly typed custom field properties.
 */
function PropertyFieldStarRating(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        initialValue: properties.initialValue,
        starCount: properties.starCount,
        starColor: properties.starColor,
        starSize: properties.starSize,
        emptyStarColor: properties.emptyStarColor,
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
    //Calls the PropertyFieldStarRating builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldStarRatingBuilder(targetProperty, newProperties);
}
exports.PropertyFieldStarRating = PropertyFieldStarRating;
//# sourceMappingURL=PropertyFieldStarRating.js.map