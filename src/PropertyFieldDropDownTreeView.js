"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldDropDownTreeView.ts
 * Define a custom field of type PropertyFieldDropDownTreeView for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldDropDownTreeViewHost_1 = require("./PropertyFieldDropDownTreeViewHost");
/**
 * @interface
 * Represents a PropertyFieldDropDownTreeView object
 *
 */
var PropertyFieldDropDownTreeViewBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldDropDownTreeViewBuilder(_targetProperty, _properties) {
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
     * Renders the field content
     */
    PropertyFieldDropDownTreeViewBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldDropDownTreeViewHost_1.default, {
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
    PropertyFieldDropDownTreeViewBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldDropDownTreeViewBuilder;
}());
/**
 * @function
 * Helper method to create a Font Picker on the PropertyPane.
 * @param targetProperty - Target property the Font picker is associated to.
 * @param properties - Strongly typed Font Picker properties.
 */
function PropertyFieldDropDownTreeView(targetProperty, properties) {
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
    //Calls the PropertyFieldDropDownTreeView builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldDropDownTreeViewBuilder(targetProperty, newProperties);
}
exports.PropertyFieldDropDownTreeView = PropertyFieldDropDownTreeView;
//# sourceMappingURL=PropertyFieldDropDownTreeView.js.map