"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldPhoneNumber.ts
 * Define a custom field of type PropertyFieldPhoneNumber for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldPhoneNumberHost_1 = require("./PropertyFieldPhoneNumberHost");
var IPhoneNumberFormat;
(function (IPhoneNumberFormat) {
    IPhoneNumberFormat[IPhoneNumberFormat["UnitedStates"] = 0] = "UnitedStates";
    IPhoneNumberFormat[IPhoneNumberFormat["UK"] = 1] = "UK";
    IPhoneNumberFormat[IPhoneNumberFormat["France"] = 2] = "France";
    IPhoneNumberFormat[IPhoneNumberFormat["Mexico"] = 3] = "Mexico";
    IPhoneNumberFormat[IPhoneNumberFormat["Australia"] = 4] = "Australia";
    IPhoneNumberFormat[IPhoneNumberFormat["Denmark"] = 6] = "Denmark";
    IPhoneNumberFormat[IPhoneNumberFormat["Iceland"] = 7] = "Iceland";
    IPhoneNumberFormat[IPhoneNumberFormat["Canada"] = 8] = "Canada";
    IPhoneNumberFormat[IPhoneNumberFormat["Quebec"] = 9] = "Quebec";
    IPhoneNumberFormat[IPhoneNumberFormat["NorwayLandLine"] = 10] = "NorwayLandLine";
    IPhoneNumberFormat[IPhoneNumberFormat["NorwayMobile"] = 11] = "NorwayMobile";
    IPhoneNumberFormat[IPhoneNumberFormat["Portugal"] = 12] = "Portugal";
    IPhoneNumberFormat[IPhoneNumberFormat["PolandLandLine"] = 13] = "PolandLandLine";
    IPhoneNumberFormat[IPhoneNumberFormat["PolandMobile"] = 14] = "PolandMobile";
    IPhoneNumberFormat[IPhoneNumberFormat["Spain"] = 15] = "Spain";
    IPhoneNumberFormat[IPhoneNumberFormat["Switzerland"] = 16] = "Switzerland";
    IPhoneNumberFormat[IPhoneNumberFormat["Turkey"] = 17] = "Turkey";
    IPhoneNumberFormat[IPhoneNumberFormat["Russian"] = 18] = "Russian";
    IPhoneNumberFormat[IPhoneNumberFormat["Germany"] = 19] = "Germany";
    IPhoneNumberFormat[IPhoneNumberFormat["BelgiumLandLine"] = 20] = "BelgiumLandLine";
    IPhoneNumberFormat[IPhoneNumberFormat["BelgiumMobile"] = 21] = "BelgiumMobile";
    IPhoneNumberFormat[IPhoneNumberFormat["Pakistan"] = 22] = "Pakistan";
    IPhoneNumberFormat[IPhoneNumberFormat["IndiaLandLine"] = 23] = "IndiaLandLine";
    IPhoneNumberFormat[IPhoneNumberFormat["IndiaMobile"] = 24] = "IndiaMobile";
    IPhoneNumberFormat[IPhoneNumberFormat["ChinaLandLine"] = 25] = "ChinaLandLine";
    IPhoneNumberFormat[IPhoneNumberFormat["ChinaMobile"] = 26] = "ChinaMobile";
    IPhoneNumberFormat[IPhoneNumberFormat["HongKong"] = 27] = "HongKong";
    IPhoneNumberFormat[IPhoneNumberFormat["Japan"] = 28] = "Japan";
    IPhoneNumberFormat[IPhoneNumberFormat["Malaysia"] = 29] = "Malaysia";
    IPhoneNumberFormat[IPhoneNumberFormat["Philippines"] = 30] = "Philippines";
    IPhoneNumberFormat[IPhoneNumberFormat["Singapore"] = 31] = "Singapore";
    IPhoneNumberFormat[IPhoneNumberFormat["TaiwanLandLine"] = 32] = "TaiwanLandLine";
    IPhoneNumberFormat[IPhoneNumberFormat["TaiwanMobile"] = 33] = "TaiwanMobile";
    IPhoneNumberFormat[IPhoneNumberFormat["SouthKoreaMobile"] = 34] = "SouthKoreaMobile";
    IPhoneNumberFormat[IPhoneNumberFormat["NewZealand"] = 35] = "NewZealand";
    IPhoneNumberFormat[IPhoneNumberFormat["CostaRica"] = 36] = "CostaRica";
    IPhoneNumberFormat[IPhoneNumberFormat["ElSalvador"] = 37] = "ElSalvador";
    IPhoneNumberFormat[IPhoneNumberFormat["Guatemala"] = 38] = "Guatemala";
    IPhoneNumberFormat[IPhoneNumberFormat["HondurasLandLine"] = 39] = "HondurasLandLine";
    IPhoneNumberFormat[IPhoneNumberFormat["HondurasMobile"] = 40] = "HondurasMobile";
    IPhoneNumberFormat[IPhoneNumberFormat["BrazilLandLine"] = 41] = "BrazilLandLine";
    IPhoneNumberFormat[IPhoneNumberFormat["BrazilMobile"] = 42] = "BrazilMobile";
    IPhoneNumberFormat[IPhoneNumberFormat["Peru"] = 43] = "Peru";
})(IPhoneNumberFormat = exports.IPhoneNumberFormat || (exports.IPhoneNumberFormat = {}));
/**
 * @interface
 * Represents a PropertyFieldPhoneNumber object
 *
 */
var PropertyFieldPhoneNumberBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldPhoneNumberBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.disabled = false;
        this.deferredValidationTime = 200;
        this.disableReactivePropertyChanges = false;
        this.render = this.render.bind(this);
        this.targetProperty = _properties.targetProperty;
        this.properties = _properties;
        this.label = _properties.label;
        this.phoneNumberFormat = _properties.phoneNumberFormat;
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
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
            this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }
    /**
     * @function
     * Renders the ColorPicker field content
     */
    PropertyFieldPhoneNumberBuilder.prototype.render = function (elem) {
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldPhoneNumberHost_1.default, {
            label: this.label,
            initialValue: this.initialValue,
            phoneNumberFormat: this.phoneNumberFormat,
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
    PropertyFieldPhoneNumberBuilder.prototype.dispose = function (elem) {
    };
    return PropertyFieldPhoneNumberBuilder;
}());
/**
 * @function
 * Helper method to create the customer field on the PropertyPane.
 * @param targetProperty - Target property the custom field is associated to.
 * @param properties - Strongly typed custom field properties.
 */
function PropertyFieldPhoneNumber(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        phoneNumberFormat: properties.phoneNumberFormat,
        initialValue: properties.initialValue,
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
    //Calls the PropertyFieldPhoneNumber builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldPhoneNumberBuilder(targetProperty, newProperties);
}
exports.PropertyFieldPhoneNumber = PropertyFieldPhoneNumber;
//# sourceMappingURL=PropertyFieldPhoneNumber.js.map