"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldSPListQuery.ts
 * Define a custom field of type PropertyFieldSPListQuery for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldSPListQueryHost_1 = require("./PropertyFieldSPListQueryHost");
var PropertyFieldSPListQueryOrderBy;
(function (PropertyFieldSPListQueryOrderBy) {
    PropertyFieldSPListQueryOrderBy[PropertyFieldSPListQueryOrderBy["Id"] = 0] = "Id";
    PropertyFieldSPListQueryOrderBy[PropertyFieldSPListQueryOrderBy["Title"] = 1] = "Title";
})(PropertyFieldSPListQueryOrderBy = exports.PropertyFieldSPListQueryOrderBy || (exports.PropertyFieldSPListQueryOrderBy = {}));
/**
 * @interface
 * Represents a PropertyFieldSPListQuery object
 *
 */
var PropertyFieldSPListQueryBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldSPListQueryBuilder(_targetProperty, _properties) {
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
        this.query = _properties.query;
        this.baseTemplate = _properties.baseTemplate;
        this.orderBy = _properties.orderBy;
        this.includeHidden = _properties.includeHidden;
        this.showOrderBy = _properties.showOrderBy;
        this.showMax = _properties.showMax;
        this.showFilters = _properties.showFilters;
        this.max = _properties.max;
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
    PropertyFieldSPListQueryBuilder.prototype.onPropertyChange = function (propertyPath, oldValue, newValue) { };
    /**
     * @function
     * Renders the SPListPicker field content
     */
    PropertyFieldSPListQueryBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldSPListQueryHost_1.default, {
            label: this.label,
            targetProperty: this.targetProperty,
            context: this.context,
            query: this.query,
            baseTemplate: this.baseTemplate,
            orderBy: this.orderBy,
            includeHidden: this.includeHidden,
            showOrderBy: this.showOrderBy,
            showMax: this.showMax,
            showFilters: this.showFilters,
            max: this.max,
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
    PropertyFieldSPListQueryBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldSPListQueryBuilder;
}());
/**
 * @function
 * Helper method to create a SPList Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint list picker is associated to.
 * @param properties - Strongly typed SPList Picker properties.
 */
function PropertyFieldSPListQuery(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        context: properties.context,
        query: properties.query,
        baseTemplate: properties.baseTemplate,
        orderBy: properties.orderBy,
        includeHidden: properties.includeHidden,
        showOrderBy: properties.showOrderBy,
        showMax: properties.showMax,
        showFilters: properties.showFilters,
        max: properties.max,
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
    //Calls the PropertyFieldSPListQuery builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldSPListQueryBuilder(targetProperty, newProperties);
}
exports.PropertyFieldSPListQuery = PropertyFieldSPListQuery;
//# sourceMappingURL=PropertyFieldSPListQuery.js.map