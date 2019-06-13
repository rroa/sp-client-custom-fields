"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldSortableList.ts
 * Define a custom field of type PropertyFieldSortableList for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldSortableListHost_1 = require("./PropertyFieldSortableListHost");
/**
 * @enum
 * Sortable List order by enum
 */
var ISortableListOrder;
(function (ISortableListOrder) {
    ISortableListOrder[ISortableListOrder["Key"] = 0] = "Key";
    ISortableListOrder[ISortableListOrder["Text"] = 1] = "Text";
})(ISortableListOrder = exports.ISortableListOrder || (exports.ISortableListOrder = {}));
/**
 * @interface
 * Represents a PropertyFieldSortableList object
 *
 */
var PropertyFieldSortableListBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldSortableListBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.sortBy = ISortableListOrder.Text;
        this.disabled = false;
        this.deferredValidationTime = 200;
        this.disableReactivePropertyChanges = false;
        this.render = this.render.bind(this);
        this.targetProperty = _targetProperty;
        this.properties = _properties;
        this.properties.onDispose = this.dispose;
        this.properties.onRender = this.render;
        this.label = _properties.label;
        this.items = _properties.items;
        this.selectedItems = _properties.selectedItems;
        this.onPropertyChange = _properties.onPropertyChange;
        this.customProperties = _properties.properties;
        this.key = _properties.key;
        if (_properties.disabled === true)
            this.disabled = _properties.disabled;
        this.onGetErrorMessage = _properties.onGetErrorMessage;
        if (_properties.deferredValidationTime !== undefined)
            this.deferredValidationTime = _properties.deferredValidationTime;
        if (_properties.sortBy !== undefined)
            this.sortBy = _properties.sortBy;
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
            this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }
    PropertyFieldSortableListBuilder.prototype.onPropertyChange = function (propertyPath, oldValue, newValue) { };
    /**
     * @function
     * Renders the SPListPicker field content
     */
    PropertyFieldSortableListBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldSortableListHost_1.default, {
            label: this.label,
            targetProperty: this.targetProperty,
            items: this.items,
            selectedItems: this.selectedItems,
            sortBy: this.sortBy,
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
    PropertyFieldSortableListBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldSortableListBuilder;
}());
/**
 * @function
 * Helper method to create a SPList Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint list picker is associated to.
 * @param properties - Strongly typed SPList Picker properties.
 */
function PropertyFieldSortableList(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        selectedItems: properties.selectedItems,
        items: properties.items,
        sortBy: properties.sortBy,
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
    //Calls the PropertyFieldSortableList builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldSortableListBuilder(targetProperty, newProperties);
}
exports.PropertyFieldSortableList = PropertyFieldSortableList;
//# sourceMappingURL=PropertyFieldSortableList.js.map