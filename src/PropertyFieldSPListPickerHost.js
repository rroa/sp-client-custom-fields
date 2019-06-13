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
 * @file PropertyFieldSPListPickerHost.tsx
 * Renders the controls for PropertyFieldSPListPicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
var React = require("react");
var Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var PropertyFieldSPListPicker_1 = require("./PropertyFieldSPListPicker");
var sp_http_1 = require("@microsoft/sp-http");
var Label_1 = require("office-ui-fabric-react/lib/Label");
/**
 * @class
 * Renders the controls for PropertyFieldSPListPicker component
 */
var PropertyFieldSPListPickerHost = /** @class */ (function (_super) {
    __extends(PropertyFieldSPListPickerHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldSPListPickerHost(props) {
        var _this = _super.call(this, props) || this;
        _this.options = [];
        _this.onChanged = _this.onChanged.bind(_this);
        _this.state = {
            results: _this.options,
            selectedKey: _this.selectedKey,
            errorMessage: ''
        };
        _this.async = new Utilities_1.Async(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        _this.loadLists();
        return _this;
    }
    /**
     * @function
     * Loads the list from SharePoint current web site
     */
    PropertyFieldSPListPickerHost.prototype.loadLists = function () {
        var _this = this;
        var listService = new SPListPickerService(this.props, this.props.context);
        listService.getLibs().then(function (response) {
            response.value.map(function (list) {
                var isSelected = false;
                if (_this.props.selectedList == list.Id) {
                    isSelected = true;
                    _this.selectedKey = list.Id;
                }
                _this.options.push({
                    key: list.Id,
                    text: list.Title,
                    isSelected: isSelected
                });
            });
            _this.setState({ results: _this.options, selectedKey: _this.selectedKey });
        });
    };
    /**
     * @function
     * Raises when a list has been selected
     */
    PropertyFieldSPListPickerHost.prototype.onChanged = function (option, index) {
        var newValue = option.key;
        this.delayedValidate(newValue);
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldSPListPickerHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.selectedList, value);
            return;
        }
        if (this.latestValidateValue === value)
            return;
        this.latestValidateValue = value;
        var result = this.props.onGetErrorMessage(value || '');
        if (result !== undefined) {
            if (typeof result === 'string') {
                if (result === undefined || result === '')
                    this.notifyAfterValidate(this.props.selectedList, value);
                this.state.errorMessage = result;
                this.setState(this.state);
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(_this.props.selectedList, value);
                    _this.state.errorMessage = errorMessage;
                    _this.setState(_this.state);
                });
            }
        }
        else {
            this.notifyAfterValidate(this.props.selectedList, value);
        }
    };
    /**
     * @function
     * Notifies the parent Web Part of a property value change
     */
    PropertyFieldSPListPickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
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
    PropertyFieldSPListPickerHost.prototype.componentWillUnmount = function () {
        if (this.async !== undefined)
            this.async.dispose();
    };
    /**
     * @function
     * Renders the SPListpicker controls with Office UI  Fabric
     */
    PropertyFieldSPListPickerHost.prototype.render = function () {
        //Renders content
        return (React.createElement("div", null,
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement(Dropdown_1.Dropdown, { disabled: this.props.disabled, label: '', onChanged: this.onChanged, options: this.options, selectedKey: this.selectedKey }),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", { style: { paddingBottom: '8px' } },
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    return PropertyFieldSPListPickerHost;
}(React.Component));
exports.default = PropertyFieldSPListPickerHost;
/**
 * @class
 * Service implementation to get list & list items from current SharePoint site
 */
var SPListPickerService = /** @class */ (function () {
    /**
     * @function
     * Service constructor
     */
    function SPListPickerService(_props, pageContext) {
        this.props = _props;
        this.context = pageContext;
    }
    /**
     * @function
     * Gets the collection of libs in the current SharePoint site
     */
    SPListPickerService.prototype.getLibs = function () {
        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
            //If the running environment is local, load the data from the mock
            return this.getLibsFromMock();
        }
        else {
            //If the running environment is SharePoint, request the lists REST service
            var queryUrl = this.context.pageContext.web.absoluteUrl;
            queryUrl += "/_api/lists?$select=Title,id,BaseTemplate";
            if (this.props.orderBy != null) {
                queryUrl += "&$orderby=";
                if (this.props.orderBy == PropertyFieldSPListPicker_1.PropertyFieldSPListPickerOrderBy.Id)
                    queryUrl += "Id";
                else if (this.props.orderBy == PropertyFieldSPListPicker_1.PropertyFieldSPListPickerOrderBy.Title)
                    queryUrl += "Title";
            }
            if (this.props.baseTemplate != null && this.props.baseTemplate) {
                queryUrl += "&$filter=BaseTemplate%20eq%20";
                queryUrl += this.props.baseTemplate;
                if (this.props.includeHidden === false) {
                    queryUrl += "%20and%20Hidden%20eq%20false";
                }
            }
            else {
                if (this.props.includeHidden === false) {
                    queryUrl += "&$filter=Hidden%20eq%20false";
                }
            }
            return this.context.spHttpClient.get(queryUrl, sp_http_1.SPHttpClient.configurations.v1).then(function (response) {
                return response.json();
            });
        }
    };
    /**
     * @function
     * Returns 3 fake SharePoint lists for the Mock mode
     */
    SPListPickerService.prototype.getLibsFromMock = function () {
        return SPListPickerMockHttpClient.getLists(this.context.pageContext.web.absoluteUrl).then(function () {
            var listData = {
                value: [
                    { Title: 'Mock List One', Id: '6770c83b-29e8-494b-87b6-468a2066bcc6', BaseTemplate: '109' },
                    { Title: 'Mock List Two', Id: '2ece98f2-cc5e-48ff-8145-badf5009754c', BaseTemplate: '109' },
                    { Title: 'Mock List Three', Id: 'bd5dbd33-0e8d-4e12-b289-b276e5ef79c2', BaseTemplate: '109' }
                ]
            };
            return listData;
        });
    };
    return SPListPickerService;
}());
/**
 * @class
 * Defines a http client to request mock data to use the web part with the local workbench
 */
var SPListPickerMockHttpClient = /** @class */ (function () {
    function SPListPickerMockHttpClient() {
    }
    /**
     * @function
     * Mock search People method
     */
    SPListPickerMockHttpClient.getLists = function (restUrl, options) {
        return new Promise(function (resolve) {
            resolve(SPListPickerMockHttpClient._results);
        });
    };
    /**
     * @var
     * Mock SharePoint result sample
     */
    SPListPickerMockHttpClient._results = { value: [] };
    return SPListPickerMockHttpClient;
}());
//# sourceMappingURL=PropertyFieldSPListPickerHost.js.map