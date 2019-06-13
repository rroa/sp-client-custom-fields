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
 * @file PropertyFieldCustomListHost.tsx
 * Renders the controls for PropertyFieldCustomList component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var PropertyFields_module_scss_1 = require("./PropertyFields.module.scss");
var PropertyFieldCustomList_1 = require("./PropertyFieldCustomList");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Dialog_1 = require("office-ui-fabric-react/lib/Dialog");
var CommandBar_1 = require("office-ui-fabric-react/lib/CommandBar");
var MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
var DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
var PropertyFieldDatePickerHost_1 = require("./PropertyFieldDatePickerHost");
var PropertyFieldDateTimePickerHost_1 = require("./PropertyFieldDateTimePickerHost");
var PropertyFieldFontPickerHost_1 = require("./PropertyFieldFontPickerHost");
var PropertyFieldFontSizePickerHost_1 = require("./PropertyFieldFontSizePickerHost");
var PropertyFieldIconPickerHost_1 = require("./PropertyFieldIconPickerHost");
var PropertyFieldColorPickerHost_1 = require("./PropertyFieldColorPickerHost");
var PropertyFieldColorPickerMiniHost_1 = require("./PropertyFieldColorPickerMiniHost");
var PropertyFieldPasswordHost_1 = require("./PropertyFieldPasswordHost");
var PropertyFieldPicturePickerHost_1 = require("./PropertyFieldPicturePickerHost");
var PropertyFieldDocumentPickerHost_1 = require("./PropertyFieldDocumentPickerHost");
var PropertyFieldSPListPickerHost_1 = require("./PropertyFieldSPListPickerHost");
var PropertyFieldSPFolderPickerHost_1 = require("./PropertyFieldSPFolderPickerHost");
var PropertyFieldPeoplePickerHost_1 = require("./PropertyFieldPeoplePickerHost");
var PropertyFieldStarRatingHost_1 = require("./PropertyFieldStarRatingHost");
var PropertyFieldGroupPickerHost_1 = require("./PropertyFieldGroupPickerHost");
var PropertyFieldGroupPicker_1 = require("./PropertyFieldGroupPicker");
var PropertyFieldOfficeVideoPickerHost_1 = require("./PropertyFieldOfficeVideoPickerHost");
var GuidHelper_1 = require("./GuidHelper");
var strings = require("sp-client-custom-fields/strings");
/**
 * @class
 * Renders the controls for PropertyFieldCustomList component
 */
