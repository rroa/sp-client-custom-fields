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
 * @file PropertyFieldSPListMultiplePickerHost.tsx
 * Renders the controls for PropertyFieldSPListMultiplePicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
var React = require("react");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_http_1 = require("@microsoft/sp-http");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var Checkbox_1 = require("office-ui-fabric-react/lib/Checkbox");
var GuidHelper_1 = require("./GuidHelper");
var PropertyFieldSPListMultiplePicker_1 = require("./PropertyFieldSPListMultiplePicker");
/**
 * @class
 * Renders the controls for PropertyFieldSPListMultiplePicker component
 */
var PropertyFieldSPListMultiplePickerHost = /** @class */ (function (_super) {
    __extends(PropertyFieldSPListMultiplePickerHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldSPListMultiplePickerHost(props) {
        var _this = _super.call(this, props) || this;
        _this.options = [];
        _this.loaded = false;
        _this._key = GuidHelper_1.default.getGuid();
        _this.onChanged = _this.onChanged.bind(_this);
        _this.state = {
            results: _this.options,
            selectedKeys: [],
            loaded: _this.loaded,
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
    PropertyFieldSPListMultiplePickerHost.prototype.loadLists = function () {
        var _this = this;
        //Builds the SharePoint List service
        var listService = new SPListPickerService(this.props, this.props.context);
        //Gets the libs
        listService.getLibs().then(function (response) {
            response.value.map(function (list) {
                var isSelected = false;
                var indexInExisting = -1;
                //Defines if the current list must be selected by default
                if (_this.props.selectedLists)
                    indexInExisting = _this.props.selectedLists.indexOf(list.Id);
                if (indexInExisting > -1) {
                    isSelected = true;
                    _this.state.selectedKeys.push(list.Id);
                }
                //Add the option to the list
                _this.options.push({
                    key: list.Id,
                    text: list.Title,
                    isChecked: isSelected
                });
            });
            _this.loaded = true;
            _this.setState({ results: _this.options, selectedKeys: _this.state.selectedKeys, loaded: true });
        });
    };
    /**
     * @function
     * Remove a string from the selected keys
     */
    PropertyFieldSPListMultiplePickerHost.prototype.removeSelected = function (element) {
        var res = [];
        for (var i = 0; i < this.state.selectedKeys.length; i++) {
            if (this.state.selectedKeys[i] !== element)
                res.push(this.state.selectedKeys[i]);
        }
        this.state.selectedKeys = res;
    };
    /**
     * @function
     * Raises when a list has been selected
     */
    PropertyFieldSPListMultiplePickerHost.prototype.onChanged = function (element, isChecked) {
        if (element) {
            var value = element.currentTarget.value;
            if (isChecked === false) {
                this.removeSelected(value);
            }
            else {
                this.state.selectedKeys.push(value);
            }
            this.setState(this.state);
            this.delayedValidate(this.state.selectedKeys);
        }
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldSPListMultiplePickerHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.selectedLists, value);
            return;
        }
        var result = this.props.onGetErrorMessage(value || []);
        if (result !== undefined) {
            if (typeof result === 'string') {
                if (result === undefined || result === '')
                    this.notifyAfterValidate(this.props.selectedLists, value);
                this.state.errorMessage = result;
                this.setState(this.state);
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(_this.props.selectedLists, value);
                    _this.state.errorMessage = errorMessage;
                    _this.setState(_this.state);
                });
            }
        }
        else {
            this.notifyAfterValidate(this.props.selectedLists, value);
        }
    };
    /**
     * @function
     * Notifies the parent Web Part of a property value change
     */
    PropertyFieldSPListMultiplePickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
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
    PropertyFieldSPListMultiplePickerHost.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    /**
     * @function
     * Renders the SPListMultiplePicker controls with Office UI  Fabric
     */
    PropertyFieldSPListMultiplePickerHost.prototype.render = function () {
        var _this = this;
        if (this.loaded === false) {
            return (React.createElement("div", null,
                React.createElement(Label_1.Label, null, this.props.label),
                React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.normal })));
        }
        else {
            var styleOfLabel = {
                color: this.props.disabled === true ? '#A6A6A6' : 'auto'
            };
            //Renders content
            return (React.createElement("div", null,
                React.createElement(Label_1.Label, null, this.props.label),
                this.options.map(function (item, index) {
                    var uniqueKey = _this.props.targetProperty + '-' + item.key;
                    return (React.createElement("div", { className: "ms-ChoiceField", key: _this._key + '-multiplelistpicker-' + index },
                        React.createElement(Checkbox_1.Checkbox, { defaultChecked: item.isChecked, disabled: _this.props.disabled, label: item.text, onChange: _this.onChanged, inputProps: { value: item.key } })));
                }),
                this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                    React.createElement("div", { style: { paddingBottom: '8px' } },
                        React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                        React.createElement("span", null,
                            React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                    : ''));
        }
    };
    return PropertyFieldSPListMultiplePickerHost;
}(React.Component));
exports.default = PropertyFieldSPListMultiplePickerHost;
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
     * Gets the collection of SP libs in the current SharePoint site
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
                if (this.props.orderBy == PropertyFieldSPListMultiplePicker_1.PropertyFieldSPListMultiplePickerOrderBy.Id)
                    queryUrl += "Id";
                else if (this.props.orderBy == PropertyFieldSPListMultiplePicker_1.PropertyFieldSPListMultiplePickerOrderBy.Title)
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
//# sourceMappingURL=PropertyFieldSPListMultiplePickerHost.js.map