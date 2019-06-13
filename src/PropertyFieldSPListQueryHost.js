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
 * @file PropertyFieldSPListQueryHost.tsx
 * Renders the controls for PropertyFieldSPListQuery component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
var React = require("react");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_http_1 = require("@microsoft/sp-http");
var PropertyFieldSPListQuery_1 = require("./PropertyFieldSPListQuery");
var Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Slider_1 = require("office-ui-fabric-react/lib/Slider");
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var strings = require("sp-client-custom-fields/strings");
/**
 * @class
 * Renders the controls for PropertyFieldSPListQuery component
 */
var PropertyFieldSPListQueryHost = /** @class */ (function (_super) {
    __extends(PropertyFieldSPListQueryHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldSPListQueryHost(props) {
        var _this = _super.call(this, props) || this;
        _this.onChangedList = _this.onChangedList.bind(_this);
        _this.onChangedField = _this.onChangedField.bind(_this);
        _this.onChangedArranged = _this.onChangedArranged.bind(_this);
        _this.onChangedMax = _this.onChangedMax.bind(_this);
        _this.loadFields = _this.loadFields.bind(_this);
        _this.onClickAddFilter = _this.onClickAddFilter.bind(_this);
        _this.onClickRemoveFilter = _this.onClickRemoveFilter.bind(_this);
        _this.onChangedFilterField = _this.onChangedFilterField.bind(_this);
        _this.onChangedFilterOperator = _this.onChangedFilterOperator.bind(_this);
        _this.onChangedFilterValue = _this.onChangedFilterValue.bind(_this);
        _this.state = {
            loadedList: false,
            loadedFields: false,
            lists: [],
            fields: [],
            arranged: [{ key: 'asc', text: 'Asc' }, { key: 'desc', text: 'Desc' }],
            selectedList: '',
            selectedField: '',
            selectedArrange: '',
            operators: [
                { key: 'eq', text: strings.SPListQueryOperatorEq },
                { key: 'ne', text: strings.SPListQueryOperatorNe },
                { key: 'startsWith', text: strings.SPListQueryOperatorStartsWith },
                { key: 'substringof', text: strings.SPListQueryOperatorSubstringof },
                { key: 'lt', text: strings.SPListQueryOperatorLt },
                { key: 'le', text: strings.SPListQueryOperatorLe },
                { key: 'gt', text: strings.SPListQueryOperatorGt },
                { key: 'ge', text: strings.SPListQueryOperatorGe }
            ],
            filters: [],
            max: 20,
            errorMessage: ''
        };
        _this.loadDefaultData();
        _this.loadLists();
        _this.async = new Utilities_1.Async(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        return _this;
    }
    PropertyFieldSPListQueryHost.prototype.loadDefaultData = function () {
        if (this.props.query == null || this.props.query == '') {
            this.state.loadedFields = true;
            return;
        }
        var indexOfGuid = this.props.query.indexOf("lists(guid'");
        if (indexOfGuid > -1) {
            var listId = this.props.query.substr(indexOfGuid);
            listId = listId.replace("lists(guid'", "");
            var indexOfEndGuid = listId.indexOf("')/items");
            listId = listId.substr(0, indexOfEndGuid);
            this.state.selectedList = listId;
        }
        var indexOfOrderBy = this.props.query.indexOf("$orderBy=");
        if (indexOfOrderBy > -1) {
            var orderBy = this.props.query.substr(indexOfOrderBy);
            orderBy = orderBy.replace("$orderBy=", "");
            var indexOfEndOrderBy = orderBy.indexOf("%20");
            var field = orderBy.substr(0, indexOfEndOrderBy);
            this.state.selectedField = field;
            var arranged = orderBy.substr(indexOfEndOrderBy);
            arranged = arranged.replace("%20", "");
            var indexOfEndArranged = arranged.indexOf("&");
            arranged = arranged.substr(0, indexOfEndArranged);
            this.state.selectedArrange = arranged;
        }
        var indexOfTop = this.props.query.indexOf("$top=");
        if (indexOfTop > -1) {
            var top = this.props.query.substr(indexOfTop);
            top = top.replace("$top=", "");
            var indexOfEndTop = top.indexOf("&");
            top = top.substr(0, indexOfEndTop);
            this.state.max = Number(top);
        }
        var indexOfFilters = this.props.query.indexOf("$filter=");
        if (indexOfFilters > -1) {
            var filter = this.props.query.substr(indexOfFilters);
            filter = filter.replace("$filter=", "");
            var indexOfEndFilter = filter.indexOf("&");
            filter = filter.substr(0, indexOfEndFilter);
            if (filter != null && filter != '') {
                var subFilter = filter.split("%20and%20");
                for (var i = 0; i < subFilter.length; i++) {
                    var fieldId = subFilter[i].substr(0, subFilter[i].indexOf("%20"));
                    var operator = subFilter[i].substr(subFilter[i].indexOf("%20"));
                    operator = operator.substr(3);
                    operator = operator.substr(0, operator.indexOf("%20"));
                    var value = subFilter[i].substr(subFilter[i].indexOf(operator + "%20"));
                    value = value.replace(operator + "%20", "");
                    value = value.replace("'", "").replace("'", "").replace("'", "");
                    if (value == "undefined")
                        value = '';
                    var newObj = {};
                    newObj.field = fieldId;
                    newObj.operator = operator;
                    newObj.value = value;
                    this.state.filters.push(newObj);
                }
            }
        }
        if (listId != null && listId != '')
            this.loadFields();
        else
            this.state.loadedFields = true;
    };
    /**
     * @function
     * Loads the list from SharePoint current web site
     */
    PropertyFieldSPListQueryHost.prototype.loadLists = function () {
        var _this = this;
        var listService = new SPListPickerService(this.props, this.props.context);
        listService.getLibs().then(function (response) {
            _this.state.lists = [];
            response.value.map(function (list) {
                var isSelected = false;
                if (_this.state.selectedList == list.Id) {
                    isSelected = true;
                }
                _this.state.lists.push({
                    key: list.Id,
                    text: list.Title,
                    isSelected: isSelected
                });
            });
            _this.state.loadedList = true;
            _this.saveState();
        });
    };
    PropertyFieldSPListQueryHost.prototype.loadFields = function () {
        var _this = this;
        var listService = new SPListPickerService(this.props, this.props.context);
        listService.getFields(this.state.selectedList).then(function (response) {
            _this.state.fields = [];
            response.value.map(function (field) {
                var isSelected = false;
                if (_this.state.selectedField == field.StaticName) {
                    isSelected = true;
                }
                _this.state.fields.push({
                    key: field.StaticName,
                    text: field.Title,
                    isSelected: isSelected
                });
            });
            _this.state.loadedFields = true;
            _this.saveState();
        });
    };
    PropertyFieldSPListQueryHost.prototype.saveState = function () {
        this.setState(this.state);
    };
    PropertyFieldSPListQueryHost.prototype.saveQuery = function () {
        var queryUrl = this.props.context.pageContext.web.absoluteUrl;
        queryUrl += "/_api/lists(guid'";
        queryUrl += this.state.selectedList;
        queryUrl += "')/items?";
        if (this.state.selectedField != null && this.state.selectedField != '') {
            queryUrl += "$orderBy=";
            queryUrl += this.state.selectedField;
            queryUrl += "%20";
            queryUrl += this.state.selectedArrange;
            queryUrl += '&';
        }
        if (this.state.max != null) {
            queryUrl += '$top=';
            queryUrl += this.state.max;
            queryUrl += '&';
        }
        if (this.state.filters != null && this.state.filters.length > 0) {
            queryUrl += '$filter=';
            for (var i = 0; i < this.state.filters.length; i++) {
                if (this.state.filters[i].field != null && this.state.filters[i].operator != null) {
                    if (i > 0) {
                        queryUrl += "%20and%20";
                    }
                    queryUrl += this.state.filters[i].field;
                    queryUrl += "%20";
                    queryUrl += this.state.filters[i].operator;
                    queryUrl += "%20'";
                    queryUrl += this.state.filters[i].value;
                    queryUrl += "'";
                }
            }
            queryUrl += '&';
        }
        if (this.delayedValidate !== null && this.delayedValidate !== undefined) {
            this.delayedValidate(queryUrl);
        }
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldSPListQueryHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.query, value);
            return;
        }
        if (this.latestValidateValue === value)
            return;
        this.latestValidateValue = value;
        var result = this.props.onGetErrorMessage(value || '');
        if (result !== undefined) {
            if (typeof result === 'string') {
                if (result === undefined || result === '')
                    this.notifyAfterValidate(this.props.query, value);
                this.state.errorMessage = result;
                this.setState(this.state);
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(_this.props.query, value);
                    _this.state.errorMessage = errorMessage;
                    _this.setState(_this.state);
                });
            }
        }
        else {
            this.notifyAfterValidate(this.props.query, value);
        }
    };
    /**
     * @function
     * Notifies the parent Web Part of a property value change
     */
    PropertyFieldSPListQueryHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
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
    PropertyFieldSPListQueryHost.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    /**
     * @function
     * Raises when a list has been selected
     */
    PropertyFieldSPListQueryHost.prototype.onChangedList = function (option, index) {
        this.state.selectedList = option.key;
        this.saveQuery();
        this.saveState();
        this.loadFields();
    };
    PropertyFieldSPListQueryHost.prototype.onChangedField = function (option, index) {
        this.state.selectedField = option.key;
        this.saveQuery();
        this.saveState();
    };
    PropertyFieldSPListQueryHost.prototype.onChangedArranged = function (option, index) {
        this.state.selectedArrange = option.key;
        this.saveQuery();
        this.saveState();
    };
    PropertyFieldSPListQueryHost.prototype.onChangedMax = function (newValue) {
        this.state.max = newValue;
        this.saveQuery();
        this.saveState();
    };
    PropertyFieldSPListQueryHost.prototype.onClickAddFilter = function (elm) {
        this.state.filters.push({});
        this.saveState();
        this.saveQuery();
    };
    PropertyFieldSPListQueryHost.prototype.onClickRemoveFilter = function (index) {
        if (index > -1) {
            this.state.filters.splice(index, 1);
            this.saveState();
            this.saveQuery();
        }
    };
    PropertyFieldSPListQueryHost.prototype.onChangedFilterField = function (option, index, selectedIndex) {
        this.state.filters[selectedIndex].field = option.key;
        this.saveState();
        this.saveQuery();
    };
    PropertyFieldSPListQueryHost.prototype.onChangedFilterOperator = function (option, index, selectedIndex) {
        this.state.filters[selectedIndex].operator = option.key;
        this.saveState();
        this.saveQuery();
    };
    PropertyFieldSPListQueryHost.prototype.onChangedFilterValue = function (value, index) {
        this.state.filters[index].value = value;
        this.saveState();
        this.saveQuery();
    };
    /**
     * @function
     * Renders the controls
     */
    PropertyFieldSPListQueryHost.prototype.render = function () {
        var _this = this;
        if (this.state.loadedList === false || this.state.loadedFields === false) {
            return (React.createElement("div", null,
                React.createElement(Label_1.Label, null, this.props.label),
                React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.normal })));
        }
        //Renders content
        return (React.createElement("div", null,
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement(Dropdown_1.Dropdown, { label: strings.SPListQueryList, onChanged: this.onChangedList, options: this.state.lists, selectedKey: this.state.selectedList, disabled: this.props.disabled }),
            this.props.showOrderBy != false ?
                React.createElement("div", null,
                    React.createElement(Dropdown_1.Dropdown, { label: strings.SPListQueryOrderBy, options: this.state.fields, selectedKey: this.state.selectedField, onChanged: this.onChangedField, disabled: this.props.disabled === false && this.state.selectedList != null && this.state.selectedList != '' ? false : true }),
                    React.createElement(Dropdown_1.Dropdown, { label: strings.SPListQueryArranged, options: this.state.arranged, selectedKey: this.state.selectedArrange, onChanged: this.onChangedArranged, disabled: this.props.disabled === false && this.state.selectedList != null && this.state.selectedList != '' ? false : true }))
                : '',
            this.props.showMax != false ?
                React.createElement(Slider_1.Slider, { label: strings.SPListQueryMax, min: 0, max: this.props.max == null ? 500 : this.props.max, defaultValue: this.state.max, onChange: this.onChangedMax, disabled: this.props.disabled === false && this.state.selectedList != null && this.state.selectedList != '' ? false : true })
                : '',
            this.state.filters.map(function (value, index) {
                return (React.createElement("div", null,
                    React.createElement(Label_1.Label, null, "Filter"),
                    React.createElement(Dropdown_1.Dropdown, { label: '', disabled: _this.props.disabled, options: _this.state.fields, selectedKey: value.field, onChanged: function (option, selectIndex) { return _this.onChangedFilterField(option, selectIndex, index); } }),
                    React.createElement(Dropdown_1.Dropdown, { label: '', disabled: _this.props.disabled, options: _this.state.operators, selectedKey: value.operator, onChanged: function (option, selectIndex) { return _this.onChangedFilterOperator(option, selectIndex, index); } }),
                    React.createElement(TextField_1.TextField, { disabled: _this.props.disabled, defaultValue: value.value, onChanged: function (value2) { return _this.onChangedFilterValue(value2, index); } }),
                    React.createElement(Button_1.CommandButton, { disabled: _this.props.disabled, onClick: function () { return _this.onClickRemoveFilter(index); }, iconProps: { iconName: 'Delete' } }, strings.SPListQueryRemove)));
            }),
            this.props.showFilters != false ?
                React.createElement(Button_1.CommandButton, { onClick: this.onClickAddFilter, disabled: this.props.disabled === false && this.state.selectedList != null && this.state.selectedList != '' ? false : true, iconProps: { iconName: 'Add' } }, strings.SPListQueryAdd)
                : '',
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", { style: { paddingBottom: '8px' } },
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    return PropertyFieldSPListQueryHost;
}(React.Component));
exports.default = PropertyFieldSPListQueryHost;
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
    SPListPickerService.prototype.getFields = function (listId) {
        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
            //If the running environment is local, load the data from the mock
            return this.getFieldsFromMock();
        }
        else {
            var queryUrl = this.context.pageContext.web.absoluteUrl;
            queryUrl += "/_api/lists(guid'";
            queryUrl += listId;
            queryUrl += "')/Fields?$select=Title,StaticName&$orderBy=Title&$filter=Hidden%20eq%20false";
            return this.context.spHttpClient.get(queryUrl, sp_http_1.SPHttpClient.configurations.v1).then(function (response) {
                return response.json();
            });
        }
    };
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
                if (this.props.orderBy == PropertyFieldSPListQuery_1.PropertyFieldSPListQueryOrderBy.Id)
                    queryUrl += "Id";
                else if (this.props.orderBy == PropertyFieldSPListQuery_1.PropertyFieldSPListQueryOrderBy.Title)
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
    SPListPickerService.prototype.getFieldsFromMock = function () {
        return SPListPickerMockHttpClient.getFields(this.context.pageContext.web.absoluteUrl).then(function () {
            var listData = {
                value: [
                    { Title: 'ID', StaticName: 'ID' },
                    { Title: 'Title', StaticName: 'Title' },
                    { Title: 'Created', StaticName: 'Created' },
                    { Title: 'Modified', StaticName: 'Modified' }
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
    SPListPickerMockHttpClient.getFields = function (restUrl, options) {
        return new Promise(function (resolve) {
            resolve(SPListPickerMockHttpClient._resultsF);
        });
    };
    /**
     * @var
     * Mock SharePoint result sample
     */
    SPListPickerMockHttpClient._results = { value: [] };
    SPListPickerMockHttpClient._resultsF = { value: [] };
    return SPListPickerMockHttpClient;
}());
//# sourceMappingURL=PropertyFieldSPListQueryHost.js.map