var PropertyFieldCustomListHost = /** @class */ (function (_super) {
    __extends(PropertyFieldCustomListHost, _super);
    /**
     * @function
     * Contructor
     */
    function PropertyFieldCustomListHost(props) {
        var _this = _super.call(this, props) || this;
        //Bind the current object to the external called onSelectDate method
        _this.saveWebPart = _this.saveWebPart.bind(_this);
        _this.onOpenPanel = _this.onOpenPanel.bind(_this);
        _this.onClickAddItem = _this.onClickAddItem.bind(_this);
        _this.onClickCancel = _this.onClickCancel.bind(_this);
        _this.onClickAdd = _this.onClickAdd.bind(_this);
        _this.onClickDeleteItem = _this.onClickDeleteItem.bind(_this);
        _this.onDismissDelete = _this.onDismissDelete.bind(_this);
        _this.clickDelete = _this.clickDelete.bind(_this);
        _this.onClickEdit = _this.onClickEdit.bind(_this);
        _this.onClickUpdate = _this.onClickUpdate.bind(_this);
        _this.onPropertyChange = _this.onPropertyChange.bind(_this);
        _this.onPropertyChangeJson = _this.onPropertyChangeJson.bind(_this);
        _this.onCancel = _this.onCancel.bind(_this);
        _this.onClickMoveUp = _this.onClickMoveUp.bind(_this);
        _this.onClickMoveDown = _this.onClickMoveDown.bind(_this);
        _this.onActiveItemChanged = _this.onActiveItemChanged.bind(_this);
        _this._key = GuidHelper_1.default.getGuid();
        _this.state = {
            data: _this.props.value != null ? _this.props.value : [],
            openPanel: false,
            openListView: true,
            openListAdd: false,
            openListEdit: false,
            deleteOpen: false,
            editOpen: false,
            mandatoryOpen: false,
            missingField: '',
            items: [],
            columns: [],
            listKey: GuidHelper_1.default.getGuid(),
            selection: new DetailsList_1.Selection()
        };
        _this.initItems();
        _this.initColumns();
        return _this;
    }
    PropertyFieldCustomListHost.prototype.initItems = function () {
        var _this = this;
        var items = [];
        if (this.state.data != null) {
            this.state.data.map(function (value, index) {
                var item = {};
                _this.props.fields.map(function (field, indexI) {
                    if (value != null && field != null && (field.hidden == null || field.hidden === false)) {
                        item[field.title] = value[field.id];
                    }
                });
                items.push(item);
            });
        }
        this.state.items = items;
    };
    PropertyFieldCustomListHost.prototype.initColumns = function () {
        this.state.columns = DetailsList_1.buildColumns(this.state.items, true, null, '', false, '', true);
    };
    /**
     * @function
     * Function called when the ColorPicker Office UI Fabric component selected color changed
     */
    PropertyFieldCustomListHost.prototype.saveWebPart = function (value) {
        //Checks if there is a method to called
        if (this.props.onPropertyChange && value != null) {
            this.props.properties[this.props.targetProperty] = value;
            this.props.onPropertyChange(this.props.targetProperty, [], value);
            if (!this.props.disableReactivePropertyChanges && this.props.render != null)
                this.props.render();
        }
    };
    PropertyFieldCustomListHost.prototype.onOpenPanel = function (element) {
        this.state.openPanel = true;
        this.state.openListView = true;
        this.state.openListAdd = false;
        this.state.editOpen = false;
        this.state.mandatoryOpen = false;
        this.setState(this.state);
    };
    PropertyFieldCustomListHost.prototype.onCancel = function (element) {
        this.state.openPanel = false;
        this.state.openListView = false;
        this.state.openListAdd = false;
        this.state.editOpen = false;
        this.state.mandatoryOpen = false;
        this.setState(this.state);
    };
    PropertyFieldCustomListHost.prototype.onClickAddItem = function (element) {
        this.state.openListView = false;
        this.state.openListAdd = true;
        this.state.openListEdit = false;
        this.state.editOpen = false;
        this.state.mandatoryOpen = false;
        this.setState(this.state);
    };
    PropertyFieldCustomListHost.prototype.onClickDeleteItem = function (element) {
        this.state.deleteOpen = true;
        this.setState(this.state);
    };
    PropertyFieldCustomListHost.prototype.onClickCancel = function () {
        this.state.openListView = true;
        this.state.openListAdd = false;
        this.state.openListEdit = false;
        this.state.editOpen = false;
        this.state.mandatoryOpen = false;
        this.setState(this.state);
    };
    PropertyFieldCustomListHost.prototype.onClickAdd = function () {
        var result = new Object();
        for (var i = 0; i < this.props.fields.length; i++) {
            if (this.props.fields[i] == null)
                continue;
            var ctrl = document.getElementById('input-' + this.props.fields[i].id);
            if (ctrl == null)
                continue;
            var str = ctrl['value'];
            if (str.length > 0 && (str[0] == '[' || str[0] == '{'))
                str = JSON.parse(str);
            if (this.props.fields[i].required === true && (str == null || str == '')) {
                this.state.mandatoryOpen = true;
                this.state.missingField = this.props.fields[i].id;
                this.setState(this.state);
                document.getElementById('input-' + this.props.fields[i].id).focus();
                return;
            }
            result[this.props.fields[i].id] = str;
        }
        this.state.data.push(result);
        this.initItems();
        if (this.state.selectedIndex != null && this.state.selectedIndex > 0)
            this.state.selection.setIndexSelected(this.state.selectedIndex, false, false);
        this.state.selectedIndex = null;
        if (this.state.columns == null || this.state.columns.length === 0)
            this.initColumns();
        this.setState(this.state);
        this.saveWebPart(this.state.data);
        this.onClickCancel();
    };
    PropertyFieldCustomListHost.prototype.onDismissDelete = function (element) {
        this.state.deleteOpen = false;
        this.setState(this.state);
    };
    PropertyFieldCustomListHost.prototype.onClickMoveUp = function (element) {
        var indexToMove = Number(this.state.selectedIndex);
        if (indexToMove > 0) {
            var obj = this.state.data[indexToMove - 1];
            this.state.data[indexToMove - 1] = this.state.data[indexToMove];
            this.state.data[indexToMove] = obj;
            this.state.selection.setIndexSelected(this.state.selectedIndex, false, false);
            this.state.selectedIndex = indexToMove - 1;
            this.state.selection.setIndexSelected(this.state.selectedIndex, true, true);
            this.initItems();
            this.setState(this.state);
            this.saveWebPart(this.state.data);
        }
    };
    PropertyFieldCustomListHost.prototype.onClickMoveDown = function (element) {
        var indexToMove = Number(this.state.selectedIndex);
        if (indexToMove < this.state.data.length - 1) {
            var dataRestore = this.state.data[indexToMove + 1];
            this.state.data[indexToMove + 1] = this.state.data[indexToMove];
            this.state.data[indexToMove] = dataRestore;
            this.state.selection.setIndexSelected(this.state.selectedIndex, false, false);
            this.state.selectedIndex = indexToMove + 1;
            this.state.selection.setIndexSelected(this.state.selectedIndex, true, true);
            this.initItems();
            this.setState(this.state);
            this.saveWebPart(this.state.data);
        }
    };
    PropertyFieldCustomListHost.prototype.clickDelete = function (element) {
        var indexToDelete = this.state.selectedIndex;
        var newData = [];
        for (var i = 0; i < this.state.data.length; i++) {
            if (i != indexToDelete)
                newData.push(this.state.data[i]);
        }
        this.state.selection.setIndexSelected(this.state.selectedIndex, false, false);
        this.state.data = newData;
        this.state.selectedIndex = null;
        this.initItems();
        this.setState(this.state);
        this.onDismissDelete();
        this.saveWebPart(this.state.data);
    };
    PropertyFieldCustomListHost.prototype.onClickEdit = function (element) {
        this.state.editOpen = true;
        this.state.openListView = false;
        this.setState(this.state);
    };
    PropertyFieldCustomListHost.prototype.onClickUpdate = function (element) {
        var result = this.state.data[this.state.selectedIndex];
        for (var i = 0; i < this.props.fields.length; i++) {
            if (this.props.fields[i] == null)
                continue;
            var ctrl = document.getElementById('input-' + this.props.fields[i].id);
            if (ctrl == null)
                continue;
            var str = ctrl['value'];
            if (str.length > 0 && (str[0] == '[' || str[0] == '{'))
                str = JSON.parse(str);
            if (this.props.fields[i].required === true && (str == null || str == '')) {
                this.state.mandatoryOpen = true;
                this.state.missingField = this.props.fields[i].title;
                this.setState(this.state);
                document.getElementById('input-' + this.props.fields[i].id).focus();
                return;
            }
            result[this.props.fields[i].id] = str;
        }
        this.initItems();
        this.setState(this.state);
        this.saveWebPart(this.state.data);
        this.onClickCancel();
    };
    PropertyFieldCustomListHost.prototype.onPropertyChange = function (targetProperty, oldValue, newValue) {
        var input = document.getElementById(targetProperty);
        input['value'] = newValue;
    };
    PropertyFieldCustomListHost.prototype.onPropertyChangeJson = function (targetProperty, oldValue, newValue) {
        var input = document.getElementById(targetProperty);
        input['value'] = JSON.stringify(newValue);
    };
    PropertyFieldCustomListHost.prototype.onActiveItemChanged = function (item, index, ev) {
        if (index !== undefined && index >= 0) {
            this.state.selectedIndex = index;
            this.setState(this.state);
        }
        else {
            this.state.selectedIndex = null;
            this.setState(this.state);
        }
    };
    /**
     * @function
     * Renders the datepicker controls with Office UI  Fabric
     */
    PropertyFieldCustomListHost.prototype.render = function () {
        var _this = this;
        //Renders content
        return (React.createElement("div", { style: { marginBottom: '8px' } },
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement(Dialog_1.Dialog, { type: Dialog_1.DialogType.close, isOpen: this.state.openPanel, title: this.props.headerText, onDismiss: this.onCancel, containerClassName: PropertyFields_module_scss_1.default.msDialogMainCustom, isDarkOverlay: true, isBlocking: false },
                React.createElement("div", { style: { width: '630px', height: '500px', overflow: 'scroll' } },
                    this.state.openListAdd === true ?
                        React.createElement("div", null,
                            this.props.fields != null ?
                                React.createElement("div", null,
                                    React.createElement(CommandBar_1.CommandBar, { isSearchBoxVisible: false, items: [
                                            { key: 'Add', icon: 'Add', title: strings.CustomListAddItem, name: 'Add', disabled: true, onClick: this.onClickAdd },
                                            { key: 'Back', icon: 'Back', title: strings.CustomListBack, name: 'Back', onClick: this.onClickCancel }
                                        ] }),
                                    this.state.mandatoryOpen === true ?
                                        React.createElement(MessageBar_1.MessageBar, null, strings.CustomListFieldMissing.replace("{0}", this.state.missingField))
                                        : '',
                                    React.createElement("table", { className: "ms-Table", cellSpacing: "0", style: { marginTop: '30px', width: '100%', paddingRight: '10px' } },
                                        React.createElement("tbody", null, this.props.fields.map(function (value, indexF) {
                                            return (React.createElement("tr", { key: _this._key + '-customListTr1-' + indexF },
                                                React.createElement("td", null,
                                                    React.createElement(Label_1.Label, null,
                                                        value.title,
                                                        value.required === true ? ' (*)' : '')),
                                                React.createElement("td", null,
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.string ?
                                                        React.createElement("input", { id: 'input-' + value.id, className: PropertyFields_module_scss_1.default.customTextField, style: { marginBottom: '8px' } })
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.number ?
                                                        React.createElement("input", { type: "number", role: "spinbutton", id: 'input-' + value.id, "aria-valuemax": "99999", "aria-valuemin": "-999999", "aria-valuenow": "0", className: PropertyFields_module_scss_1.default.customTextField, style: { width: '100px', marginBottom: '8px' } })
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.boolean ?
                                                        React.createElement("div", { style: { marginBottom: '8px' } },
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement("input", { type: "radio", role: "radio", "aria-checked": "false", name: 'input-' + value.id, style: { width: '18px', height: '18px' }, value: 'input-' + value.id, onChange: function (elm) {
                                                                    if (elm.currentTarget.checked == true) {
                                                                        var name = elm.currentTarget.value;
                                                                        var input = document.getElementById(name);
                                                                        input['value'] = true;
                                                                    }
                                                                } }),
                                                            " ",
                                                            React.createElement("span", { style: { fontSize: '14px' } }, strings.CustomListTrue),
                                                            React.createElement("input", { type: "radio", role: "radio", "aria-checked": "false", name: 'input-' + value.id, style: { width: '18px', height: '18px' }, value: 'input-' + value.id, onChange: function (elm) {
                                                                    if (elm.currentTarget.checked == true) {
                                                                        var name = elm.currentTarget.value;
                                                                        var input = document.getElementById(name);
                                                                        input['value'] = false;
                                                                    }
                                                                } }),
                                                            " ",
                                                            React.createElement("span", { style: { fontSize: '14px' } }, strings.CustomListFalse))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.date ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldDatePickerHost_1.default, { render: null, key: 'input-' + value.id, label: "", properties: _this.props.properties, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.dateTime ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldDateTimePickerHost_1.default, { render: null, key: 'input-' + value.id, label: "", properties: _this.props.properties, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.font ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldFontPickerHost_1.default, { render: null, key: 'input-' + value.id, label: "", properties: _this.props.properties, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.fontSize ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldFontSizePickerHost_1.default, { render: null, key: 'input-' + value.id, label: "", properties: _this.props.properties, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.color ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldColorPickerHost_1.default, { render: null, key: 'input-' + value.id, label: "", properties: _this.props.properties, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.colorMini ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldColorPickerMiniHost_1.default, { render: null, key: 'input-' + value.id, label: "", properties: _this.props.properties, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.icon ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldIconPickerHost_1.default, { render: null, key: 'input-' + value.id, label: "", properties: _this.props.properties, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.password ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldPasswordHost_1.default, { render: null, key: 'input-' + value.id, label: "", properties: _this.props.properties, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.users ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldPeoplePickerHost_1.default, { render: null, key: 'input-' + value.id, label: "", properties: _this.props.properties, context: _this.props.context, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChangeJson, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.sharePointGroups ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldGroupPickerHost_1.default, { render: null, groupType: PropertyFieldGroupPicker_1.IGroupType.SharePoint, key: 'input-' + value.id, label: "", properties: _this.props.properties, context: _this.props.context, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChangeJson, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.securityGroups ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldGroupPickerHost_1.default, { render: null, groupType: PropertyFieldGroupPicker_1.IGroupType.Security, key: 'input-' + value.id, label: "", properties: _this.props.properties, context: _this.props.context, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChangeJson, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.list ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldSPListPickerHost_1.default, { render: null, key: 'input-' + value.id, label: "", properties: _this.props.properties, context: _this.props.context, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.folder ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldSPFolderPickerHost_1.default, { render: null, key: 'input-' + value.id, label: "", properties: _this.props.properties, context: _this.props.context, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.picture ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldPicturePickerHost_1.default, { render: null, key: 'input-' + value.id, label: "", properties: _this.props.properties, context: _this.props.context, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.document ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldDocumentPickerHost_1.default, { render: null, key: 'input-' + value.id, label: "", properties: _this.props.properties, context: _this.props.context, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.officeVideo ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldOfficeVideoPickerHost_1.default, { render: null, panelTitle: 'Select a video', key: 'input-' + value.id, label: "", properties: _this.props.properties, context: _this.props.context, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.stars ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldStarRatingHost_1.default, { render: null, key: 'input-' + value.id, label: "", properties: _this.props.properties, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '')));
                                        }))))
                                : '',
                            React.createElement("div", { style: { marginTop: '30px', marginBottom: '30px' } },
                                React.createElement(Button_1.PrimaryButton, { style: { marginRight: '10px' }, onClick: this.onClickAdd }, strings.CustomListOK),
                                React.createElement(Button_1.DefaultButton, { onClick: this.onClickCancel }, strings.CustomListCancel)))
                        : '',
                    this.state.editOpen === true ?
                        React.createElement("div", null,
                            this.props.fields != null ?
                                React.createElement("div", null,
                                    React.createElement(CommandBar_1.CommandBar, { isSearchBoxVisible: false, items: [
                                            { key: 'Edit', icon: 'Edit', title: strings.CustomListEdit, name: 'Edit', disabled: true, onClick: this.onClickEdit },
                                            { key: 'Back', icon: 'Back', title: strings.CustomListBack, name: 'Back', onClick: this.onClickCancel }
                                        ] }),
                                    this.state.mandatoryOpen === true ?
                                        React.createElement("div", { className: "ms-MessageBar" },
                                            React.createElement("a", { name: "anchorMessageBar" }),
                                            React.createElement("div", { className: "ms-MessageBar-content" },
                                                React.createElement("div", { className: "ms-MessageBar-icon" },
                                                    React.createElement("i", { className: "ms-Icon ms-Icon--Error" })),
                                                React.createElement("div", { className: "ms-MessageBar-text" }, strings.CustomListFieldMissing.replace("{0}", this.state.missingField))))
                                        : '',
                                    React.createElement("table", { className: "ms-Table", cellSpacing: "0", style: { marginTop: '30px', width: '100%', paddingRight: '10px' } },
                                        React.createElement("tbody", null, this.props.fields.map(function (value, indexM) {
                                            return (React.createElement("tr", { key: _this._key + '-customListTr2-' + indexM },
                                                React.createElement("td", null,
                                                    React.createElement(Label_1.Label, null,
                                                        value.title,
                                                        value.required === true ? ' (*)' : '')),
                                                React.createElement("td", null,
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.string ?
                                                        React.createElement("input", { id: 'input-' + value.id, className: PropertyFields_module_scss_1.default.customTextField, style: { marginBottom: '8px' }, defaultValue: _this.state.data[_this.state.selectedIndex][value.id] })
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.number ?
                                                        React.createElement("input", { type: "number", role: "spinbutton", id: 'input-' + value.id, className: PropertyFields_module_scss_1.default.customTextField, defaultValue: _this.state.data[_this.state.selectedIndex][value.id], "aria-valuemax": "99999", "aria-valuemin": "-999999", "aria-valuenow": _this.state.data[_this.state.selectedIndex][value.id], style: { width: '100px', marginBottom: '8px' } })
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.boolean ?
                                                        React.createElement("div", { style: { marginBottom: '8px' } },
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", defaultValue: _this.state.data[_this.state.selectedIndex][value.id], style: { visibility: 'hidden' } }),
                                                            React.createElement("input", { type: "radio", role: "radio", name: 'input-' + value.id, style: { width: '18px', height: '18px' }, value: 'input-' + value.id, onChange: function (elm) {
                                                                    if (elm.currentTarget.checked == true) {
                                                                        var name = elm.currentTarget.value;
                                                                        var input = document.getElementById(name);
                                                                        input['value'] = true;
                                                                    }
                                                                }, defaultChecked: _this.state.data[_this.state.selectedIndex][value.id] == "true", "aria-checked": _this.state.data[_this.state.selectedIndex][value.id] == "true" }),
                                                            React.createElement("span", { style: { fontSize: '14px' } }, strings.CustomListTrue),
                                                            React.createElement("input", { type: "radio", role: "radio", name: 'input-' + value.id, style: { width: '18px', height: '18px' }, value: 'input-' + value.id, onChange: function (elm) {
                                                                    if (elm.currentTarget.checked == true) {
                                                                        var name = elm.currentTarget.value;
                                                                        var input = document.getElementById(name);
                                                                        input['value'] = false;
                                                                    }
                                                                }, defaultChecked: _this.state.data[_this.state.selectedIndex][value.id] == "false", "aria-checked": _this.state.data[_this.state.selectedIndex][value.id] == "false" }),
                                                            " ",
                                                            React.createElement("span", { style: { fontSize: '14px' } }, strings.CustomListFalse))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.date ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", defaultValue: _this.state.data[_this.state.selectedIndex][value.id], style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldDatePickerHost_1.default, { render: null, key: 'input-' + value.id, properties: _this.props.properties, initialDate: _this.state.data[_this.state.selectedIndex][value.id], label: "", onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.dateTime ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", defaultValue: _this.state.data[_this.state.selectedIndex][value.id], style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldDateTimePickerHost_1.default, { render: null, key: 'input-' + value.id, properties: _this.props.properties, initialDate: _this.state.data[_this.state.selectedIndex][value.id], label: "", onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.font ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", defaultValue: _this.state.data[_this.state.selectedIndex][value.id], style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldFontPickerHost_1.default, { render: null, key: 'input-' + value.id, label: "", properties: _this.props.properties, initialValue: _this.state.data[_this.state.selectedIndex][value.id], onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.fontSize ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", defaultValue: _this.state.data[_this.state.selectedIndex][value.id], style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldFontSizePickerHost_1.default, { render: null, key: 'input-' + value.id, properties: _this.props.properties, label: "", initialValue: _this.state.data[_this.state.selectedIndex][value.id], onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.color ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldColorPickerHost_1.default, { render: null, key: 'input-' + value.id, properties: _this.props.properties, label: "", initialColor: _this.state.data[_this.state.selectedIndex][value.id], onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.colorMini ?
                                                        React.createElement("div", { style: { marginBottom: '5px' } },
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldColorPickerMiniHost_1.default, { render: null, key: 'input-' + value.id, properties: _this.props.properties, label: "", initialColor: _this.state.data[_this.state.selectedIndex][value.id], onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.icon ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", defaultValue: _this.state.data[_this.state.selectedIndex][value.id], style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldIconPickerHost_1.default, { render: null, key: 'input-' + value.id, properties: _this.props.properties, label: "", initialValue: _this.state.data[_this.state.selectedIndex][value.id], onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.password ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", defaultValue: _this.state.data[_this.state.selectedIndex][value.id], style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldPasswordHost_1.default, { render: null, key: 'input-' + value.id, properties: _this.props.properties, label: "", initialValue: _this.state.data[_this.state.selectedIndex][value.id], onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.users ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", defaultValue: JSON.stringify(_this.state.data[_this.state.selectedIndex][value.id]), style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldPeoplePickerHost_1.default, { render: null, key: 'input-' + value.id, properties: _this.props.properties, label: "", initialData: _this.state.data[_this.state.selectedIndex][value.id], context: _this.props.context, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChangeJson, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.securityGroups ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", defaultValue: JSON.stringify(_this.state.data[_this.state.selectedIndex][value.id]), style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldGroupPickerHost_1.default, { render: null, groupType: PropertyFieldGroupPicker_1.IGroupType.Security, key: 'input-' + value.id, properties: _this.props.properties, label: "", initialData: _this.state.data[_this.state.selectedIndex][value.id], context: _this.props.context, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChangeJson, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.sharePointGroups ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", defaultValue: JSON.stringify(_this.state.data[_this.state.selectedIndex][value.id]), style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldGroupPickerHost_1.default, { render: null, groupType: PropertyFieldGroupPicker_1.IGroupType.SharePoint, key: 'input-' + value.id, properties: _this.props.properties, label: "", initialData: _this.state.data[_this.state.selectedIndex][value.id], context: _this.props.context, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChangeJson, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.list ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", defaultValue: _this.state.data[_this.state.selectedIndex][value.id], style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldSPListPickerHost_1.default, { render: null, properties: _this.props.properties, label: "", selectedList: _this.state.data[_this.state.selectedIndex][value.id], context: _this.props.context, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id, key: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.folder ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", defaultValue: _this.state.data[_this.state.selectedIndex][value.id], style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldSPFolderPickerHost_1.default, { render: null, key: 'input-' + value.id, properties: _this.props.properties, label: "", initialFolder: _this.state.data[_this.state.selectedIndex][value.id], context: _this.props.context, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.picture ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", defaultValue: _this.state.data[_this.state.selectedIndex][value.id], style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldPicturePickerHost_1.default, { render: null, initialValue: _this.state.data[_this.state.selectedIndex][value.id], key: 'input-' + value.id, properties: _this.props.properties, label: "", context: _this.props.context, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.document ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", defaultValue: _this.state.data[_this.state.selectedIndex][value.id], style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldDocumentPickerHost_1.default, { render: null, initialValue: _this.state.data[_this.state.selectedIndex][value.id], key: 'input-' + value.id, properties: _this.props.properties, label: "", context: _this.props.context, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.stars ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", defaultValue: _this.state.data[_this.state.selectedIndex][value.id], style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldStarRatingHost_1.default, { render: null, initialValue: Number(_this.state.data[_this.state.selectedIndex][value.id]), key: 'input-' + value.id, properties: _this.props.properties, label: "", context: _this.props.context, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '',
                                                    value.type == PropertyFieldCustomList_1.CustomListFieldType.officeVideo ?
                                                        React.createElement("div", null,
                                                            React.createElement("input", { id: 'input-' + value.id, type: "hidden", defaultValue: _this.state.data[_this.state.selectedIndex][value.id], style: { visibility: 'hidden' } }),
                                                            React.createElement(PropertyFieldOfficeVideoPickerHost_1.default, { render: null, initialValue: _this.state.data[_this.state.selectedIndex][value.id], panelTitle: 'Select a video', key: 'input-' + value.id, properties: _this.props.properties, label: "", context: _this.props.context, onDispose: null, onRender: null, onPropertyChange: _this.onPropertyChange, targetProperty: 'input-' + value.id }))
                                                        : '')));
                                        }))))
                                : '',
                            React.createElement("div", { style: { marginTop: '30px', marginBottom: '30px' } },
                                React.createElement(Button_1.PrimaryButton, { style: { marginRight: '10px' }, onClick: this.onClickUpdate }, strings.CustomListOK),
                                React.createElement(Button_1.DefaultButton, { onClick: this.onClickCancel }, strings.CustomListCancel)))
                        : '',
                    this.state.openListView === true ?
                        React.createElement("div", null,
                            React.createElement(CommandBar_1.CommandBar, { isSearchBoxVisible: false, items: [
                                    { key: 'Add', icon: 'Add', title: strings.CustomListAddItem, name: 'Add', onClick: this.onClickAddItem },
                                    { key: 'Edit', icon: 'Edit', title: strings.CustomListEdit, name: 'Edit', onClick: this.onClickEdit, disabled: this.state.selectedIndex == null || this.state.selectedIndex < 0 ? true : false },
                                    { key: 'Delete', icon: 'Delete', title: strings.CustomListDel, name: 'Delete', onClick: this.onClickDeleteItem, disabled: this.state.selectedIndex == null || this.state.selectedIndex < 0 ? true : false },
                                    { key: 'Up', icon: 'ChevronUp', title: '', name: '', onClick: this.onClickMoveUp, disabled: this.state.selectedIndex == null || this.state.selectedIndex <= 0 ? true : false },
                                    { key: 'Down', icon: 'ChevronDown', title: '', name: '', onClick: this.onClickMoveDown, disabled: this.state.selectedIndex == null || this.state.selectedIndex < 0 || this.state.selectedIndex >= (this.state.data.length - 1) ? true : false }
                                ] }),
                            React.createElement(Dialog_1.Dialog, { type: Dialog_1.DialogType.close, isOpen: this.state.deleteOpen, title: strings.CustomListConfirmDel, onDismiss: this.onDismissDelete, isDarkOverlay: false, isBlocking: true },
                                React.createElement("div", null,
                                    React.createElement("div", null,
                                        React.createElement(Label_1.Label, null, strings.CustomListConfirmDelMssg)),
                                    React.createElement("div", { style: { paddingTop: '20px' } },
                                        React.createElement(Button_1.PrimaryButton, { onClick: this.clickDelete }, strings.CustomListYes),
                                        React.createElement(Button_1.DefaultButton, { onClick: this.onDismissDelete }, strings.CustomListNo)))),
                            this.props.fields != null ?
                                React.createElement("div", { style: { marginTop: '20px' } },
                                    React.createElement(DetailsList_1.DetailsList, { setKey: this.state.listKey, items: this.state.items, columns: this.state.columns, selectionPreservedOnEmptyClick: true, checkboxVisibility: DetailsList_1.CheckboxVisibility.onHover, layoutMode: DetailsList_1.DetailsListLayoutMode.justified, isHeaderVisible: true, selection: this.state.selection, selectionMode: DetailsList_1.SelectionMode.single, constrainMode: DetailsList_1.ConstrainMode.unconstrained, onActiveItemChanged: this.onActiveItemChanged, initialFocusedIndex: this.state.selectedIndex }))
                                : '')
                        : '')),
            React.createElement(Button_1.DefaultButton, { disabled: this.props.disabled, onClick: this.onOpenPanel }, this.props.headerText)));
    };
    return PropertyFieldCustomListHost;
}(React.Component));
exports.default = PropertyFieldCustomListHost;
//# sourceMappingURL=PropertyFieldCustomListHost.js.map