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
 * @file TestWebPart.ts
 * Custom field implementation sample for the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var strings = require("testStrings");
var Test_1 = require("./components/Test");
//Include the PropertyFieldDatePicker component
var PropertyFieldDatePicker_1 = require("../../PropertyFieldDatePicker");
//Include the PropertyFieldDateTimePicker component
var PropertyFieldDateTimePicker_1 = require("../../PropertyFieldDateTimePicker");
//Include the PropertyFieldColorPicker component
var PropertyFieldColorPicker_1 = require("../../PropertyFieldColorPicker");
//Include the PropertyFieldColorPickerMini component
var PropertyFieldColorPickerMini_1 = require("../../PropertyFieldColorPickerMini");
//Include the PropertyFieldPeoplePicker component
var PropertyFieldPeoplePicker_1 = require("../../PropertyFieldPeoplePicker");
//Include the PropertyFieldSPListPicker component
var PropertyFieldSPListPicker_1 = require("../../PropertyFieldSPListPicker");
//Include the PropertyFieldSPListMultiplePicker component
var PropertyFieldSPListMultiplePicker_1 = require("../../PropertyFieldSPListMultiplePicker");
//Include the PropertyFieldSPFolderPicker component
var PropertyFieldSPFolderPicker_1 = require("../../PropertyFieldSPFolderPicker");
//Include the PropertyFieldPassword component
var PropertyFieldPassword_1 = require("../../PropertyFieldPassword");
//Include the PropertyFieldFontPicker component
var PropertyFieldFontPicker_1 = require("../../PropertyFieldFontPicker");
//Include the PropertyFieldFontSizePicker component
var PropertyFieldFontSizePicker_1 = require("../../PropertyFieldFontSizePicker");
//Include the PropertyFieldPhoneNumber component
var PropertyFieldPhoneNumber_1 = require("../../PropertyFieldPhoneNumber");
//Include the PropertyFieldMaskedInput component
var PropertyFieldMaskedInput_1 = require("../../PropertyFieldMaskedInput");
//Include the PropertyFieldMaskedInput component
var PropertyFieldMapPicker_1 = require("../../PropertyFieldMapPicker");
//Include the PropertyFieldPicturePicker component
var PropertyFieldPicturePicker_1 = require("../../PropertyFieldPicturePicker");
//Include the PropertyFieldIconPicker component
var PropertyFieldIconPicker_1 = require("../../PropertyFieldIconPicker");
//Include the PropertyFieldDocumentPicker component
var PropertyFieldDocumentPicker_1 = require("../../PropertyFieldDocumentPicker");
//Include the PropertyFieldDisplayMode component
var PropertyFieldDisplayMode_1 = require("../../PropertyFieldDisplayMode");
//Include the PropertyFieldCustomList component
var PropertyFieldCustomList_1 = require("../../PropertyFieldCustomList");
//Include the PropertyFieldSPListQuery component
var PropertyFieldSPListQuery_1 = require("../../PropertyFieldSPListQuery");
//Include the PropertyFieldAlignPicker component
var PropertyFieldAlignPicker_1 = require("../../PropertyFieldAlignPicker");
//Include the PropertyFieldDropDownSelect component
var PropertyFieldDropDownSelect_1 = require("../../PropertyFieldDropDownSelect");
//Include the PropertyFieldRichTextBox component
var PropertyFieldRichTextBox_1 = require("../../PropertyFieldRichTextBox");
//Include the PropertyFieldSliderRange component
var PropertyFieldSliderRange_1 = require("../../PropertyFieldSliderRange");
//Include the PropertyFieldDimensionPicker component
var PropertyFieldDimensionPicker_1 = require("../../PropertyFieldDimensionPicker");
//Include the PropertyFieldSortableList component
var PropertyFieldSortableList_1 = require("../../PropertyFieldSortableList");
//Include the PropertyFieldTreeView component
var PropertyFieldTreeView_1 = require("../../PropertyFieldTreeView");
//Include the PropertyFieldDropDownTreeView component
var PropertyFieldDropDownTreeView_1 = require("../../PropertyFieldDropDownTreeView");
//Include the PropertyFieldTagPicker component
var PropertyFieldTagPicker_1 = require("../../PropertyFieldTagPicker");
//Include the PropertyFieldStarRating component
var PropertyFieldStarRating_1 = require("../../PropertyFieldStarRating");
//Include the PropertyFieldGroupPicker component
var PropertyFieldGroupPicker_1 = require("../../PropertyFieldGroupPicker");
//Include the PropertyFieldNumericInput component
var PropertyFieldNumericInput_1 = require("../../PropertyFieldNumericInput");
//Include the PropertyFieldAutoComplete component
var PropertyFieldAutoComplete_1 = require("../../PropertyFieldAutoComplete");
//Include the PropertyFieldSearchPropertiesPicker component
var PropertyFieldSearchPropertiesPicker_1 = require("../../PropertyFieldSearchPropertiesPicker");
//Include the PropertyFieldSearchPropertiesPicker component
var PropertyFieldOfficeVideoPicker_1 = require("../../PropertyFieldOfficeVideoPicker");
//Include the PropertyFieldTermSetPicker component
var PropertyFieldTermSetPicker_1 = require("../../PropertyFieldTermSetPicker");
var TestWebPart = /** @class */ (function (_super) {
    __extends(TestWebPart, _super);
    function TestWebPart(context) {
        var _this = _super.call(this) || this;
        //Hack: to invoke correctly the onPropertyChange function outside this class
        //we need to bind this object on it first
        _this.onPropertyPaneFieldChanged = _this.onPropertyPaneFieldChanged.bind(_this);
        _this.testPropertyChanged = _this.testPropertyChanged.bind(_this);
        return _this;
    }
    TestWebPart.prototype.render = function () {
        var element = React.createElement(Test_1.default, {
            description: this.properties.description,
            color: this.properties.color,
            miniColor: this.properties.miniColor,
            date: this.properties.date,
            date2: this.properties.date2,
            datetime: this.properties.datetime,
            folder: this.properties.folder,
            people: this.properties.people,
            groups: this.properties.groups,
            list: this.properties.list,
            listsCollection: this.properties.listsCollection,
            password: this.properties.password,
            numeric: this.properties.numeric,
            font: this.properties.font,
            fontSize: this.properties.fontSize,
            phone: this.properties.phone,
            maskedInput: this.properties.maskedInput,
            geolocation: this.properties.geolocation,
            picture: this.properties.picture,
            icon: this.properties.icon,
            document: this.properties.document,
            displayMode: this.properties.displayMode,
            customList: this.properties.customList,
            query: this.properties.query,
            align: this.properties.align,
            richTextBox: this.properties.richTextBox,
            dropDownSelect: this.properties.dropDownSelect,
            sliderRange: this.properties.sliderRange,
            dimension: this.properties.dimension,
            sortableList: this.properties.sortableList,
            treeView: this.properties.treeView,
            dropDownTreeView: this.properties.dropDownTreeView,
            tags: this.properties.tags,
            starRating: this.properties.starRating,
            autoSuggest: this.properties.autoSuggest,
            searchProperties: this.properties.searchProperties,
            officeVideo: this.properties.officeVideo,
            termSets: this.properties.termSets
        });
        ReactDom.render(element, this.domElement);
    };
    Object.defineProperty(TestWebPart.prototype, "disableReactivePropertyChanges", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    TestWebPart.prototype.formatDateIso = function (date) {
        //example for ISO date formatting
        return date.toISOString();
    };
    TestWebPart.prototype.testPropertyChanged = function (propertyPath, oldValue, newValue) {
        this.properties.font = newValue;
        this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
        if (!this.disableReactivePropertyChanges)
            this.render();
    };
    Object.defineProperty(TestWebPart.prototype, "dataVersion", {
        /*
          //Samples of validation method, to use
          //with the onGetErrorMessage function of Propery Fields.
          //See https://dev.office.com/sharepoint/docs/spfx/web-parts/guidance/validate-web-part-property-values
        
          private canNotBeEmpty(value: string): string {
            if (value === null || value.trim().length === 0) {
              return 'Provide a value';
            }
            return '';
          }
        
          private canNotBeEmptyPromise(value: string): Promise<string> {
            return new Promise<string>((resolve: (validationErrorMessage: string) => void, reject: (error: any) => void): void => {
              if (value === null || value.length === 0) {
                resolve('Provide a value');
                return;
              }
              resolve('');
            });
          }
        
          private canNotBeArial(value: string): string {
            if (value === null || value.trim().length === 0) {
              return '';
            }
            if (value.indexOf("Arial") !== -1)
              return 'Font can not be Arial';
            return '';
          }
        
          private canNotBeXSmall(value: string): string {
            if (value === null || value.trim().length === 0) {
              return '';
            }
            if (value.indexOf("x-small") !== -1)
              return 'Font size can not be x-small';
            return '';
          }
        
          private canNotBeAADLogo(value: string): string {
            if (value === null || value.trim().length === 0) {
              return '';
            }
            if (value.indexOf("AADLogo") !== -1)
              return 'Icon can not be AADLogo';
            return '';
          }
        
          private canNotBeBlack(value: string): string {
            if (value === null || value.trim().length === 0) {
              return '';
            }
            if (value.indexOf("#000000") !== -1)
              return 'Color can not be black';
            return '';
          }
        
          private canNotBeAlignLeft(value: string): string {
            if (value === null || value.trim().length === 0) {
              return '';
            }
            if (value.indexOf("left") !== -1)
              return 'Align can not be left';
            return '';
          }
        
          private arrayCanNotBeEmpty(value: string[]): string {
            if (value === null || value.length === 0) {
              return 'Array can not be empty';
            }
            return '';
          }
        
          private canNotBeIn2016(value: string): string {
            if (value === null || value.trim().length === 0) {
              return '';
            }
            if (value.indexOf("2016") !== -1)
              return 'Date can not be during 2016.';
            return '';
          }
        
          private canNotBe0Location(value: string): string {
            if (value === null || value.trim().length === 0) {
              return '';
            }
            if (value == '0,0')
              return 'Bad geoLocation.';
            return '';
          }
        
          private badPhoneNumber(value: string): string {
            if (value === null || value.trim().length === 0 || value == '(') {
              return 'Provide a valid phone number.';
            }
            if (value.indexOf("(00") != 0) {
              return 'Phone number must be begin with (00.';
            }
            return '';
          }
        
          private canNotSelectThisList(value: string): string {
            if (value === null || value.trim().length === 0) {
              return '';
            }
            if (value.indexOf("6770c83b") !== -1) {
              return 'You can not select this list.';
            }
            return '';
          }
        
          private canNotBeMock(value: string): string {
            if (value === null || value.trim().length === 0) {
              return '';
            }
            if (value.indexOf('mock'))
              return 'The mock is not allowed';
            return '';
          }
        
          private canNotBeList(value: string): string {
            if (value === null || value.trim().length === 0) {
              return '';
            }
            if (value.indexOf("list") !== -1) {
              return 'You can not select the list mode.';
            }
            return '';
          }
        
          private canNotBeOrderById(value: string): string {
            if (value === null || value.trim().length === 0) {
              return '';
            }
            if (value.indexOf("orderBy=ID") !== -1) {
              return 'You can not order by ID.';
            }
            return '';
          }
        
          private canNotChooseMoreThan2People(value: any[]): string {
            if (value.length > 2) {
              return 'You can not choose more than 2 people.';
            }
            return '';
          }
        
          private canNotBeDoc(value: string): string {
            if (value === null || value.trim().length === 0) {
              return '';
            }
            if (value.indexOf(".doc") !== -1) {
              return 'You can not choose a *.doc file.';
            }
            return '';
          }
        
          private invalidRange(value: string): string {
            if (value === null || value.trim().length === 0) {
              return '';
            }
            if (value === '0,500') {
              return 'Invalid range.';
            }
            return '';
          }
        */
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    TestWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    //Display the web part properties as accordion
                    displayGroupsAsAccordion: true,
                    groups: [
                        {
                            groupName: 'Layout Fields',
                            groupFields: [
                                PropertyFieldFontPicker_1.PropertyFieldFontPicker('font', {
                                    label: strings.FontFieldLabel,
                                    useSafeFont: true,
                                    previewFonts: true,
                                    initialValue: this.properties.font,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'fontFieldId'
                                }),
                                PropertyFieldFontSizePicker_1.PropertyFieldFontSizePicker('fontSize', {
                                    label: strings.FontSizeFieldLabel,
                                    usePixels: false,
                                    preview: true,
                                    initialValue: this.properties.fontSize,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'fontSizeFieldId'
                                }),
                                PropertyFieldFontSizePicker_1.PropertyFieldFontSizePicker('fontSize', {
                                    label: strings.FontSizeFieldLabel,
                                    usePixels: true,
                                    preview: true,
                                    initialValue: this.properties.fontSize,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'fontSizeField2Id'
                                }),
                                PropertyFieldIconPicker_1.PropertyFieldIconPicker('icon', {
                                    label: strings.IconFieldLabel,
                                    initialValue: this.properties.icon,
                                    orderAlphabetical: true,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'iconFieldId'
                                }),
                                PropertyFieldColorPickerMini_1.PropertyFieldColorPickerMini('miniColor', {
                                    label: strings.ColorMiniFieldLabel,
                                    initialColor: this.properties.miniColor,
                                    disabled: false,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'colorMiniFieldId'
                                }),
                                PropertyFieldColorPicker_1.PropertyFieldColorPicker('color', {
                                    label: strings.ColorFieldLabel,
                                    initialColor: this.properties.color,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'colorFieldId'
                                }),
                                PropertyFieldAlignPicker_1.PropertyFieldAlignPicker('align', {
                                    label: strings.AlignFieldLabel,
                                    initialValue: this.properties.align,
                                    onPropertyChanged: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'alignFieldId'
                                }),
                                PropertyFieldDimensionPicker_1.PropertyFieldDimensionPicker('dimension', {
                                    label: strings.DimensionFieldLabel,
                                    initialValue: this.properties.dimension,
                                    preserveRatio: true,
                                    preserveRatioEnabled: true,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'dimensionFieldId'
                                })
                            ],
                        },
                        {
                            groupName: 'Text Input Fields',
                            groupFields: [
                                PropertyFieldCustomList_1.PropertyFieldCustomList('customList', {
                                    label: strings.CustomListFieldLabel,
                                    value: this.properties.customList,
                                    headerText: "Manage News",
                                    fields: [
                                        { id: 'NewsTitle', title: 'News Title', required: true, type: PropertyFieldCustomList_1.CustomListFieldType.string },
                                        { id: 'SubTitle', title: 'Sub title', required: true, type: PropertyFieldCustomList_1.CustomListFieldType.string },
                                        { id: 'Link', title: 'Link', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.string, hidden: true },
                                        { id: 'Order', title: 'Order', required: true, type: PropertyFieldCustomList_1.CustomListFieldType.number },
                                        { id: 'Active', title: 'Active', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.boolean },
                                        { id: 'StartDate', title: 'Start Date', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.date, hidden: true },
                                        { id: 'EndDate', title: 'End Date', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.date, hidden: true },
                                        { id: 'Picture', title: 'Picture', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.picture, hidden: true },
                                        { id: 'Users', title: 'Users', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.users, hidden: true },
                                        { id: 'Font', title: 'Font', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.font, hidden: true },
                                        { id: 'FontSize', title: 'Font size', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.fontSize, hidden: true },
                                        { id: 'Icon', title: 'Icon', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.icon, hidden: true },
                                        { id: 'Password', title: 'Password', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.password, hidden: true },
                                        { id: 'Color', title: 'Color', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.color, hidden: true },
                                        { id: 'ColorMini', title: 'Color 2', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.colorMini, hidden: true },
                                        { id: 'List', title: 'List', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.list, hidden: true },
                                        { id: 'Document', title: 'Document', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.document, hidden: true },
                                        { id: 'Folder', title: 'Folder', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.folder, hidden: true },
                                        { id: 'Stars', title: 'Stars', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.stars, hidden: true },
                                        { id: 'Groups', title: 'Groups', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.sharePointGroups, hidden: true },
                                        { id: 'Video', title: 'Video', required: false, type: PropertyFieldCustomList_1.CustomListFieldType.officeVideo, hidden: true }
                                    ],
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    context: this.context,
                                    properties: this.properties,
                                    disabled: false,
                                    key: 'customListFieldId'
                                }),
                                PropertyFieldDropDownSelect_1.PropertyFieldDropDownSelect('dropDownSelect', {
                                    label: strings.DropDownSelectFieldLabel,
                                    options: [
                                        { 'key': 'Option1', 'text': 'Option 1' },
                                        { 'key': 'Option2', 'text': 'Option 2' },
                                        { 'key': 'Option3', 'text': 'Option 3' },
                                        { 'key': 'Option4', 'text': 'Option 4' },
                                        { 'key': 'Option5', 'text': 'Option 5' },
                                        { 'key': 'Option6', 'text': 'Option 6' },
                                        { 'key': 'Option7', 'text': 'Option 7' }
                                    ],
                                    initialValue: this.properties.dropDownSelect,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'dropDownSelectFieldId'
                                }),
                                PropertyFieldSortableList_1.PropertyFieldSortableList('sortableList', {
                                    label: strings.SortableListFieldLabel,
                                    items: [
                                        { 'key': 'Option1', 'text': 'Option 1' },
                                        { 'key': 'Option2', 'text': 'Option 2' },
                                        { 'key': 'Option3', 'text': 'Option 3' },
                                        { 'key': 'Option4', 'text': 'Option 4' },
                                        { 'key': 'Option5', 'text': 'Option 5' }
                                    ],
                                    selectedItems: this.properties.sortableList,
                                    sortBy: PropertyFieldSortableList_1.ISortableListOrder.Text,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'sortableListFieldId'
                                }),
                                PropertyFieldDropDownTreeView_1.PropertyFieldDropDownTreeView('dropDownTreeView', {
                                    label: strings.DropDownTreeViewFieldLabel,
                                    tree: [
                                        {
                                            id: 'Analytics', label: 'Analytics',
                                            children: [
                                                {
                                                    id: 'Market analyses', label: 'Market analyses',
                                                    collapsed: true,
                                                    children: [{
                                                            id: 'Key-on-screen.jpg', label: 'Key-on-screen.jpg',
                                                            leaf: true
                                                        }]
                                                },
                                                {
                                                    id: 'Northwind marketing', label: 'Northwind marketing',
                                                    children: [{
                                                            id: 'New Product Overview.pptx',
                                                            label: 'New Product Overview.pptx',
                                                            leaf: true
                                                        }, {
                                                            id: 'RD Expenses Q1 to Q3.xlsx', label: 'RD Expenses Q1 to Q3.xlsx',
                                                            leaf: true
                                                        }, {
                                                            id: 'Sat Survey.xlsx', label: 'Sat Survey.xlsx',
                                                            leaf: true
                                                        }]
                                                },
                                                {
                                                    id: 'Project Budget Audit.docx', label: 'Project Budget Audit.docx',
                                                    leaf: true
                                                }, {
                                                    id: 'Engineering Costs Q1.pptx', label: 'Engineering Costs Q1.pptx',
                                                    leaf: true
                                                }
                                            ]
                                        },
                                        {
                                            id: 'Notebooks', label: 'Notebooks',
                                            children: [{
                                                    id: 'New Project Timeline.docx', label: 'New Project Timeline.docx',
                                                    leaf: true
                                                }, {
                                                    id: 'Marketing Video.mp4', label: 'Marketing Video.mp4',
                                                    leaf: true
                                                }, {
                                                    id: 'Meeting Audio Record.mp3', label: 'Meeting Audio Record.mp3',
                                                    leaf: true
                                                }]
                                        }
                                    ],
                                    selectedNodesIDs: this.properties.dropDownTreeView,
                                    allowMultipleSelections: true,
                                    allowFoldersSelections: false,
                                    nodesPaddingLeft: 15,
                                    checkboxEnabled: true,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'dropDownTreeViewFieldId'
                                }),
                                PropertyFieldTreeView_1.PropertyFieldTreeView('treeView', {
                                    label: strings.TreeViewFieldLabel,
                                    tree: [
                                        {
                                            id: 'Analytics', label: 'Analytics',
                                            pictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2012/96/iconmonstr-folder-1.png',
                                            expandedPictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2012/96/iconmonstr-folder-20.png',
                                            children: [
                                                {
                                                    id: 'Market analyses', label: 'Market analyses',
                                                    collapsed: true,
                                                    pictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2012/96/iconmonstr-folder-1.png',
                                                    expandedPictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2012/96/iconmonstr-folder-20.png',
                                                    children: [{
                                                            id: 'Key-on-screen.jpg', label: 'Key-on-screen.jpg',
                                                            pictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2012/96/iconmonstr-picture-1.png',
                                                            leaf: true
                                                        }]
                                                },
                                                {
                                                    id: 'Northwind marketing', label: 'Northwind marketing',
                                                    pictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2012/96/iconmonstr-folder-1.png',
                                                    expandedPictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2012/96/iconmonstr-folder-20.png',
                                                    children: [{
                                                            id: 'New Product Overview.pptx',
                                                            label: 'New Product Overview.pptx',
                                                            pictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2014/96/iconmonstr-flip-chart-2.png',
                                                            leaf: true
                                                        }, {
                                                            id: 'RD Expenses Q1 to Q3.xlsx', label: 'RD Expenses Q1 to Q3.xlsx',
                                                            pictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2017/96/iconmonstr-flip-chart-9.png',
                                                            leaf: true
                                                        }, {
                                                            id: 'Sat Survey.xlsx', label: 'Sat Survey.xlsx',
                                                            pictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2017/96/iconmonstr-flip-chart-9.png',
                                                            leaf: true
                                                        }]
                                                },
                                                {
                                                    id: 'Project Budget Audit.docx', label: 'Project Budget Audit.docx',
                                                    pictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2013/96/iconmonstr-note-14.png',
                                                    selectedPictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2013/96/iconmonstr-note-13.png',
                                                    leaf: true
                                                }, {
                                                    id: 'Engineering Costs Q1.pptx', label: 'Engineering Costs Q1.pptx',
                                                    pictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2014/96/iconmonstr-flip-chart-2.png',
                                                    leaf: true
                                                }
                                            ]
                                        },
                                        {
                                            id: 'Notebooks', label: 'Notebooks',
                                            pictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2012/96/iconmonstr-folder-1.png',
                                            expandedPictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2012/96/iconmonstr-folder-20.png',
                                            children: [{
                                                    id: 'New Project Timeline.docx', label: 'New Project Timeline.docx',
                                                    pictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2013/96/iconmonstr-note-14.png',
                                                    selectedPictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2013/96/iconmonstr-note-13.png',
                                                    leaf: true
                                                }, {
                                                    id: 'Marketing Video.mp4', label: 'Marketing Video.mp4',
                                                    pictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2012/96/iconmonstr-video-8.png',
                                                    leaf: true
                                                }, {
                                                    id: 'Meeting Audio Record.mp3', label: 'Meeting Audio Record.mp3',
                                                    pictureUrl: 'http://iconmonstr.com/wp-content/assets/preview/2012/96/iconmonstr-equalizer-1.png',
                                                    leaf: true
                                                }]
                                        }
                                    ],
                                    selectedNodesIDs: this.properties.treeView,
                                    allowMultipleSelections: true,
                                    allowFoldersSelections: false,
                                    nodesPaddingLeft: 15,
                                    checkboxEnabled: true,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'treeViewFieldId'
                                }),
                                PropertyFieldTagPicker_1.PropertyFieldTagPicker('tags', {
                                    label: strings.TagPickerFieldLabel,
                                    selectedTags: this.properties.tags,
                                    tags: [
                                        { key: 'black', name: 'black' },
                                        { key: 'blue', name: 'blue' },
                                        { key: 'brown', name: 'brown' },
                                        { key: 'cyan', name: 'cyan' },
                                        { key: 'green', name: 'green' },
                                        { key: 'magenta', name: 'magenta' },
                                        { key: 'mauve', name: 'mauve' },
                                        { key: 'orange', name: 'orange' },
                                        { key: 'pink', name: 'pink' },
                                        { key: 'purple', name: 'purple' },
                                        { key: 'red', name: 'red' },
                                        { key: 'rose', name: 'rose' },
                                        { key: 'violet', name: 'violet' },
                                        { key: 'white', name: 'white' },
                                        { key: 'yellow', name: 'yellow' }
                                    ],
                                    loadingText: 'Loading...',
                                    noResultsFoundText: 'No tags found',
                                    suggestionsHeaderText: 'Suggested Tags',
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'tagsPickerFieldId'
                                }),
                                PropertyFieldStarRating_1.PropertyFieldStarRating('starRating', {
                                    label: strings.StarRatingFieldLabel,
                                    initialValue: this.properties.starRating,
                                    starCount: 5,
                                    starSize: 24,
                                    starColor: '#ffb400',
                                    emptyStarColor: '#333',
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'starRatingFieldId'
                                }),
                                PropertyFieldPassword_1.PropertyFieldPassword('password', {
                                    label: strings.PasswordFieldLabel,
                                    initialValue: this.properties.password,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'passwordFieldId'
                                }),
                                PropertyFieldAutoComplete_1.PropertyFieldAutoComplete('autoSuggest', {
                                    label: strings.AutoSuggestFieldLabel,
                                    placeHolder: 'Select a state',
                                    initialValue: this.properties.autoSuggest,
                                    suggestions: [
                                        "Alabama",
                                        "Alaska",
                                        "Arizona",
                                        "Arkansas",
                                        "California",
                                        "Colorado",
                                        "Connecticut",
                                        "Delaware",
                                        "Florida",
                                        "Georgia",
                                        "Hawaii",
                                        "Idaho",
                                        "Illinois",
                                        "Indiana",
                                        "Iowa",
                                        "Kansas",
                                        "Kentucky",
                                        "Louisiana",
                                        "Maine",
                                        "Maryland",
                                        "Massachusetts",
                                        "Michigan",
                                        "Minnesota",
                                        "Mississippi",
                                        "Missouri",
                                        "Montana",
                                        "Nebraska",
                                        "Nevada",
                                        "New Hampshire",
                                        "New Jersey",
                                        "New Mexico",
                                        "New York",
                                        "North Carolina",
                                        "North Dakota",
                                        "Ohio",
                                        "Oklahoma",
                                        "Oregon",
                                        "Pennsylvania",
                                        "Rhode Island",
                                        "South Carolina",
                                        "South Dakota",
                                        "Tennessee",
                                        "Texas",
                                        "Utah",
                                        "Vermont",
                                        "Virginia",
                                        "Washington",
                                        "West Virginia",
                                        "Wisconsin",
                                        "Wyoming"
                                    ],
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'autoSuggestFieldId'
                                }),
                                PropertyFieldNumericInput_1.PropertyFieldNumericInput('numeric', {
                                    label: strings.NumericInputFieldLabel,
                                    initialValue: this.properties.numeric,
                                    min: 0,
                                    max: 100,
                                    step: 1,
                                    precision: 0,
                                    size: 10,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'passwordFieldId'
                                }),
                                PropertyFieldRichTextBox_1.PropertyFieldRichTextBox('richTextBox', {
                                    label: strings.RichTextBoxFieldLabel,
                                    initialValue: this.properties.richTextBox,
                                    inline: false,
                                    minHeight: 100,
                                    mode: 'basic',
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    context: this.context,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'richFieldId'
                                }),
                                PropertyFieldDatePicker_1.PropertyFieldDatePicker('date', {
                                    label: strings.DateFieldLabel,
                                    initialDate: this.properties.date,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'dateFieldId'
                                }),
                                PropertyFieldDatePicker_1.PropertyFieldDatePicker('date2', {
                                    label: strings.DateFieldLabel,
                                    initialDate: this.properties.date2,
                                    formatDate: this.formatDateIso,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'date2FieldId'
                                }),
                                PropertyFieldDateTimePicker_1.PropertyFieldDateTimePicker('datetime', {
                                    label: strings.DateTimeFieldLabel,
                                    initialDate: this.properties.datetime,
                                    //formatDate: this.formatDateIso,
                                    timeConvention: PropertyFieldDateTimePicker_1.ITimeConvention.Hours12,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'dateTimeFieldId'
                                }),
                                PropertyFieldSliderRange_1.PropertyFieldSliderRange('sliderRange', {
                                    label: strings.SliderRangeFieldLabel,
                                    initialValue: this.properties.sliderRange,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    showValue: true,
                                    disabled: false,
                                    min: 0,
                                    max: 500,
                                    step: 1,
                                    orientation: 'horizontal',
                                    properties: this.properties,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'sliderRangeFieldId'
                                }),
                                PropertyFieldPhoneNumber_1.PropertyFieldPhoneNumber('phone', {
                                    label: strings.PhoneNumberFieldLabel,
                                    initialValue: this.properties.phone,
                                    phoneNumberFormat: PropertyFieldPhoneNumber_1.IPhoneNumberFormat.UnitedStates,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'phoneFieldId'
                                }),
                                PropertyFieldMaskedInput_1.PropertyFieldMaskedInput('maskedInput', {
                                    label: strings.MaskedInputFieldLabel,
                                    initialValue: this.properties.maskedInput,
                                    pattern: '\d{4} \d{4} \d{4} \d{4}',
                                    placeholder: 'XXXX XXXX XXXX XXXX',
                                    maxLength: '19',
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'maskedFieldId'
                                }),
                                PropertyFieldMapPicker_1.PropertyFieldMapPicker('geolocation', {
                                    label: strings.GeoLocationFieldLabel,
                                    longitude: this.properties.geolocation != null ? this.properties.geolocation.substr(0, this.properties.geolocation.indexOf(",")) : '0',
                                    latitude: this.properties.geolocation != null ? this.properties.geolocation.substr(this.properties.geolocation.indexOf(",") + 1, this.properties.geolocation.length - this.properties.geolocation.indexOf(",")) : '0',
                                    collapsed: true,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'geoLocationFieldId'
                                })
                            ],
                        },
                        {
                            groupName: 'SharePoint Fields',
                            groupFields: [
                                PropertyFieldPicturePicker_1.PropertyFieldPicturePicker('picture', {
                                    label: strings.PictureFieldLabel,
                                    initialValue: this.properties.picture,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    context: this.context,
                                    properties: this.properties,
                                    disabled: false,
                                    readOnly: true,
                                    previewImage: true,
                                    allowedFileExtensions: '.gif,.jpg,.jpeg,.bmp,.dib,.tif,.tiff,.ico,.png',
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'pictureFieldId'
                                }),
                                PropertyFieldDocumentPicker_1.PropertyFieldDocumentPicker('document', {
                                    label: strings.DocumentFieldLabel,
                                    initialValue: this.properties.document,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    context: this.context,
                                    properties: this.properties,
                                    disabled: false,
                                    readOnly: true,
                                    previewDocument: true,
                                    allowedFileExtensions: '.doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.txt',
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'documentFieldId'
                                }),
                                PropertyFieldOfficeVideoPicker_1.PropertyFieldOfficeVideoPicker('officeVideo', {
                                    label: strings.OfficeVideoFieldLabel,
                                    panelTitle: 'Select a video',
                                    initialValue: this.properties.officeVideo,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    disabled: false,
                                    readOnly: true,
                                    context: this.context,
                                    properties: this.properties,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'officeVideoFieldId'
                                }),
                                PropertyFieldPeoplePicker_1.PropertyFieldPeoplePicker('people', {
                                    label: strings.PeopleFieldLabel,
                                    initialData: this.properties.people,
                                    allowDuplicate: true,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    context: this.context,
                                    properties: this.properties,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'peopleFieldId'
                                }),
                                PropertyFieldGroupPicker_1.PropertyFieldGroupPicker('groups', {
                                    label: strings.GroupFieldLabel,
                                    initialData: this.properties.groups,
                                    allowDuplicate: false,
                                    groupType: PropertyFieldGroupPicker_1.IGroupType.SharePoint,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    context: this.context,
                                    properties: this.properties,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'groupsFieldId'
                                }),
                                PropertyFieldSearchPropertiesPicker_1.PropertyFieldSearchPropertiesPicker('searchProperties', {
                                    label: strings.SearchPropertiesFieldLabel,
                                    selectedProperties: this.properties.searchProperties,
                                    loadingText: 'Loading...',
                                    noResultsFoundText: 'No properties found',
                                    suggestionsHeaderText: 'Suggested Properties',
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'searchPropertiesPickerFieldId'
                                }),
                                PropertyFieldTermSetPicker_1.PropertyFieldTermSetPicker('termSets', {
                                    label: strings.TermSetsFieldLabel,
                                    panelTitle: 'Select a Term Set',
                                    initialValues: this.properties.termSets,
                                    allowMultipleSelections: true,
                                    excludeSystemGroup: false,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    context: this.context,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'termSetsPickerFieldId'
                                }),
                                PropertyFieldSPFolderPicker_1.PropertyFieldSPFolderPicker('folder', {
                                    label: strings.SPFolderFieldLabel,
                                    initialFolder: this.properties.folder,
                                    //baseFolder: '/sites/devcenter/_catalogs',
                                    context: this.context,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'folderFieldId'
                                }),
                                PropertyFieldSPListPicker_1.PropertyFieldSPListPicker('list', {
                                    label: strings.SPListFieldLabel,
                                    selectedList: this.properties.list,
                                    includeHidden: false,
                                    //baseTemplate: 109,
                                    orderBy: PropertyFieldSPListPicker_1.PropertyFieldSPListPickerOrderBy.Title,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    context: this.context,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'listFieldId'
                                }),
                                PropertyFieldSPListMultiplePicker_1.PropertyFieldSPListMultiplePicker('listsCollection', {
                                    label: strings.SPListFieldLabel,
                                    selectedLists: this.properties.listsCollection,
                                    includeHidden: false,
                                    baseTemplate: 109,
                                    orderBy: PropertyFieldSPListMultiplePicker_1.PropertyFieldSPListMultiplePickerOrderBy.Title,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    context: this.context,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'listCollectionFieldId'
                                })
                            ]
                        },
                        {
                            groupName: 'SharePoint Query',
                            groupFields: [
                                PropertyFieldSPListQuery_1.PropertyFieldSPListQuery('query', {
                                    label: strings.QueryFieldLabel,
                                    query: this.properties.query,
                                    includeHidden: false,
                                    //baseTemplate: 109,
                                    orderBy: PropertyFieldSPListQuery_1.PropertyFieldSPListQueryOrderBy.Title,
                                    showOrderBy: true,
                                    showMax: true,
                                    showFilters: true,
                                    max: 50,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    context: this.context,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'spListFieldId'
                                }),
                                PropertyFieldDisplayMode_1.PropertyFieldDisplayMode('displayMode', {
                                    label: strings.DisplayModeFieldLabel,
                                    initialValue: this.properties.displayMode,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    render: this.render.bind(this),
                                    disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                                    properties: this.properties,
                                    disabled: false,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'displayModeFieldId'
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return TestWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = TestWebPart;
//# sourceMappingURL=TestWebPart.js.map