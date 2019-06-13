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
 * @file PropertyFieldGroupPickerHost.tsx
 * Renders the controls for PropertyFieldGroupPicker component
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 *
 */
var React = require("react");
var sp_http_1 = require("@microsoft/sp-http");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var PropertyFieldGroupPicker_1 = require("./PropertyFieldGroupPicker");
var Pickers_1 = require("office-ui-fabric-react/lib/Pickers");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var strings = require("sp-client-custom-fields/strings");
/**
 * @class
 * Renders the controls for PropertyFieldGroupPicker component
 */
var PropertyFieldGroupPickerHost = /** @class */ (function (_super) {
    __extends(PropertyFieldGroupPickerHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldGroupPickerHost(props) {
        var _this = _super.call(this, props) || this;
        _this.intialPersonas = new Array();
        _this.resultsPeople = new Array();
        _this.resultsPersonas = new Array();
        _this.selectedPeople = new Array();
        _this.selectedPersonas = new Array();
        _this.searchService = new PropertyFieldSearchService(props.context);
        _this.onSearchFieldChanged = _this.onSearchFieldChanged.bind(_this);
        _this.onItemChanged = _this.onItemChanged.bind(_this);
        _this.createInitialPersonas();
        _this.state = {
            resultsPeople: _this.resultsPeople,
            resultsPersonas: _this.resultsPersonas,
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
     * Renders the PeoplePicker controls with Office UI  Fabric
     */
    PropertyFieldGroupPickerHost.prototype.render = function () {
        var suggestionProps = {
            suggestionsHeaderText: strings.PeoplePickerSuggestedContacts,
            noResultsFoundText: strings.PeoplePickerNoResults,
            loadingText: strings.PeoplePickerLoading,
        };
        //Renders content
        return (React.createElement("div", null,
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement(Pickers_1.NormalPeoplePicker, { pickerSuggestionsProps: suggestionProps, onResolveSuggestions: this.onSearchFieldChanged, onChange: this.onItemChanged, defaultSelectedItems: this.intialPersonas }),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", { style: { paddingBottom: '8px' } },
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    /**
     * @function
     * A search field change occured
     */
    PropertyFieldGroupPickerHost.prototype.onSearchFieldChanged = function (searchText, currentSelected) {
        var _this = this;
        if (searchText.length > 2) {
            //Clear the suggestions list
            this.setState({ resultsPeople: this.resultsPeople, resultsPersonas: this.resultsPersonas });
            //Request the search service
            var result = this.searchService.searchGroups(searchText, this.props.groupType).then(function (response) {
                _this.resultsPeople = [];
                _this.resultsPersonas = [];
                //If allowDuplicate == false, so remove duplicates from results
                if (_this.props.allowDuplicate === false)
                    response = _this.removeDuplicates(response);
                response.map(function (element, index) {
                    //Fill the results Array
                    _this.resultsPeople.push(element);
                    //Transform the response in IPersonaProps object
                    _this.resultsPersonas.push(_this.getPersonaFromGroup(element, index));
                });
                //Refresh the component's state
                _this.setState({ resultsPeople: _this.resultsPeople, resultsPersonas: _this.resultsPersonas });
                return _this.resultsPersonas;
            });
            return result;
        }
        else {
            return [];
        }
    };
    /**
     * @function
     * Remove the duplicates if property allowDuplicate equals false
     */
    PropertyFieldGroupPickerHost.prototype.removeDuplicates = function (responsePeople) {
        var _this = this;
        if (this.selectedPeople == null || this.selectedPeople.length == 0)
            return responsePeople;
        var res = [];
        responsePeople.map(function (element) {
            var found = false;
            for (var i = 0; i < _this.selectedPeople.length; i++) {
                var responseItem = _this.selectedPeople[i];
                if (responseItem.id == element.id) {
                    found = true;
                    break;
                }
            }
            if (found === false)
                res.push(element);
        });
        return res;
    };
    /**
     * @function
     * Creates the collection of initial personas from initial IPropertyFieldGroup collection
     */
    PropertyFieldGroupPickerHost.prototype.createInitialPersonas = function () {
        var _this = this;
        if (this.props.initialData == null || typeof (this.props.initialData) != typeof Array())
            return;
        this.props.initialData.map(function (element, index) {
            var persona = _this.getPersonaFromGroup(element, index);
            _this.intialPersonas.push(persona);
            _this.selectedPersonas.push(persona);
            _this.selectedPeople.push(element);
        });
    };
    /**
     * @function
     * Generates a IPersonaProps object from a IPropertyFieldGroup object
     */
    PropertyFieldGroupPickerHost.prototype.getPersonaFromGroup = function (element, index) {
        return {
            primaryText: element.fullName, secondaryText: element.description
        };
    };
    /**
     * @function
     * Refreshes the web part properties
     */
    PropertyFieldGroupPickerHost.prototype.refreshWebPartProperties = function () {
        this.delayedValidate(this.selectedPeople);
    };
    /**
    * @function
    * Validates the new custom field value
    */
    PropertyFieldGroupPickerHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.initialData, value);
            return;
        }
        var result = this.props.onGetErrorMessage(value || []);
        if (result !== undefined) {
            if (typeof result === 'string') {
                if (result === undefined || result === '')
                    this.notifyAfterValidate(this.props.initialData, value);
                this.state.errorMessage = result;
                this.setState(this.state);
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(_this.props.initialData, value);
                    _this.state.errorMessage = errorMessage;
                    _this.setState(_this.state);
                });
            }
        }
        else {
            this.notifyAfterValidate(this.props.initialData, value);
        }
    };
    /**
     * @function
     * Notifies the parent Web Part of a property value change
     */
    PropertyFieldGroupPickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
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
    PropertyFieldGroupPickerHost.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    /**
     * @function
     * Event raises when the user changed people from hte PeoplePicker component
     */
    PropertyFieldGroupPickerHost.prototype.onItemChanged = function (selectedItems) {
        var _this = this;
        if (selectedItems.length > 0) {
            if (selectedItems.length > this.selectedPersonas.length) {
                var index = this.resultsPersonas.indexOf(selectedItems[selectedItems.length - 1]);
                if (index > -1) {
                    var people = this.resultsPeople[index];
                    this.selectedPeople.push(people);
                    this.selectedPersonas.push(this.resultsPersonas[index]);
                    this.refreshWebPartProperties();
                }
            }
            else {
                this.selectedPersonas.map(function (person, index2) {
                    var selectedItemIndex = selectedItems.indexOf(person);
                    if (selectedItemIndex === -1) {
                        _this.selectedPersonas.splice(index2, 1);
                        _this.selectedPeople.splice(index2, 1);
                    }
                });
            }
        }
        else {
            this.selectedPersonas.splice(0, this.selectedPersonas.length);
            this.selectedPeople.splice(0, this.selectedPeople.length);
        }
        this.refreshWebPartProperties();
    };
    return PropertyFieldGroupPickerHost;
}(React.Component));
exports.default = PropertyFieldGroupPickerHost;
/**
 * @class
 * Service implementation to search people in SharePoint
 */
var PropertyFieldSearchService = /** @class */ (function () {
    /**
     * @function
     * Service constructor
     */
    function PropertyFieldSearchService(pageContext) {
        this.context = pageContext;
    }
    /**
     * @function
     * Search groups from the SharePoint database
     */
    PropertyFieldSearchService.prototype.searchGroups = function (query, type) {
        var _this = this;
        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
            //If the running environment is local, load the data from the mock
            return this.searchGroupsFromMock(query);
        }
        else {
            //If the running env is SharePoint, loads from the peoplepicker web service
            var contextInfoUrl = this.context.pageContext.web.absoluteUrl + "/_api/contextinfo";
            var userRequestUrl = this.context.pageContext.web.absoluteUrl + "/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser";
            var httpPostOptions = {
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json"
                }
            };
            return this.context.spHttpClient.post(contextInfoUrl, sp_http_1.SPHttpClient.configurations.v1, httpPostOptions).then(function (response) {
                return response.json().then(function (jsonResponse) {
                    var formDigestValue = jsonResponse.FormDigestValue;
                    var data = {
                        'queryParams': {
                            //'__metadata': {
                            //    'type': 'SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters'
                            //},
                            'AllowEmailAddresses': true,
                            'AllowMultipleEntities': false,
                            'AllUrlZones': false,
                            'MaximumEntitySuggestions': 20,
                            'PrincipalSource': 15,
                            //PrincipalType controls the type of entities that are returned in the results.
                            //Choices are All - 15, Distribution List - 2 , Security Groups - 4,
                            //SharePoint Groups &ndash; 8, User &ndash; 1. These values can be combined
                            'PrincipalType': type === PropertyFieldGroupPicker_1.IGroupType.SharePoint ? 8 : 4,
                            'QueryString': query
                            //'Required':false,
                            //'SharePointGroupID':null,
                            //'UrlZone':null,
                            //'UrlZoneSpecified':false,
                        }
                    };
                    httpPostOptions = {
                        headers: {
                            'accept': 'application/json',
                            'content-type': 'application/json',
                            "X-RequestDigest": formDigestValue
                        },
                        body: JSON.stringify(data)
                    };
                    return _this.context.spHttpClient.post(userRequestUrl, sp_http_1.SPHttpClient.configurations.v1, httpPostOptions).then(function (searchResponse) {
                        return searchResponse.json().then(function (usersResponse) {
                            var res = [];
                            var values = JSON.parse(usersResponse.value);
                            values.map(function (element) {
                                var persona = {
                                    fullName: element.DisplayText,
                                    login: type === PropertyFieldGroupPicker_1.IGroupType.SharePoint ? element.EntityData.AccountName : element.ProviderName,
                                    id: type === PropertyFieldGroupPicker_1.IGroupType.SharePoint ? element.EntityData.SPGroupID : element.Key,
                                    description: element.Description
                                };
                                res.push(persona);
                            });
                            return res;
                        });
                    });
                });
            });
        }
    };
    /**
     * @function
     * Returns fake people results for the Mock mode
     */
    PropertyFieldSearchService.prototype.searchGroupsFromMock = function (query) {
        return PeoplePickerMockHttpClient.searchGroups(this.context.pageContext.web.absoluteUrl).then(function () {
            var results = [
                { id: '1', fullName: "Members", login: "Members", description: 'Members' },
                { id: '2', fullName: "Viewers", login: "Viewers", description: 'Viewers' },
                { id: '3', fullName: "Excel Services Viewers", login: "Excel Services Viewers", description: 'Excel Services Viewers' }
            ];
            return results;
        });
    };
    return PropertyFieldSearchService;
}());
/**
 * @class
 * Defines a http client to request mock data to use the web part with the local workbench
 */
var PeoplePickerMockHttpClient = /** @class */ (function () {
    function PeoplePickerMockHttpClient() {
    }
    /**
     * @function
     * Mock search People method
     */
    PeoplePickerMockHttpClient.searchGroups = function (restUrl, options) {
        return new Promise(function (resolve) {
            resolve(PeoplePickerMockHttpClient._results);
        });
    };
    /**
     * @var
     * Mock SharePoint result sample
     */
    PeoplePickerMockHttpClient._results = [];
    return PeoplePickerMockHttpClient;
}());
//# sourceMappingURL=PropertyFieldGroupPickerHost.js.map