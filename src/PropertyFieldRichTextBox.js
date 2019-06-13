"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldRichTextBox.ts
 * Define a custom field of type PropertyFieldRichTextBox for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldRichTextBoxHost_1 = require("./PropertyFieldRichTextBoxHost");
var sp_loader_1 = require("@microsoft/sp-loader");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
/**
 * @interface
 * Represents a PropertyFieldRichTextBox object
 *
 */
var PropertyFieldRichTextBoxBuilder = /** @class */ (function () {
    /**
     * @function
     * Ctor
     */
    function PropertyFieldRichTextBoxBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.disabled = false;
        this.deferredValidationTime = 200;
        this.disableReactivePropertyChanges = false;
        this.render = this.render.bind(this);
        this.targetProperty = _properties.targetProperty;
        this.properties = _properties;
        this.label = _properties.label;
        this.mode = _properties.mode;
        this.inline = _properties.inline;
        this.initialValue = _properties.initialValue;
        this.properties.onDispose = this.dispose;
        this.properties.onRender = this.render;
        this.minHeight = this.minHeight;
        this.onPropertyChange = _properties.onPropertyChange;
        this.render = this.render.bind(this);
        this.customProperties = _properties.properties;
        this.key = _properties.key;
        this.keyCopy = _properties.key;
        this.context = _properties.context;
        if (_properties.disabled === true)
            this.disabled = _properties.disabled;
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
    }
    /**
     * @function
     * Renders the ColorPicker field content
     */
    PropertyFieldRichTextBoxBuilder.prototype.render = function (elem) {
        var _this = this;
        //Construct the JSX properties
        var element = React.createElement(PropertyFieldRichTextBoxHost_1.default, {
            label: this.label,
            initialValue: this.initialValue,
            targetProperty: this.targetProperty,
            mode: this.mode,
            inline: this.inline,
            minHeight: this.minHeight,
            onDispose: this.dispose,
            onRender: this.render,
            onPropertyChange: this.onPropertyChange,
            properties: this.customProperties,
            key: this.keyCopy,
            keyCopy: this.keyCopy,
            context: this.context,
            disabled: this.disabled,
            onGetErrorMessage: this.onGetErrorMessage,
            deferredValidationTime: this.deferredValidationTime,
            render: this.renderWebPart,
            disableReactivePropertyChanges: this.disableReactivePropertyChanges
        });
        //Calls the REACT content generator
        ReactDom.render(element, elem);
        var fMode = 'basic';
        if (this.mode != null)
            fMode = this.mode;
        var ckEditorCdn = '//cdn.ckeditor.com/4.6.2/{0}/ckeditor.js'.replace("{0}", fMode);
        //Checks if the web part is loaded or reloaded to reload the CKEditor
        var shouldReloadCKEditor = false;
        if (PropertyFieldRichTextBoxBuilder.CURRENT_WEBPART_INSTANCE !== this.context.instanceId) {
            shouldReloadCKEditor = true;
            PropertyFieldRichTextBoxBuilder.FIELD_KEY_INSTANCES = [];
            PropertyFieldRichTextBoxBuilder.CURRENT_WEBPART_INSTANCE = this.context.instanceId;
        }
        if (!shouldReloadCKEditor) {
            //The web part has been already loaded, but check if the current field must recall CKEditor
            if (PropertyFieldRichTextBoxBuilder.FIELD_KEY_INSTANCES[this.key] == null) {
                shouldReloadCKEditor = true;
            }
        }
        PropertyFieldRichTextBoxBuilder.FIELD_KEY_INSTANCES[this.key] = true;
        sp_loader_1.SPComponentLoader.loadScript(ckEditorCdn, { globalExportsName: 'CKEDITOR' }).then(function (CKEDITOR) {
            if (shouldReloadCKEditor || CKEDITOR.instances[_this.key + '-' + _this.context.instanceId + '-editor'] == null) {
                if (_this.inline == null || _this.inline === false) {
                    CKEDITOR.replace(_this.key + '-' + _this.context.instanceId + '-editor', {
                        skin: 'moono-lisa,//cdn.ckeditor.com/4.6.2/full-all/skins/moono-lisa/'
                    });
                }
                else {
                    CKEDITOR.inline(_this.key + '-' + _this.context.instanceId + '-editor', {
                        skin: 'moono-lisa,//cdn.ckeditor.com/4.6.2/full-all/skins/moono-lisa/'
                    });
                }
                for (var i in CKEDITOR.instances) {
                    CKEDITOR.instances[i].on('change', function (elm, val) {
                        CKEDITOR.instances[i].updateElement();
                        var value = (document.getElementById(_this.key + '-' + _this.context.instanceId + '-editor')).value;
                        _this.delayedValidate(value);
                    });
                }
            }
        });
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldRichTextBoxBuilder.prototype.validate = function (value) {
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
                (document.getElementById(this.key + '-' + this.context.instanceId + '-errorMssg1')).innerHTML = result;
                (document.getElementById(this.key + '-' + this.context.instanceId + '-errorMssg2')).innerHTML = result;
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(_this.initialValue, value);
                    (document.getElementById(_this.key + '-' + _this.context.instanceId + '-errorMssg1')).innerHTML = errorMessage;
                    (document.getElementById(_this.key + '-' + _this.context.instanceId + '-errorMssg2')).innerHTML = errorMessage;
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
    PropertyFieldRichTextBoxBuilder.prototype.notifyAfterValidate = function (oldValue, newValue) {
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
    PropertyFieldRichTextBoxBuilder.prototype.dispose = function (elem) {
        if (this.async != null && this.async != undefined)
            this.async.dispose();
    };
    //Static helper to manage load state
    PropertyFieldRichTextBoxBuilder.CURRENT_WEBPART_INSTANCE = null;
    PropertyFieldRichTextBoxBuilder.FIELD_KEY_INSTANCES = [];
    return PropertyFieldRichTextBoxBuilder;
}());
/**
 * @function
 * Helper method to create the customer field on the PropertyPane.
 * @param targetProperty - Target property the custom field is associated to.
 * @param properties - Strongly typed custom field properties.
 */
function PropertyFieldRichTextBox(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        initialValue: properties.initialValue,
        mode: properties.mode,
        inline: properties.inline,
        minHeight: properties.minHeight,
        onPropertyChange: properties.onPropertyChange,
        properties: properties.properties,
        onDispose: null,
        onRender: null,
        key: properties.key,
        context: properties.context,
        disabled: properties.disabled,
        onGetErrorMessage: properties.onGetErrorMessage,
        deferredValidationTime: properties.deferredValidationTime,
        render: properties.render,
        disableReactivePropertyChanges: properties.disableReactivePropertyChanges
    };
    //Calls the PropertyFieldRichTextBox builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldRichTextBoxBuilder(targetProperty, newProperties);
}
exports.PropertyFieldRichTextBox = PropertyFieldRichTextBox;
//# sourceMappingURL=PropertyFieldRichTextBox.js.map