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
 * @file PropertyFieldSPFolderPickerHost.tsx
 * Renders the controls for PropertyFieldSPFolderPicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_http_1 = require("@microsoft/sp-http");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Dialog_1 = require("office-ui-fabric-react/lib/Dialog");
var Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
var List_1 = require("office-ui-fabric-react/lib/List");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var strings = require("sp-client-custom-fields/strings");
/**
 * @class
 * Renders the controls for PropertyFieldSPFolderPicker component
 */
var PropertyFieldSPFolderPickerHost = /** @class */ (function (_super) {
    __extends(PropertyFieldSPFolderPickerHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldSPFolderPickerHost(props) {
        var _this = _super.call(this, props) || this;
        _this.currentPage = 0;
        _this.pageItemCount = 6;
        //Bind the current object to the external called methods
        _this.onBrowseClick = _this.onBrowseClick.bind(_this);
        _this.onDismiss = _this.onDismiss.bind(_this);
        _this.onRenderCell = _this.onRenderCell.bind(_this);
        _this.onClickNext = _this.onClickNext.bind(_this);
        _this.onClickPrevious = _this.onClickPrevious.bind(_this);
        _this.onClickLink = _this.onClickLink.bind(_this);
        _this.onClickParent = _this.onClickParent.bind(_this);
        _this.onFolderChecked = _this.onFolderChecked.bind(_this);
        _this.onClickSelect = _this.onClickSelect.bind(_this);
        _this.onClearSelectionClick = _this.onClearSelectionClick.bind(_this);
        //Inits the intial folders
        var initialFolder;
        var currentSPFolder = '';
        if (props.baseFolder != null)
            currentSPFolder = props.baseFolder;
        if (props.initialFolder != null && props.initialFolder != '') {
            initialFolder = props.initialFolder;
            currentSPFolder = _this.getParentFolder(initialFolder);
        }
        //Inits the state
        _this.state = {
            isOpen: false,
            loading: true,
            currentSPFolder: currentSPFolder,
            confirmFolder: initialFolder,
            selectedFolder: initialFolder,
            childrenFolders: { value: [] },
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
     * Function called when the user wants to browse folders
     */
    PropertyFieldSPFolderPickerHost.prototype.onBrowseClick = function () {
        this.currentPage = 0;
        this.LoadChildrenFolders();
    };
    /**
     * @function
     * Function called when the user erase the current selection
     */
    PropertyFieldSPFolderPickerHost.prototype.onClearSelectionClick = function () {
        this.state.confirmFolder = '';
        this.state.currentSPFolder = '';
        if (this.props.baseFolder != null)
            this.state.currentSPFolder = this.props.baseFolder;
        this.currentPage = 0;
        this.setState({ isOpen: false, loading: true, selectedFolder: this.state.selectedFolder, currentSPFolder: this.state.currentSPFolder, childrenFolders: this.state.childrenFolders });
        this.delayedValidate(this.state.confirmFolder);
    };
    /**
     * @function
     * Loads the sub folders from the current
     */
    PropertyFieldSPFolderPickerHost.prototype.LoadChildrenFolders = function () {
        var _this = this;
        //Loading
        this.state.childrenFolders = { value: [] };
        this.setState({ isOpen: true, loading: true, selectedFolder: this.state.selectedFolder, currentSPFolder: this.state.currentSPFolder, childrenFolders: this.state.childrenFolders });
        //Inits the service
        var folderService = new SPFolderPickerService(this.props.context);
        folderService.getFolders(this.state.currentSPFolder, this.currentPage, this.pageItemCount).then(function (response) {
            //Binds the results
            _this.state.childrenFolders = response;
            _this.setState({ isOpen: true, loading: false, selectedFolder: _this.state.selectedFolder, currentSPFolder: _this.state.currentSPFolder, childrenFolders: _this.state.childrenFolders });
        });
    };
    /**
     * @function
     * User clicks on the previous button
     */
    PropertyFieldSPFolderPickerHost.prototype.onClickPrevious = function () {
        this.currentPage = this.currentPage - 1;
        this.state.selectedFolder = '';
        if (this.currentPage < 0)
            this.currentPage = 0;
        this.LoadChildrenFolders();
    };
    /**
     * @function
     * User clicks on the next button
     */
    PropertyFieldSPFolderPickerHost.prototype.onClickNext = function () {
        this.state.selectedFolder = '';
        this.currentPage = this.currentPage + 1;
        this.LoadChildrenFolders();
    };
    /**
     * @function
     * User clicks on a sub folder
     */
    PropertyFieldSPFolderPickerHost.prototype.onClickLink = function (element) {
        this.currentPage = 0;
        this.state.selectedFolder = '';
        this.state.currentSPFolder = element.currentTarget.value;
        this.LoadChildrenFolders();
    };
    /**
     * @function
     * User clicks on the go-to parent button
     */
    PropertyFieldSPFolderPickerHost.prototype.onClickParent = function () {
        var parentFolder = this.getParentFolder(this.state.currentSPFolder);
        if (parentFolder == this.props.context.pageContext.web.serverRelativeUrl)
            parentFolder = '';
        this.currentPage = 0;
        this.state.selectedFolder = '';
        this.state.currentSPFolder = parentFolder;
        this.LoadChildrenFolders();
    };
    /**
     * @function
     * Gets the parent folder server relative url from a folder url
     */
    PropertyFieldSPFolderPickerHost.prototype.getParentFolder = function (folderUrl) {
        var splitted = folderUrl.split('/');
        var parentFolder = '';
        for (var i = 0; i < splitted.length - 1; i++) {
            var node = splitted[i];
            if (node != null && node != '') {
                parentFolder += '/';
                parentFolder += splitted[i];
            }
        }
        return parentFolder;
    };
    /**
     * @function
     * Occurs when the selected folder changed
     */
    PropertyFieldSPFolderPickerHost.prototype.onFolderChecked = function (element) {
        this.state.selectedFolder = element.currentTarget.value;
        this.setState({ isOpen: true, loading: false, selectedFolder: this.state.selectedFolder, currentSPFolder: this.state.currentSPFolder, childrenFolders: this.state.childrenFolders });
    };
    /**
     * @function
     * User clicks on Select button
     */
    PropertyFieldSPFolderPickerHost.prototype.onClickSelect = function () {
        this.state.confirmFolder = this.state.selectedFolder;
        this.state = { isOpen: false, loading: false, selectedFolder: this.state.selectedFolder,
            confirmFolder: this.state.selectedFolder,
            currentSPFolder: this.state.currentSPFolder,
            childrenFolders: this.state.childrenFolders };
        this.setState(this.state);
        this.delayedValidate(this.state.confirmFolder);
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldSPFolderPickerHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.initialFolder, value);
            return;
        }
        if (this.latestValidateValue === value)
            return;
        this.latestValidateValue = value;
        var result = this.props.onGetErrorMessage(value || '');
        if (result !== undefined) {
            if (typeof result === 'string') {
                if (result === undefined || result === '')
                    this.notifyAfterValidate(this.props.initialFolder, value);
                this.state.errorMessage = result;
                this.setState(this.state);
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(_this.props.initialFolder, value);
                    _this.state.errorMessage = errorMessage;
                    _this.setState(_this.state);
                });
            }
        }
        else {
            this.notifyAfterValidate(this.props.initialFolder, value);
        }
    };
    /**
     * @function
     * Notifies the parent Web Part of a property value change
     */
    PropertyFieldSPFolderPickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
        if (this.props.onPropertyChange && newValue != null) {
            this.props.properties[this.props.targetProperty] = newValue;
            this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
            if (!this.props.disableReactivePropertyChanges && this.props.render != null)
                this.props.render();
        }
    };
    /**
     * @function
     * Called when the component will unmount
     */
    PropertyFieldSPFolderPickerHost.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    /**
     * @function
     * User close the dialog wihout saving
     */
    PropertyFieldSPFolderPickerHost.prototype.onDismiss = function (ev) {
        this.setState({ isOpen: false, loading: false, selectedFolder: this.state.selectedFolder, currentSPFolder: this.state.currentSPFolder, childrenFolders: this.state.childrenFolders });
    };
    /**
     * @function
     * Renders the controls
     */
    PropertyFieldSPFolderPickerHost.prototype.render = function () {
        var currentFolderisRoot = false;
        if (this.state.currentSPFolder == null || this.state.currentSPFolder == '' || this.state.currentSPFolder == this.props.baseFolder)
            currentFolderisRoot = true;
        //Renders content
        return (React.createElement("div", null,
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement("table", { style: { width: '100%', borderSpacing: 0 } },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", { width: "*" },
                            React.createElement(TextField_1.TextField, { disabled: this.props.disabled, style: { width: '100%' }, readOnly: true, value: this.state.confirmFolder })),
                        React.createElement("td", { width: "64" },
                            React.createElement("table", { style: { width: '100%', borderSpacing: 0 } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement(Button_1.IconButton, { disabled: this.props.disabled, iconProps: { iconName: 'FolderSearch' }, onClick: this.onBrowseClick })),
                                        React.createElement("td", null,
                                            React.createElement(Button_1.IconButton, { disabled: this.props.disabled, iconProps: { iconName: 'Delete' }, onClick: this.onClearSelectionClick }))))))))),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", { style: { paddingBottom: '8px' } },
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : '',
            React.createElement(Dialog_1.Dialog, { type: Dialog_1.DialogType.close, title: strings.SPFolderPickerDialogTitle, isOpen: this.state.isOpen, isDarkOverlay: true, isBlocking: false, onDismiss: this.onDismiss },
                React.createElement("div", { style: { height: '330px' } },
                    this.state.loading ? React.createElement("div", null,
                        React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.normal })) : null,
                    this.state.loading === false && currentFolderisRoot === false ? React.createElement(Button_1.IconButton, { onClick: this.onClickParent, iconProps: { iconName: 'Reply' } }, "...") : null,
                    React.createElement(List_1.List, { items: this.state.childrenFolders.value, onRenderCell: this.onRenderCell }),
                    this.state.loading === false ?
                        React.createElement(Button_1.IconButton, { iconProps: { iconName: 'CaretLeft8' }, onClick: this.onClickPrevious, disabled: this.currentPage > 0 ? false : true })
                        : null,
                    this.state.loading === false ?
                        React.createElement(Button_1.IconButton, { iconProps: { iconName: 'CaretRight8' }, onClick: this.onClickNext, disabled: this.state.childrenFolders.value.length < this.pageItemCount ? true : false })
                        : null),
                React.createElement("div", { style: { marginTop: '20px' } },
                    React.createElement(Button_1.PrimaryButton, { disabled: this.state.selectedFolder != null && this.state.selectedFolder != '' ? false : true, onClick: this.onClickSelect }, strings.SPFolderPickerSelectButton),
                    React.createElement(Button_1.DefaultButton, { onClick: this.onDismiss }, strings.SPFolderPickerCancelButton)))));
    };
    /**
     * @function
     * Renders a list cell
     */
    PropertyFieldSPFolderPickerHost.prototype.onRenderCell = function (item, index) {
        var idUnique = 'radio-' + item.ServerRelativeUrl;
        return (React.createElement("div", { style: { fontSize: '14px', padding: '4px' } },
            React.createElement("div", { className: "ms-ChoiceField" },
                React.createElement("input", { id: idUnique, style: { width: '18px', height: '18px' }, defaultChecked: item.ServerRelativeUrl === this.state.confirmFolder ? true : false, "aria-checked": item.ServerRelativeUrl === this.state.confirmFolder ? true : false, onChange: this.onFolderChecked, type: "radio", name: "radio1", value: item.ServerRelativeUrl }),
                React.createElement("label", { htmlFor: idUnique },
                    React.createElement("span", { className: "ms-Label" },
                        React.createElement("i", { className: "ms-Icon ms-Icon--FolderFill", style: { color: '#0062AF', fontSize: '22px' } }),
                        React.createElement("span", { style: { paddingLeft: '5px' } },
                            React.createElement(Button_1.CommandButton, { style: { paddingBottom: '0', height: '27px' }, value: item.ServerRelativeUrl, onClick: this.onClickLink },
                                React.createElement("span", { className: "ms-Button-label" }, item.Name))))))));
    };
    return PropertyFieldSPFolderPickerHost;
}(React.Component));
exports.default = PropertyFieldSPFolderPickerHost;
/**
 * @class
 * Service implementation to get folders from current SharePoint site
 */
