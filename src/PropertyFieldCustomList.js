"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldCustomList.ts
 * Define a custom field of type PropertyFieldCustomList for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldCustomListHost_1 = require("./PropertyFieldCustomListHost");
var CustomListFieldType;
(function (CustomListFieldType) {
    CustomListFieldType[CustomListFieldType["string"] = 0] = "string";
    CustomListFieldType[CustomListFieldType["number"] = 1] = "number";
    CustomListFieldType[CustomListFieldType["date"] = 2] = "date";
    CustomListFieldType[CustomListFieldType["boolean"] = 3] = "boolean";
    CustomListFieldType[CustomListFieldType["dateTime"] = 4] = "dateTime";
    CustomListFieldType[CustomListFieldType["font"] = 5] = "font";
    CustomListFieldType[CustomListFieldType["fontSize"] = 6] = "fontSize";
    CustomListFieldType[CustomListFieldType["color"] = 7] = "color";
    CustomListFieldType[CustomListFieldType["icon"] = 8] = "icon";
    CustomListFieldType[CustomListFieldType["password"] = 9] = "password";
    CustomListFieldType[CustomListFieldType["picture"] = 10] = "picture";
    CustomListFieldType[CustomListFieldType["document"] = 11] = "document";
    CustomListFieldType[CustomListFieldType["list"] = 12] = "list";
    CustomListFieldType[CustomListFieldType["users"] = 13] = "users";
    CustomListFieldType[CustomListFieldType["folder"] = 14] = "folder";
    CustomListFieldType[CustomListFieldType["sharePointGroups"] = 15] = "sharePointGroups";
    CustomListFieldType[CustomListFieldType["securityGroups"] = 16] = "securityGroups";
    CustomListFieldType[CustomListFieldType["officeVideo"] = 17] = "officeVideo";
    CustomListFieldType[CustomListFieldType["stars"] = 18] = "stars";
    CustomListFieldType[CustomListFieldType["colorMini"] = 19] = "colorMini";
})(CustomListFieldType = exports.CustomListFieldType || (exports.CustomListFieldType = {}));
/**
 * @interface
 * Represents a PropertyFieldCustomList object
 *
 */
var PropertyFieldCustomListBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldCustomListBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.disabled = false;
        this.disableReactivePropertyChanges = false;
        this.render = this.render.bind(this);
        this.targetProperty = _properties.targetProperty;
        this.properties = _properties;
        this.label = _properties.label;
        this.value = _properties.value;
        this.fields = _properties.fields;
        this.headerText = _properties.headerText;
        this.context = _properties.context;
        this.properties.onDispose = this.dispose;
        this.properties.onRender = this.render;
        this.onPropertyChange = _properties.onPropertyChange;
        this.customProperties = _properties.properties;
        this.key = _properties.key;
        if (_properties.disabled === true)
            this.disabled = _properties.disabled;
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
            this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }
    /**
     * @function
     * Renders the ColorPicker field content
     */
    PropertyFieldCustomListBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldCustomListHost_1.default, {
            label: this.label,
            value: this.value,
            headerText: this.headerText,
            fields: this.fields,
            targetProperty: this.targetProperty,
            onDispose: this.dispose,
            onRender: this.render,
            onPropertyChange: this.onPropertyChange,
            context: this.context,
            properties: this.customProperties,
            key: this.key,
            disabled: this.disabled,
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
    PropertyFieldCustomListBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldCustomListBuilder;
}());
/**
 * @function
 * Helper method to create the customer field on the PropertyPane.
 * @param targetProperty - Target property the custom field is associated to.
 * @param properties - Strongly typed custom field properties.
 */
function PropertyFieldCustomList(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        headerText: properties.headerText,
        value: properties.value,
        fields: properties.fields,
        onPropertyChange: properties.onPropertyChange,
        properties: properties.properties,
        context: properties.context,
        onDispose: null,
        onRender: null,
        key: properties.key,
        disabled: properties.disabled,
        render: properties.render,
        disableReactivePropertyChanges: properties.disableReactivePropertyChanges
    };
    //Calls the PropertyFieldCustomList builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldCustomListBuilder(targetProperty, newProperties);
}
exports.PropertyFieldCustomList = PropertyFieldCustomList;
//# sourceMappingURL=PropertyFieldCustomList.js.map