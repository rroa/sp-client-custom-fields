"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldTermSetPicker.ts
 * Define a custom field of type PropertyFieldTermSetPicker for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldTermSetPickerHost_1 = require("./PropertyFieldTermSetPickerHost");
/**
 * @interface
 * Represents a PropertyFieldTermSetPicker object
 *
 */
var PropertyFieldTermSetPickerBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldTermSetPickerBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.allowMultipleSelections = false;
        this.initialValues = [];
        this.excludeSystemGroup = false;
        this.excludeOfflineTermStores = false;
        this.displayOnlyTermSetsAvailableForTagging = false;
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
        this.onPropertyChange = _properties.onPropertyChange;
        this.customProperties = _properties.properties;
        this.key = _properties.key;
        if (_properties.disabled === true)
            this.disabled = _properties.disabled;
        this.onGetErrorMessage = _properties.onGetErrorMessage;
        if (_properties.deferredValidationTime !== undefined)
            this.deferredValidationTime = _properties.deferredValidationTime;
        if (_properties.allowMultipleSelections !== undefined)
            this.allowMultipleSelections = _properties.allowMultipleSelections;
        if (_properties.initialValues !== undefined)
            this.initialValues = _properties.initialValues;
        if (_properties.excludeSystemGroup !== undefined)
            this.excludeSystemGroup = _properties.excludeSystemGroup;
        if (_properties.excludeOfflineTermStores !== undefined)
            this.excludeOfflineTermStores = _properties.excludeOfflineTermStores;
        if (_properties.displayOnlyTermSetsAvailableForTagging !== undefined)
            this.displayOnlyTermSetsAvailableForTagging = _properties.displayOnlyTermSetsAvailableForTagging;
        this.panelTitle = _properties.panelTitle;
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
            this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }
    PropertyFieldTermSetPickerBuilder.prototype.onPropertyChange = function (propertyPath, oldValue, newValue) { };
    /**
     * @function
     * Renders the SPListPicker field content
     */
    PropertyFieldTermSetPickerBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldTermSetPickerHost_1.default, {
            label: this.label,
            targetProperty: this.targetProperty,
            panelTitle: this.panelTitle,
            allowMultipleSelections: this.allowMultipleSelections,
            initialValues: this.initialValues,
            excludeSystemGroup: this.excludeSystemGroup,
            excludeOfflineTermStores: this.excludeOfflineTermStores,
            displayOnlyTermSetsAvailableForTagging: this.displayOnlyTermSetsAvailableForTagging,
            context: this.context,
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
    PropertyFieldTermSetPickerBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldTermSetPickerBuilder;
}());
/**
 * @function
 * Helper method to create a SPList Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint list picker is associated to.
 * @param properties - Strongly typed SPList Picker properties.
 */
function PropertyFieldTermSetPicker(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        panelTitle: properties.panelTitle,
        allowMultipleSelections: properties.allowMultipleSelections,
        initialValues: properties.initialValues,
        excludeSystemGroup: properties.excludeSystemGroup,
        excludeOfflineTermStores: properties.excludeOfflineTermStores,
        displayOnlyTermSetsAvailableForTagging: properties.displayOnlyTermSetsAvailableForTagging,
        context: properties.context,
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
    //Calls the PropertyFieldTermSetPicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldTermSetPickerBuilder(targetProperty, newProperties);
}
exports.PropertyFieldTermSetPicker = PropertyFieldTermSetPicker;
//# sourceMappingURL=PropertyFieldTermSetPicker.js.map