var SPFolderPickerService = /** @class */ (function () {
    /**
     * @function
     * Service constructor
     */
    function SPFolderPickerService(pageContext) {
        this.context = pageContext;
    }
    /**
     * @function
     * Gets the collection of sub folders of the given folder
     */
    SPFolderPickerService.prototype.getFolders = function (parentFolderServerRelativeUrl, currentPage, pageItemCount) {
        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
            //If the running environment is local, load the data from the mock
            return this.getFoldersMock(parentFolderServerRelativeUrl);
        }
        else {
            //If the running environment is SharePoint, request the folders REST service
            var queryUrl = this.context.pageContext.web.absoluteUrl;
            var skipNumber = currentPage * pageItemCount;
            if (parentFolderServerRelativeUrl == null || parentFolderServerRelativeUrl == '' || parentFolderServerRelativeUrl == '/') {
                //The folder is the web root site
                queryUrl += "/_api/web/folders?$select=Name,ServerRelativeUrl&$orderBy=Name&$top=";
                queryUrl += pageItemCount;
                queryUrl += "&$skip=";
                queryUrl += skipNumber;
            }
            else {
                //Loads sub folders
                queryUrl += "/_api/web/GetFolderByServerRelativeUrl('";
                queryUrl += parentFolderServerRelativeUrl;
                queryUrl += "')/folders?$select=Name,ServerRelativeUrl&$orderBy=Name&$top=";
                queryUrl += pageItemCount;
                queryUrl += "&$skip=";
                queryUrl += skipNumber;
            }
            return this.context.spHttpClient.get(queryUrl, sp_http_1.SPHttpClient.configurations.v1).then(function (response) {
                return response.json();
            });
        }
    };
    /**
     * @function
     * Returns 3 fake SharePoint folders for the Mock mode
     */
    SPFolderPickerService.prototype.getFoldersMock = function (parentFolderServerRelativeUrl) {
        return SPFolderPickerMockHttpClient.getFolders(this.context.pageContext.web.absoluteUrl).then(function () {
            var listData = {
                value: [
                    { Name: 'Mock Folder One', ServerRelativeUrl: '/mockfolderone' },
                    { Name: 'Mock Folder Two', ServerRelativeUrl: '/mockfoldertwo' },
                    { Name: 'Mock Folder Three', ServerRelativeUrl: '/mockfolderthree' }
                ]
            };
            return listData;
        });
    };
    return SPFolderPickerService;
}());
/**
 * @class
 * Defines a http client to request mock data to use the web part with the local workbench
 */
var SPFolderPickerMockHttpClient = /** @class */ (function () {
    function SPFolderPickerMockHttpClient() {
    }
    /**
     * @function
     * Mock get folders method
     */
    SPFolderPickerMockHttpClient.getFolders = function (restUrl, options) {
        return new Promise(function (resolve) {
            resolve(SPFolderPickerMockHttpClient._results);
        });
    };
    /**
     * @var
     * Mock SharePoint result sample
     */
    SPFolderPickerMockHttpClient._results = { value: [] };
    return SPFolderPickerMockHttpClient;
}());
//# sourceMappingURL=PropertyFieldSPFolderPickerHost.js.map