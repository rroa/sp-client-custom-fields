"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldSliderRange.ts
 * Define a custom field of type PropertyFieldSliderRange for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldSliderRangeHost_1 = require("./PropertyFieldSliderRangeHost");
var sp_loader_1 = require("@microsoft/sp-loader");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
/**
 * @interface
 * Represents a PropertyFieldSliderRange object
 *
 */
var PropertyFieldSliderRangeBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldSliderRangeBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.deferredValidationTime = 200;
        this.disableReactivePropertyChanges = false;
        this.render = this.render.bind(this);
        this.targetProperty = _properties.targetProperty;
        this.properties = _properties;
        this.label = _properties.label;
        this.initialValue = _properties.initialValue;
        this.disabled = _properties.disabled;
        this.min = _properties.min;
        this.max = _properties.max;
        this.step = _properties.step;
        this.showValue = _properties.showValue;
        this.orientation = _properties.orientation;
        this.guid = _properties.guid;
        this.properties.onDispose = this.dispose;
        this.properties.onRender = this.render;
        this.onPropertyChange = _properties.onPropertyChange;
        this.customProperties = _properties.properties;
        this.key = _properties.key;
        this.onGetErrorMessage = _properties.onGetErrorMessage;
        if (_properties.deferredValidationTime !== undefined)
            this.deferredValidationTime = _properties.deferredValidationTime;
        this.renderWebPart = _properties.render;
        if (_properties.disableReactivePropertyChanges !== undefined && _properties.disableReactivePropertyChanges != null)
            this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
        this.async = new Utilities_1.Async(this);
        this.validate = this.validate.bind(this);
        this.notifyAfterValidate = this.notifyAfterValidate.bind(this);
        this.delayedValidate = this.async.debounce(this.validate, this.deferredValidationTime);
        sp_loader_1.SPComponentLoader.loadCss('//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css');
    }
    /**
     * @function
     * Renders the ColorPicker field content
     */
    PropertyFieldSliderRangeBuilder.prototype.render = function (elem) {
        var _this = this;
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldSliderRangeHost_1.default, {
            label: this.label,
            initialValue: this.initialValue,
            targetProperty: this.targetProperty,
            disabled: this.disabled,
            min: this.min,
            max: this.max,
            step: this.step,
            orientation: this.orientation,
            showValue: this.showValue,
            onDispose: this.dispose,
            onRender: this.render,
            onPropertyChange: this.onPropertyChange,
            guid: this.guid,
            properties: this.customProperties,
            key: this.key,
            onGetErrorMessage: this.onGetErrorMessage,
            deferredValidationTime: this.deferredValidationTime,
            render: this.renderWebPart,
            disableReactivePropertyChanges: this.disableReactivePropertyChanges
        });
        //Calls the REACT content generator
        ReactDom.render(element, elem);
        var jQueryCdn = '//cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js';
        var jQueryUICdn = '//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js';
        sp_loader_1.SPComponentLoader.loadScript(jQueryCdn, { globalExportsName: '$' }).then(function ($) {
            sp_loader_1.SPComponentLoader.loadScript(jQueryUICdn, { globalExportsName: '$' }).then(function (jqueryui) {
                $('#' + _this.guid + '-slider').slider({
                    range: true,
                    min: _this.min != null ? _this.min : 0,
                    max: _this.max != null ? _this.max : 100,
                    step: _this.step != null ? _this.step : 1,
                    disabled: _this.disabled != null ? _this.disabled : false,
                    orientation: _this.orientation != null ? _this.orientation : 'horizontal',
                    values: (_this.initialValue != null && _this.initialValue != '' && _this.initialValue.split(",").length == 2) ? [Number(_this.initialValue.split(",")[0]), Number(_this.initialValue.split(",")[1])] : [_this.min, _this.max],
                    slide: function (event, ui) {
                        var value = ui.values[0] + "," + ui.values[1];
                        this.delayedValidate(value);
                        /*if (this.onPropertyChange && value != null) {
                          this.customProperties[this.targetProperty] = value;
                          this.onPropertyChange(this.targetProperty, this.initialValue, value);
                        }*/
                        $('#' + this.guid + '-min').html(ui.values[0]);
                        $('#' + this.guid + '-max').html(ui.values[1]);
                    }.bind(_this)
                });
            });
        });
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldSliderRangeBuilder.prototype.validate = function (value) {
        var _this = this;
        if (this.onGetErrorMessage === null || this.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.initialValue, value);
            return;
        }
        if (this.latestValidateValue === value)
            return;
        this.latestValidateValue = value;
        var result = this.onGetErrorMessage(value || '');
        if (result !== undefined) {
            if (typeof result === 'string') {
                if (result === undefined || result === '')
                    this.notifyAfterValidate(this.initialValue, value);
                (document.getElementById(this.guid + '-errorMssg1')).innerHTML = result;
                (document.getElementById(this.guid + '-errorMssg2')).innerHTML = result;
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(_this.initialValue, value);
                    (document.getElementById(_this.guid + '-errorMssg1')).innerHTML = errorMessage;
                    (document.getElementById(_this.guid + '-errorMssg2')).innerHTML = errorMessage;
                });
            }
        }
        else {
            this.notifyAfterValidate(this.initialValue, value);
        }
    };
    /**
     * @function
     * Notifies the parent Web Part of a property value change
     */
    PropertyFieldSliderRangeBuilder.prototype.notifyAfterValidate = function (oldValue, newValue) {
        if (this.onPropertyChange && newValue != null) {
            this.customProperties[this.targetProperty] = newValue;
            this.onPropertyChange(this.targetProperty, this.properties.initialValue, newValue);
            if (!this.disableReactivePropertyChanges && this.renderWebPart != null)
                this.renderWebPart();
        }
    };
    /**
     * @function
     * Disposes the current object
     */
    PropertyFieldSliderRangeBuilder.prototype.dispose = function (elem) {
        if (this.async !== undefined)
            this.async.dispose();
    };
    return PropertyFieldSliderRangeBuilder;
}());
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
function getGuid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
/**
 * @function
 * Helper method to create the customer field on the PropertyPane.
 * @param targetProperty - Target property the custom field is associated to.
 * @param properties - Strongly typed custom field properties.
 */
function PropertyFieldSliderRange(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        initialValue: properties.initialValue,
        disabled: properties.disabled,
        min: properties.min,
        max: properties.max,
        step: properties.step,
        showValue: properties.showValue,
        orientation: properties.orientation,
        guid: getGuid(),
        onPropertyChange: properties.onPropertyChange,
        properties: properties.properties,
        onDispose: null,
        onRender: null,
        key: properties.key,
        onGetErrorMessage: properties.onGetErrorMessage,
        deferredValidationTime: properties.deferredValidationTime,
        render: properties.render,
        disableReactivePropertyChanges: properties.disableReactivePropertyChanges
    };
    //Calls the PropertyFieldSliderRange builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldSliderRangeBuilder(targetProperty, newProperties);
}
exports.PropertyFieldSliderRange = PropertyFieldSliderRange;
//# sourceMappingURL=PropertyFieldSliderRange.js.map