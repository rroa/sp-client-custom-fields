"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file PropertyFieldOfficeVideoPickerHost.tsx
 * Renders the controls for PropertyFieldOfficeVideoPicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Panel_1 = require("office-ui-fabric-react/lib/Panel");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
var GuidHelper_1 = require("./GuidHelper");
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
/**
 * @class
 * Renders the controls for PropertyFieldOfficeVideoPicker component
 */
var PropertyFieldOfficeVideoPickerHost = /** @class */ (function (_super) {
    __extends(PropertyFieldOfficeVideoPickerHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldOfficeVideoPickerHost(props) {
        var _this = _super.call(this, props) || this;
        //Bind the current object to the external called onSelectDate method
        _this.onTextFieldChanged = _this.onTextFieldChanged.bind(_this);
        _this.onOpenPanel = _this.onOpenPanel.bind(_this);
        _this.onClosePanel = _this.onClosePanel.bind(_this);
        _this.onEraseButton = _this.onEraseButton.bind(_this);
        _this.iFrameLoaded = _this.iFrameLoaded.bind(_this);
        _this.iFrameValidation = _this.iFrameValidation.bind(_this);
        //Inits the state
        _this.state = {
            iframeLoaded: false,
            selectedVideo: _this.props.initialValue,
            openPanel: false,
            openRecent: false,
            openSite: true,
            openUpload: false,
            recentImages: [],
            errorMessage: ''
        };
        _this.guid = GuidHelper_1.default.getGuid();
        _this.async = new Utilities_1.Async(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        return _this;
    }
    /**
     * @function
     * Save the image value
     *
     */
    PropertyFieldOfficeVideoPickerHost.prototype.saveVideoProperty = function (imageUrl) {
        this.delayedValidate(imageUrl);
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldOfficeVideoPickerHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.initialValue, value);
            return;
        }
        if (this.latestValidateValue === value)
            return;
        this.latestValidateValue = value;
        var result = this.props.onGetErrorMessage(value || '');
        if (result !== undefined) {
            if (typeof result === 'string') {
                if (result === undefined || result === '')
                    this.notifyAfterValidate(this.props.initialValue, value);
                this.state.errorMessage = result;
                this.setState(this.state);
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(_this.props.initialValue, value);
                    _this.state.errorMessage = errorMessage;
                    _this.setState(_this.state);
                });
            }
        }
        else {
            this.notifyAfterValidate(this.props.initialValue, value);
        }
    };
    /**
     * @function
     * Notifies the parent Web Part of a property value change
     */
    PropertyFieldOfficeVideoPickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
        if (this.props.onPropertyChange && newValue != null) {
            this.props.properties[this.props.targetProperty] = newValue;
            this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
            if (!this.props.disableReactivePropertyChanges && this.props.render != null)
                this.props.render();
        }
    };
    /**
     * @function
     * Click on erase button
     *
     */
    PropertyFieldOfficeVideoPickerHost.prototype.onEraseButton = function () {
        this.state.selectedVideo = '';
        this.setState(this.state);
        this.saveVideoProperty('');
    };
    /**
     * @function
     * Open the panel
     *
     */
    PropertyFieldOfficeVideoPickerHost.prototype.onOpenPanel = function (element) {
        this.state.openPanel = true;
        this.state.iframeLoaded = false;
        this.setState(this.state);
    };
    /**
     * @function
     * The text field value changed
     *
     */
    PropertyFieldOfficeVideoPickerHost.prototype.onTextFieldChanged = function (newValue) {
        this.state.selectedVideo = newValue;
        this.setState(this.state);
        this.saveVideoProperty(newValue);
    };
    /**
    * @function
    * Close the panel
    *
    */
    PropertyFieldOfficeVideoPickerHost.prototype.onClosePanel = function (element) {
        this.state.openPanel = false;
        this.setState(this.state);
    };
    PropertyFieldOfficeVideoPickerHost.prototype.componentDidUpdate = function (prevProps, prevState, prevContext) {
        var iframe = document.getElementById(this.guid);
        if (iframe != null && iframe != undefined) {
            if (iframe.addEventListener)
                iframe.addEventListener("load", this.iFrameLoaded, false);
            else
                iframe.attachEvent("onload", this.iFrameLoaded);
        }
    };
    PropertyFieldOfficeVideoPickerHost.prototype.iFrameLoaded = function () {
        var okButton = window.frames[this.guid].document.getElementById("ctl00_OkButton");
        okButton.onclick = '';
        okButton.addEventListener("click", this.iFrameValidation, false);
        var cancelButton = window.frames[this.guid].document.getElementById("CancelButton");
        cancelButton.onclick = '';
        cancelButton.addEventListener("click", this.onClosePanel, false);
        this.state.iframeLoaded = true;
        this.setState(this.state);
    };
    PropertyFieldOfficeVideoPickerHost.prototype.iFrameValidation = function () {
        var dialogResult = window.frames[this.guid].window.dialogResult;
        if (dialogResult == null)
            return;
        if (dialogResult.Url == null) {
            this.onClosePanel();
            return;
        }
        var vidUrl = dialogResult.Url;
        this.state.selectedVideo = vidUrl;
        this.setState(this.state);
        this.saveVideoProperty(vidUrl);
        this.onClosePanel();
    };
    /**
    * @function
    * When component is mount, attach the iframe event watcher
    *
    */
    PropertyFieldOfficeVideoPickerHost.prototype.componentDidMount = function () {
    };
    /**
    * @function
    * Releases the watcher
    *
    */
    PropertyFieldOfficeVideoPickerHost.prototype.componentWillUnmount = function () {
        if (this.async !== undefined)
            this.async.dispose();
    };
    /**
     * @function
     * Renders the controls
     */
    PropertyFieldOfficeVideoPickerHost.prototype.render = function () {
        var iframeUrl = this.props.context.pageContext.web.absoluteUrl;
        iframeUrl += '/portals/hub/_layouts/15/VideoAssetDialog.aspx?list=&IsDlg=1';
        //Renders content
        return (React.createElement("div", { style: { marginBottom: '8px' } },
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement("table", { style: { width: '100%', borderSpacing: 0 } },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", { width: "*" },
                            React.createElement(TextField_1.TextField, { disabled: this.props.disabled, value: this.state.selectedVideo, style: { width: '100%' }, onChanged: this.onTextFieldChanged, readOnly: this.props.readOnly })),
                        React.createElement("td", { width: "64" },
                            React.createElement("table", { style: { width: '100%', borderSpacing: 0 } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement(Button_1.IconButton, { disabled: this.props.disabled, iconProps: { iconName: 'FolderSearch' }, onClick: this.onOpenPanel })),
                                        React.createElement("td", null,
                                            React.createElement(Button_1.IconButton, { disabled: this.props.disabled === false && (this.state.selectedVideo != null && this.state.selectedVideo != '') ? false : true, iconProps: { iconName: 'Delete' }, onClick: this.onEraseButton }))))))))),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", null,
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : '',
            this.state.openPanel === true ?
                React.createElement(Panel_1.Panel, { isOpen: this.state.openPanel, hasCloseButton: true, onDismiss: this.onClosePanel, isLightDismiss: true, type: Panel_1.PanelType.large, headerText: this.props.panelTitle },
                    React.createElement("div", { style: { visibility: this.state.iframeLoaded === false ? 'visible' : 'hidden',
                            display: this.state.iframeLoaded === false ? 'block' : 'none',
                            height: this.state.iframeLoaded === false ? 'auto' : '0px' } },
                        React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.normal })),
                    React.createElement("div", { id: "site", style: { width: '100%', height: '700px' } },
                        React.createElement("iframe", { ref: "filePickerIFrame", style: {
                                width: '100%', borderWidth: '0',
                                visibility: this.state.iframeLoaded === true ? 'visible' : 'hidden',
                                display: this.state.iframeLoaded === true ? 'block' : 'none',
                                height: this.state.iframeLoaded === true ? '650px' : '0px'
                            }, role: "application", src: iframeUrl, id: this.guid, name: this.guid })))
                : ''));
    };
    return PropertyFieldOfficeVideoPickerHost;
}(React.Component));
exports.default = PropertyFieldOfficeVideoPickerHost;
//# sourceMappingURL=PropertyFieldOfficeVideoPickerHost.js.map