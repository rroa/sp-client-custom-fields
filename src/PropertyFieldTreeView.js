"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldTreeView.ts
 * Define a custom field of type PropertyFieldTreeView for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldTreeViewHost_1 = require("./PropertyFieldTreeViewHost");
/**
 * @interface
 * Represents a PropertyFieldTreeView object
 *
 */
var PropertyFieldTreeViewBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldTreeViewBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.selectedNodesIDs = [];
        this.allowMultipleSelections = false;
        this.allowFoldersSelections = true;
        this.nodesPaddingLeft = 20;
        this.checkboxEnabled = true;
        this.disabled = false;
        this.deferredValidationTime = 200;
        this.disableReactivePropertyChanges = false;
        this.render = this.render.bind(this);
        this.targetProperty = _properties.targetProperty;
        this.properties = _properties;
        this.label = _properties.label;
        this.tree = _properties.tree;
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
        if (_properties.selectedNodesIDs !== undefined && _properties.selectedNodesIDs != null)
            this.selectedNodesIDs = _properties.selectedNodesIDs;
        if (_properties.allowMultipleSelections !== undefined)
            this.allowMultipleSelections = _properties.allowMultipleSelections;
        if (_properties.allowFoldersSelections !== undefined)
            this.allowFoldersSelections = _properties.allowFoldersSelections;
        if (_properties.nodesPaddingLeft !== undefined && _properties.nodesPaddingLeft != null)
            this.nodesPaddingLeft = _properties.nodesPaddingLeft;
        if (_properties.checkboxEnabled !== undefined && _properties.checkboxEnabled != null)
            this.checkboxEnabled = _properties.checkboxEnabled;
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
            this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }
    /**
     * @function
     * Renders the picker field content
     */
    PropertyFieldTreeViewBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldTreeViewHost_1.default, {
            label: this.label,
            tree: this.tree,
            selectedNodesIDs: this.selectedNodesIDs,
            allowMultipleSelections: this.allowMultipleSelections,
            allowFoldersSelections: this.allowFoldersSelections,
            nodesPaddingLeft: this.nodesPaddingLeft,
            checkboxEnabled: this.checkboxEnabled,
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
    PropertyFieldTreeViewBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldTreeViewBuilder;
}());
/**
 * @function
 * Helper method to create the customer field on the PropertyPane.
 * @param targetProperty - Target property the custom field is associated to.
 * @param properties - Strongly typed custom field properties.
 */
function PropertyFieldTreeView(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        tree: properties.tree,
        selectedNodesIDs: properties.selectedNodesIDs,
        allowMultipleSelections: properties.allowMultipleSelections,
        allowFoldersSelections: properties.allowFoldersSelections,
        nodesPaddingLeft: properties.nodesPaddingLeft,
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
    //Calls the PropertyFieldTreeView builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldTreeViewBuilder(targetProperty, newProperties);
}
exports.PropertyFieldTreeView = PropertyFieldTreeView;
//# sourceMappingURL=PropertyFieldTreeView.js.map