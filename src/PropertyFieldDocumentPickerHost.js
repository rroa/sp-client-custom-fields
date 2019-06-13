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
 * @file PropertyFieldDocumentPickerHost.tsx
 * Renders the controls for PropertyFieldDocumentPicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Panel_1 = require("office-ui-fabric-react/lib/Panel");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
var strings = require("sp-client-custom-fields/strings");
/**
 * @class
 * Renders the controls for PropertyFieldDocumentPicker component
 */
var PropertyFieldDocumentPickerHost = /** @class */ (function (_super) {
    __extends(PropertyFieldDocumentPickerHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldDocumentPickerHost(props) {
        var _this = _super.call(this, props) || this;
        //Bind the current object to the external called onSelectDate method
        _this.onTextFieldChanged = _this.onTextFieldChanged.bind(_this);
        _this.onOpenPanel = _this.onOpenPanel.bind(_this);
        _this.onClosePanel = _this.onClosePanel.bind(_this);
        _this.onClickRecent = _this.onClickRecent.bind(_this);
        _this.onClickSite = _this.onClickSite.bind(_this);
        _this.onClickUpload = _this.onClickUpload.bind(_this);
        _this.handleIframeData = _this.handleIframeData.bind(_this);
        _this.onEraseButton = _this.onEraseButton.bind(_this);
        //Inits the state
        _this.state = {
            selectedImage: _this.props.initialValue,
            openPanel: false,
            openRecent: false,
            openSite: true,
            openUpload: false,
            recentImages: [],
            errorMessage: ''
        };
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
    PropertyFieldDocumentPickerHost.prototype.saveImageProperty = function (imageUrl) {
        this.delayedValidate(imageUrl);
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldDocumentPickerHost.prototype.validate = function (value) {
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
    PropertyFieldDocumentPickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
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
    PropertyFieldDocumentPickerHost.prototype.onEraseButton = function () {
        this.state.selectedImage = '';
        this.setState(this.state);
        this.saveImageProperty('');
    };
    /**
    * @function
    * Open the panel
    *
    */
    PropertyFieldDocumentPickerHost.prototype.onOpenPanel = function (element) {
        this.state.openPanel = true;
        this.setState(this.state);
    };
    /**
    * @function
    * The text field value changed
    *
    */
    PropertyFieldDocumentPickerHost.prototype.onTextFieldChanged = function (newValue) {
        this.state.selectedImage = newValue;
        this.setState(this.state);
        this.saveImageProperty(newValue);
    };
    /**
    * @function
    * Close the panel
    *
    */
    PropertyFieldDocumentPickerHost.prototype.onClosePanel = function (element) {
        this.state.openPanel = false;
        this.setState(this.state);
    };
    PropertyFieldDocumentPickerHost.prototype.onClickRecent = function (element) {
        //this.state.openRecent = true;
        //this.state.openSite = false;
        //this.state.openUpload = false;
        //this.setState(this.state);
    };
    /**
    * @function
    * Intercepts the iframe onedrive messages
    *
    */
    PropertyFieldDocumentPickerHost.prototype.handleIframeData = function (element) {
        if (this.state.openSite != true || this.state.openPanel != true)
            return;
        var data = element.data;
        var indexOfPicker = data.indexOf("[OneDrive-FromPicker]");
        if (indexOfPicker != -1) {
            var message = data.replace("[OneDrive-FromPicker]", "");
            var messageObject = JSON.parse(message);
            if (messageObject.type == "cancel") {
                this.onClosePanel();
            }
            else if (messageObject.type == "success") {
                var imageUrl = messageObject.items[0].sharePoint.url;
                var extensions = this.props.allowedFileExtensions.split(',');
                var lowerUrl = imageUrl.toLowerCase();
                for (var iExt = 0; iExt < extensions.length; iExt++) {
                    var ext = extensions[iExt].toLowerCase();
                    if (lowerUrl.indexOf(ext) > -1) {
                        this.state.selectedImage = imageUrl;
                        this.setState(this.state);
                        this.saveImageProperty(imageUrl);
                        this.onClosePanel();
                        break;
                    }
                }
            }
        }
    };
    /**
    * @function
    * When component is mount, attach the iframe event watcher
    *
    */
    PropertyFieldDocumentPickerHost.prototype.componentDidMount = function () {
        window.addEventListener('message', this.handleIframeData, false);
    };
    /**
    * @function
    * Releases the watcher
    *
    */
    PropertyFieldDocumentPickerHost.prototype.componentWillUnmount = function () {
        window.removeEventListener('message', this.handleIframeData, false);
        if (this.async !== undefined)
            this.async.dispose();
    };
    PropertyFieldDocumentPickerHost.prototype.onClickSite = function (element) {
        this.state.openRecent = false;
        this.state.openSite = true;
        this.state.openUpload = false;
        this.setState(this.state);
    };
    PropertyFieldDocumentPickerHost.prototype.onClickUpload = function (element) {
        this.state.openRecent = false;
        this.state.openSite = false;
        this.state.openUpload = true;
        this.setState(this.state);
    };
    /**
     * @function
     * Renders the datepicker controls with Office UI  Fabric
     */
    PropertyFieldDocumentPickerHost.prototype.render = function () {
        var iframeUrl = this.props.context.pageContext.web.absoluteUrl;
        iframeUrl += '/_layouts/15/onedrive.aspx?picker=';
        iframeUrl += '%7B%22sn%22%3Afalse%2C%22v%22%3A%22files%22%2C%22id%22%3A%221%22%2C%22o%22%3A%22';
        iframeUrl += encodeURI(this.props.context.pageContext.web.absoluteUrl.replace(this.props.context.pageContext.web.serverRelativeUrl, ""));
        iframeUrl += "%22%7D&id=";
        iframeUrl += encodeURI(this.props.context.pageContext.web.serverRelativeUrl);
        iframeUrl += '&view=2&typeFilters=';
        iframeUrl += encodeURI('folder,' + this.props.allowedFileExtensions);
        iframeUrl += '&p=2';
        var previewUrl = this.props.context.pageContext.web.absoluteUrl;
        previewUrl += '/_layouts/15/getpreview.ashx?path=';
        previewUrl += encodeURI(this.state.selectedImage);
        //Renders content
        return (React.createElement("div", { style: { marginBottom: '8px' } },
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement("table", { style: { width: '100%', borderSpacing: 0 } },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", { width: "*" },
                            React.createElement(TextField_1.TextField, { disabled: this.props.disabled, value: this.state.selectedImage, style: { width: '100%' }, onChanged: this.onTextFieldChanged, readOnly: this.props.readOnly })),
                        React.createElement("td", { width: "64" },
                            React.createElement("table", { style: { width: '100%', borderSpacing: 0 } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement(Button_1.IconButton, { disabled: this.props.disabled, iconProps: { iconName: 'FolderSearch' }, onClick: this.onOpenPanel })),
                                        React.createElement("td", null,
                                            React.createElement(Button_1.IconButton, { disabled: this.props.disabled === false && (this.state.selectedImage != null && this.state.selectedImage != '') ? false : true, iconProps: { iconName: 'Delete' }, onClick: this.onEraseButton }))))))))),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", null,
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : '',
            this.state.selectedImage != null && this.state.selectedImage != '' && this.props.previewDocument === true ?
                React.createElement("div", { style: { marginTop: '7px' } },
                    React.createElement("img", { src: previewUrl, width: "225px", height: "225px", alt: "Preview" }))
                : '',
            this.state.openPanel === true ?
                React.createElement(Panel_1.Panel, { isOpen: this.state.openPanel, hasCloseButton: true, onDismiss: this.onClosePanel, isLightDismiss: true, type: Panel_1.PanelType.large, headerText: strings.DocumentPickerTitle },
                    React.createElement("div", { style: { backgroundColor: '#F4F4F4', width: '100%', height: '80vh', paddingTop: '0px', display: 'inline-flex' } },
                        React.createElement("div", { style: { width: '206px', backgroundColor: 'white' } },
                            React.createElement("div", { style: { width: '260px', backgroundColor: '#F4F4F4', height: '40px', marginBottom: '70px' } }),
                            React.createElement("div", { style: { paddingLeft: '20px', paddingTop: '10px', color: '#A6A6A6', paddingBottom: '10px',
                                    borderLeftWidth: '1px',
                                    borderLeftStyle: 'solid',
                                    borderLeftColor: this.state.openRecent === true ? 'blue' : 'white',
                                    backgroundColor: this.state.openRecent === true ? '#F4F4F4' : '#FFFFFF'
                                }, onClick: this.onClickRecent, role: "menuitem" },
                                React.createElement("i", { className: "ms-Icon ms-Icon--Clock", style: { fontSize: '30px' } }),
                                "\u00A0",
                                strings.DocumentPickerRecent),
                            React.createElement("div", { style: { cursor: 'pointer', paddingLeft: '20px', paddingTop: '10px', paddingBottom: '10px',
                                    borderLeftWidth: '1px',
                                    borderLeftStyle: 'solid',
                                    borderLeftColor: this.state.openSite === true ? 'blue' : 'white',
                                    backgroundColor: this.state.openSite === true ? '#F4F4F4' : '#FFFFFF'
                                }, onClick: this.onClickSite, role: "menuitem" },
                                React.createElement("i", { className: "ms-Icon ms-Icon--Globe", style: { fontSize: '30px' } }),
                                "\u00A0",
                                strings.DocumentPickerSite)),
                        this.state.openRecent == true ?
                            React.createElement("div", { id: "recent", style: { marginLeft: '2px', width: '100%', backgroundColor: 'white' } },
                                React.createElement("div", { style: { width: '100%', backgroundColor: '#F4F4F4', height: '40px', marginBottom: '20px' } }),
                                React.createElement("div", { style: { paddingLeft: '30px' } },
                                    React.createElement("h1", { className: "ms-font-xl" }, "Recent images")))
                            : '',
                        React.createElement("div", { id: "site", style: { marginLeft: '2px', paddingLeft: '0px', paddingTop: '0px', backgroundColor: 'white', visibility: this.state.openSite === true ? 'visible' : 'hidden', width: this.state.openSite === true ? '100%' : '0px', height: this.state.openSite === true ? '80vh' : '0px', } },
                            React.createElement("iframe", { ref: "filePickerIFrame", style: { width: this.state.openSite === true ? '100%' : '0px', height: this.state.openSite === true ? '80vh' : '0px', borderWidth: '0' }, className: "filePickerIFrame_d791363d", role: "application", title: "Select files from site picker view. Use toolbaar menu to perform operations, breadcrumbs to navigate between folders and arrow keys to navigate within the list", src: iframeUrl }))),
                    this.state.openSite === false ?
                        React.createElement("div", { style: {
                                position: 'absolute',
                                bottom: '0',
                                right: '0',
                                marginBottom: '20px',
                                marginRight: '20px'
                            } },
                            React.createElement(Button_1.PrimaryButton, null, " Open "),
                            React.createElement(Button_1.DefaultButton, { onClick: this.onClosePanel }, " Cancel "))
                        : '')
                : ''));
    };
    return PropertyFieldDocumentPickerHost;
}(React.Component));
exports.default = PropertyFieldDocumentPickerHost;
//# sourceMappingURL=PropertyFieldDocumentPickerHost.js.map