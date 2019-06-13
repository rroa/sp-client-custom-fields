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
 * @file PropertyFieldTermSetPickerHost.tsx
 * Renders the controls for PropertyFieldTermSetPicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
var React = require("react");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Panel_1 = require("office-ui-fabric-react/lib/Panel");
var Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_http_1 = require("@microsoft/sp-http");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Checkbox_1 = require("office-ui-fabric-react/lib/Checkbox");
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
require('react-ui-tree-draggable/dist/react-ui-tree.css');
var Tree = require('react-ui-tree-draggable/dist/react-ui-tree');
/**
 * @class
 * Renders the controls for PropertyFieldTermSetPicker component
 */
var PropertyFieldTermSetPickerHost = /** @class */ (function (_super) {
    __extends(PropertyFieldTermSetPickerHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldTermSetPickerHost(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            activeNodes: _this.props.initialValues !== undefined ? _this.props.initialValues : [],
            termStores: [],
            loaded: false,
            openPanel: false,
            errorMessage: ''
        };
        _this.onOpenPanel = _this.onOpenPanel.bind(_this);
        _this.onClosePanel = _this.onClosePanel.bind(_this);
        _this.renderNode = _this.renderNode.bind(_this);
        _this.onClickNode = _this.onClickNode.bind(_this);
        _this.async = new Utilities_1.Async(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        return _this;
    }
    /**
     * @function
     * Loads the list from SharePoint current web site
     */
    PropertyFieldTermSetPickerHost.prototype.loadTermStores = function () {
        var _this = this;
        var termsService = new SPTermStorePickerService(this.props, this.props.context);
        termsService.getTermStores().then(function (response) {
            _this.state.termStores = response;
            _this.state.loaded = true;
            _this.setState(_this.state);
            response.map(function (termStore, index) {
                termsService.getTermStoresGroups(termStore).then(function (groupsResponse) {
                    termStore.children = groupsResponse;
                    _this.setState(_this.state);
                    groupsResponse.map(function (group) {
                        termsService.getTermSets(termStore, group).then(function (termSetsResponse) {
                            group.children = termSetsResponse;
                            _this.setState(_this.state);
                        });
                    });
                });
            });
        });
    };
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldTermSetPickerHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.initialValues, value);
            return;
        }
        var result = this.props.onGetErrorMessage(value || []);
        if (result !== undefined) {
            if (typeof result === 'string') {
                if (result === undefined || result === '')
                    this.notifyAfterValidate(this.props.initialValues, value);
                this.state.errorMessage = result;
                this.setState(this.state);
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(_this.props.initialValues, value);
                    _this.state.errorMessage = errorMessage;
                    _this.setState(_this.state);
                });
            }
        }
        else {
            this.notifyAfterValidate(this.props.initialValues, value);
        }
    };
    /**
     * @function
     * Notifies the parent Web Part of a property value change
     */
    PropertyFieldTermSetPickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
        if (this.props.onPropertyChange && newValue != null) {
            this.props.properties[this.props.targetProperty] = newValue;
            this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
            if (!this.props.disableReactivePropertyChanges && this.props.render != null)
                this.props.render();
        }
    };
    /**
     * @function
     * Open the right Panel
     */
    PropertyFieldTermSetPickerHost.prototype.onOpenPanel = function () {
        if (this.props.disabled === true)
            return;
        this.state.openPanel = true;
        this.state.loaded = false;
        this.loadTermStores();
        this.setState(this.state);
    };
    /**
     * @function
     * Close the panel
     */
    PropertyFieldTermSetPickerHost.prototype.onClosePanel = function () {
        this.state.openPanel = false;
        this.state.loaded = false;
        this.setState(this.state);
    };
    /**
     * clicks on a node
     * @param node
     */
    PropertyFieldTermSetPickerHost.prototype.onClickNode = function (node) {
        if (node.children !== undefined && node.children.length != 0)
            return;
        if (this.props.allowMultipleSelections === false) {
            this.state.activeNodes = [node];
        }
        else {
            var index = this.getSelectedNodePosition(node);
            if (index != -1)
                this.state.activeNodes.splice(index, 1);
            else
                this.state.activeNodes.push(node);
        }
        this.setState(this.state);
        this.delayedValidate(this.state.activeNodes);
    };
    /**
     * @function
     * Gets the given node position in the active nodes collection
     * @param node
     */
    PropertyFieldTermSetPickerHost.prototype.getSelectedNodePosition = function (node) {
        for (var i = 0; i < this.state.activeNodes.length; i++) {
            if (node.Guid === this.state.activeNodes[i].Guid)
                return i;
        }
        return -1;
    };
    /**
     * @function
     * Called when the component will unmount
     */
    PropertyFieldTermSetPickerHost.prototype.componentWillUnmount = function () {
        if (this.async !== undefined)
            this.async.dispose();
    };
    /**
     * @function
     * Renders the given node
     * @param node
     */
    PropertyFieldTermSetPickerHost.prototype.renderNode = function (node) {
        var style = { padding: '4px 5px', width: '100%', display: 'flex' };
        var selected = false;
        var isFolder = false;
        if (node.leaf === false || (node.children !== undefined && node.children.length != 0))
            isFolder = true;
        var checkBoxAvailable = true;
        if (isFolder === true)
            checkBoxAvailable = false;
        var picUrl = '';
        if (node.type === "TermStore") {
            picUrl = this.props.context.pageContext.web.absoluteUrl + '/_layouts/15/Images/EMMRoot.png';
        }
        else if (node.type === "TermGroup") {
            picUrl = this.props.context.pageContext.web.absoluteUrl + '/_layouts/15/Images/EMMGroup.png';
        }
        else if (node.type === "TermSet") {
            picUrl = this.props.context.pageContext.web.absoluteUrl + '/_layouts/15/Images/EMMTermSet.png';
            selected = this.getSelectedNodePosition(node) != -1;
            if (selected === true) {
                style.backgroundColor = '#EAEAEA';
            }
        }
        return (React.createElement("div", { style: style, onClick: this.onClickNode.bind(null, node), name: node.Guid, id: node.Guid, role: "menuitem" },
            checkBoxAvailable ?
                React.createElement("div", { style: { marginRight: '5px' } },
                    React.createElement(Checkbox_1.Checkbox, { checked: selected, disabled: this.props.disabled, label: '', onChange: this.onClickNode.bind(null, node) }))
                : '',
            React.createElement("div", { style: { paddingTop: '7px' } },
                picUrl !== undefined && picUrl != '' ?
                    React.createElement("img", { src: picUrl, width: "18", height: "18", style: { paddingRight: '5px' }, alt: node.Name })
                    : '',
                node.type === "TermStore" ? React.createElement("strong", null, node.Name) : node.Name)));
    };
    /**
     * @function
     * Renders the SPListpicker controls with Office UI  Fabric
     */
    PropertyFieldTermSetPickerHost.prototype.render = function () {
        var _this = this;
        var termSetsString = '';
        if (this.state.activeNodes !== undefined) {
            this.state.activeNodes.map(function (termSet, index) {
                if (index > 0)
                    termSetsString += '; ';
                termSetsString += termSet.Name;
            });
        }
        //Renders content
        return (React.createElement("div", null,
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement("table", { style: { width: '100%', borderSpacing: 0 } },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", { width: "*" },
                            React.createElement(TextField_1.TextField, { disabled: this.props.disabled, style: { width: '100%' }, onChanged: null, readOnly: true, value: termSetsString })),
                        React.createElement("td", { width: "32" },
                            React.createElement(Button_1.IconButton, { disabled: this.props.disabled, iconProps: { iconName: 'Tag' }, onClick: this.onOpenPanel }))))),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", { style: { paddingBottom: '8px' } },
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : '',
            React.createElement(Panel_1.Panel, { isOpen: this.state.openPanel, hasCloseButton: true, onDismiss: this.onClosePanel, isLightDismiss: true, type: Panel_1.PanelType.medium, headerText: this.props.panelTitle },
                this.state.loaded === false ? React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.normal }) : '',
                this.state.loaded === true ? this.state.termStores.map(function (rootNode, index) {
                    return (React.createElement(Tree, { paddingLeft: 15, tree: rootNode, isNodeCollapsed: false, renderNode: _this.renderNode, draggable: false, key: 'termRootNode-' + index }));
                })
                    : '')));
    };
    return PropertyFieldTermSetPickerHost;
}(React.Component));
exports.default = PropertyFieldTermSetPickerHost;
/**
 * @class
 * Service implementation to manage term stores in SharePoint
 */
var SPTermStorePickerService = /** @class */ (function () {
    /**
     * @function
     * Service constructor
     */
    function SPTermStorePickerService(_props, pageContext) {
        this.props = _props;
        this.context = pageContext;
    }
    /**
     * @function
     * Gets the collection of term stores in the current SharePoint env
     */
    SPTermStorePickerService.prototype.getTermStores = function () {
        var _this = this;
        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
            //If the running environment is local, load the data from the mock
            return this.getTermStoresFromMock();
        }
        else {
            //First gets the FORM DIGEST VALUE
            var contextInfoUrl = this.context.pageContext.web.absoluteUrl + "/_api/contextinfo";
            var httpPostOptions = {
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json"
                }
            };
            return this.context.spHttpClient.post(contextInfoUrl, sp_http_1.SPHttpClient.configurations.v1, httpPostOptions).then(function (response) {
                return response.json().then(function (jsonResponse) {
                    _this.formDigest = jsonResponse.FormDigestValue;
                    //Build the Client Service Request
                    var clientServiceUrl = _this.context.pageContext.web.absoluteUrl + '/_vti_bin/client.svc/ProcessQuery';
                    var data = '<Request xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="Javascript Library"><Actions><ObjectPath Id="1" ObjectPathId="0" /><ObjectIdentityQuery Id="2" ObjectPathId="0" /><Query Id="3" ObjectPathId="0"><Query SelectAllProperties="true"><Properties /></Query></Query><ObjectPath Id="5" ObjectPathId="4" /><Query Id="6" ObjectPathId="4"><Query SelectAllProperties="true"><Properties /></Query><ChildItemQuery SelectAllProperties="true"><Properties /></ChildItemQuery></Query></Actions><ObjectPaths><StaticMethod Id="0" Name="GetTaxonomySession" TypeId="{981cbc68-9edc-4f8d-872f-71146fcbb84f}" /><Property Id="4" ParentId="0" Name="TermStores" /></ObjectPaths></Request>';
                    httpPostOptions = {
                        headers: {
                            'accept': 'application/json',
                            'content-type': 'application/json',
                            "X-RequestDigest": _this.formDigest
                        },
                        body: data
                    };
                    return _this.context.spHttpClient.post(clientServiceUrl, sp_http_1.SPHttpClient.configurations.v1, httpPostOptions).then(function (serviceResponse) {
                        return serviceResponse.json().then(function (serviceJSONResponse) {
                            //Construct results
                            var res = [];
                            serviceJSONResponse.map(function (child) {
                                if (child != null && child['_ObjectType_'] !== undefined) {
                                    var objType = child['_ObjectType_'];
                                    if (objType === "SP.Taxonomy.TaxonomySession") {
                                        _this.taxonomySession = child['_ObjectIdentity_'];
                                    }
                                    else if (objType === "SP.Taxonomy.TermStoreCollection") {
                                        var childTermStores = child['_Child_Items_'];
                                        childTermStores.map(function (childTerm) {
                                            var newTermStore = {
                                                Name: childTerm['Name'] !== undefined ? childTerm['Name'] : '',
                                                Guid: childTerm['Id'] !== undefined ? _this.cleanGuid(childTerm['Id']) : '',
                                                Identity: childTerm['_ObjectIdentity_'] !== undefined ? childTerm['_ObjectIdentity_'] : '',
                                                IsOnline: childTerm['IsOnline'] !== undefined ? childTerm['IsOnline'] : '',
                                                WorkingLanguage: childTerm['WorkingLanguage'] !== undefined ? childTerm['WorkingLanguage'] : '',
                                                DefaultLanguage: childTerm['DefaultLanguage'] !== undefined ? childTerm['DefaultLanguage'] : '',
                                                Languages: childTerm['Languages'] !== undefined ? childTerm['Languages'] : [],
                                                leaf: false,
                                                type: 'TermStore'
                                            };
                                            if (!(_this.props.excludeOfflineTermStores === true && newTermStore.IsOnline === false))
                                                res.push(newTermStore);
                                        });
                                    }
                                }
                            });
                            return res;
                        });
                    });
                });
            });
        }
    };
    SPTermStorePickerService.prototype.getTermStoresGroups = function (termStore) {
        var _this = this;
        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
            //If the running environment is local, load the data from the mock
            return this.getTermStoresGroupsFromMock(termStore.Identity);
        }
        else {
            //Build the Client Service Request
            var clientServiceUrl = this.context.pageContext.web.absoluteUrl + '/_vti_bin/client.svc/ProcessQuery';
            var data = '<Request xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="Javascript Library"><Actions><ObjectPath Id="16" ObjectPathId="15" /><Query Id="17" ObjectPathId="15"><Query SelectAllProperties="true"><Properties /></Query><ChildItemQuery SelectAllProperties="true"><Properties /></ChildItemQuery></Query></Actions><ObjectPaths><Property Id="15" ParentId="5" Name="Groups" /><Identity Id="5" Name="' + termStore.Identity + '" /></ObjectPaths></Request>';
            var httpPostOptions = {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    "X-RequestDigest": this.formDigest
                },
                body: data
            };
            return this.context.spHttpClient.post(clientServiceUrl, sp_http_1.SPHttpClient.configurations.v1, httpPostOptions).then(function (serviceResponse) {
                return serviceResponse.json().then(function (serviceJSONResponse) {
                    var res = [];
                    serviceJSONResponse.map(function (child) {
                        var objType = child['_ObjectType_'];
                        if (objType === "SP.Taxonomy.TermGroupCollection") {
                            if (child['_Child_Items_'] !== undefined) {
                                child['_Child_Items_'].map(function (childGroup) {
                                    var objGroup = {
                                        Name: childGroup['Name'] !== undefined ? childGroup['Name'] : '',
                                        Guid: childGroup['Id'] !== undefined ? _this.cleanGuid(childGroup['Id']) : '',
                                        Identity: childGroup['_ObjectIdentity_'] !== undefined ? childGroup['_ObjectIdentity_'] : '',
                                        IsSiteCollectionGroup: childGroup['IsSiteCollectionGroup'] !== undefined ? childGroup['IsSiteCollectionGroup'] : '',
                                        IsSystemGroup: childGroup['IsSystemGroup'] !== undefined ? childGroup['IsSystemGroup'] : '',
                                        CreatedDate: childGroup['CreatedDate'] !== undefined ? childGroup['CreatedDate'] : '',
                                        LastModifiedDate: childGroup['LastModifiedDate'] !== undefined ? childGroup['LastModifiedDate'] : '',
                                        leaf: false,
                                        type: 'TermGroup'
                                    };
                                    if (_this.props.excludeSystemGroup === true) {
                                        if (objGroup.IsSystemGroup !== true)
                                            res.push(objGroup);
                                    }
                                    else {
                                        res.push(objGroup);
                                    }
                                });
                            }
                        }
                    });
                    return res;
                });
            });
        }
    };
    SPTermStorePickerService.prototype.getTermSets = function (termStore, group) {
        var _this = this;
        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
            //If the running environment is local, load the data from the mock
            return this.getTermSetsFromMock(termStore.Identity, group.Guid);
        }
        else {
            //Build the Client Service Request
            var clientServiceUrl = this.context.pageContext.web.absoluteUrl + '/_vti_bin/client.svc/ProcessQuery';
            var data = '<Request xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="Javascript Library"><Actions><ObjectPath Id="26" ObjectPathId="25" /><ObjectIdentityQuery Id="27" ObjectPathId="25" /><ObjectPath Id="29" ObjectPathId="28" /><Query Id="30" ObjectPathId="28"><Query SelectAllProperties="true"><Properties /></Query><ChildItemQuery SelectAllProperties="true"><Properties /></ChildItemQuery></Query></Actions><ObjectPaths><Method Id="25" ParentId="15" Name="GetById"><Parameters><Parameter Type="String">' + group.Guid + '</Parameter></Parameters></Method><Property Id="28" ParentId="25" Name="TermSets" /><Property Id="15" ParentId="5" Name="Groups" /><Identity Id="5" Name="' + termStore.Identity + '" /></ObjectPaths></Request>';
            var httpPostOptions = {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    "X-RequestDigest": this.formDigest
                },
                body: data
            };
            return this.context.spHttpClient.post(clientServiceUrl, sp_http_1.SPHttpClient.configurations.v1, httpPostOptions).then(function (serviceResponse) {
                return serviceResponse.json().then(function (serviceJSONResponse) {
                    var res = [];
                    serviceJSONResponse.map(function (child) {
                        var objType = child['_ObjectType_'];
                        if (objType === "SP.Taxonomy.TermSetCollection") {
                            if (child['_Child_Items_'] !== undefined) {
                                child['_Child_Items_'].map(function (childGroup) {
                                    var objGroup = {
                                        Name: childGroup['Name'] !== undefined ? childGroup['Name'] : '',
                                        Guid: childGroup['Id'] !== undefined ? _this.cleanGuid(childGroup['Id']) : '',
                                        Identity: childGroup['_ObjectIdentity_'] !== undefined ? childGroup['_ObjectIdentity_'] : '',
                                        CustomSortOrder: childGroup['CustomSortOrder'] !== undefined ? childGroup['CustomSortOrder'] : '',
                                        IsAvailableForTagging: childGroup['IsAvailableForTagging'] !== undefined ? childGroup['IsAvailableForTagging'] : '',
                                        Owner: childGroup['Owner'] !== undefined ? childGroup['Owner'] : '',
                                        Contact: childGroup['Contact'] !== undefined ? childGroup['Contact'] : '',
                                        Description: childGroup['Description'] !== undefined ? childGroup['Description'] : '',
                                        IsOpenForTermCreation: childGroup['IsOpenForTermCreation'] !== undefined ? childGroup['IsOpenForTermCreation'] : '',
                                        TermStoreGuid: termStore.Guid,
                                        leaf: true,
                                        type: 'TermSet'
                                    };
                                    if (_this.props.displayOnlyTermSetsAvailableForTagging === true) {
                                        if (objGroup.IsAvailableForTagging === true)
                                            res.push(objGroup);
                                    }
                                    else {
                                        res.push(objGroup);
                                    }
                                });
                            }
                        }
                    });
                    return res;
                });
            });
        }
    };
    /**
     * @function
     * Clean the Guid from the Web Service response
     * @param guid
     */
    SPTermStorePickerService.prototype.cleanGuid = function (guid) {
        if (guid !== undefined)
            return guid.replace('/Guid(', '').replace('/', '').replace(')', '');
        else
            return '';
    };
    /**
     * @function
     * Returns 3 fake SharePoint lists for the Mock mode
     */
    SPTermStorePickerService.prototype.getTermStoresFromMock = function () {
        return SPTermStoreMockHttpClient.getTermStores(this.context.pageContext.web.absoluteUrl).then(function () {
            var mockData = [
                { Name: 'Taxonomy_jHIKWt45FAQsxsbHfZ3r1Q==', Guid: '/Guid(8ca33abb-2ee5-42d4-acb6-bd138adec078)/',
                    Identity: '8ca33abb-2ee5-42d4-acb6-bd138adec078',
                    IsOnline: true, WorkingLanguage: '1033',
                    DefaultLanguage: '1033', Languages: [],
                    leaf: false, type: 'TermStore'
                }
            ];
            return mockData;
        });
    };
    SPTermStorePickerService.prototype.getTermStoresGroupsFromMock = function (termStoreIdentity) {
        return SPTermStoreMockHttpClient.getTermStoresGroups(this.context.pageContext.web.absoluteUrl).then(function () {
            var mockData = [
                {
                    Name: 'People', Guid: '/Guid(8ca33abb-2ee5-42d4-acb6-bd138adec078)/',
                    Identity: '8ca33abb-2ee5-42d4-acb6-bd138adec078',
                    IsSiteCollectionGroup: false,
                    IsSystemGroup: false,
                    CreatedDate: '',
                    LastModifiedDate: '',
                    leaf: false, type: 'TermGroup'
                },
                {
                    Name: 'Search Dictionaries', Guid: '/Guid(8ca33acc-2ee5-42d4-acb6-bd138adec078)/',
                    Identity: '8ca33abb-2ee5-42d4-acb6-bd138adec078',
                    IsSiteCollectionGroup: false,
                    IsSystemGroup: false,
                    CreatedDate: '',
                    LastModifiedDate: '',
                    leaf: false, type: 'TermGroup'
                }
            ];
            return mockData;
        });
    };
    SPTermStorePickerService.prototype.getTermSetsFromMock = function (termStoreIdentity, groupGuid) {
        return SPTermStoreMockHttpClient.getTermSetsFromMock(this.context.pageContext.web.absoluteUrl).then(function () {
            var mockData = [
                {
                    Name: 'People', Guid: '/Guid(8ca44acc-2ee5-42d4-acb6-bd138adec078)/',
                    Identity: '8ca44acc-2ee5-42d4-acb6-bd138adec078',
                    CustomSortOrder: '',
                    IsAvailableForTagging: true,
                    Owner: '',
                    Contact: '',
                    Description: '',
                    IsOpenForTermCreation: true,
                    TermStoreGuid: '8ca33abb-2ee5-42d4-acb6-bd138adec078',
                    leaf: true, type: 'TermSet'
                },
                {
                    Name: 'Job Title', Guid: '/Guid(8ca44acc-2ff4-42d4-acb6-bd138adec078)/',
                    Identity: '8ca44acc-2ff4-42d4-acb6-bd138adec078',
                    CustomSortOrder: '',
                    IsAvailableForTagging: true,
                    Owner: '',
                    Contact: '',
                    Description: '',
                    IsOpenForTermCreation: true,
                    TermStoreGuid: '8ca33abb-2ee5-42d4-acb6-bd138adec078',
                    leaf: true, type: 'TermSet'
                }
            ];
            return mockData;
        });
    };
    return SPTermStorePickerService;
}());
/**
 * @class
 * Defines a http client to request mock data to use the web part with the local workbench
 */
var SPTermStoreMockHttpClient = /** @class */ (function () {
    function SPTermStoreMockHttpClient() {
    }
    /**
     * @function
     * Mock search People method
     */
    SPTermStoreMockHttpClient.getTermStores = function (restUrl, options) {
        return new Promise(function (resolve) {
            resolve(SPTermStoreMockHttpClient._mockTermStores);
        });
    };
    SPTermStoreMockHttpClient.getTermStoresGroups = function (restUrl, options) {
        return new Promise(function (resolve) {
            resolve(SPTermStoreMockHttpClient._mockTermStoresGroups);
        });
    };
    SPTermStoreMockHttpClient.getTermSetsFromMock = function (restUrl, options) {
        return new Promise(function (resolve) {
            resolve(SPTermStoreMockHttpClient._mockTermSets);
        });
    };
    /**
     * @var
     * Mock SharePoint result sample
     */
    SPTermStoreMockHttpClient._mockTermStores = [];
    SPTermStoreMockHttpClient._mockTermStoresGroups = [];
    SPTermStoreMockHttpClient._mockTermSets = [];
    return SPTermStoreMockHttpClient;
}());
//# sourceMappingURL=PropertyFieldTermSetPickerHost.js.map