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
 * @file PropertyFieldTagPickerHost.tsx
 * Renders the controls for PropertyFieldTagPicker component
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var Pickers_1 = require("office-ui-fabric-react/lib/Pickers");
/**
 * @class
 * Renders the controls for PropertyFieldTagPicker component
 */
var PropertyFieldTagPickerHost = /** @class */ (function (_super) {
    __extends(PropertyFieldTagPickerHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldTagPickerHost(props) {
        var _this = _super.call(this, props) || this;
        _this.async = new Utilities_1.Async(_this);
        _this.state = { errorMessage: '' };
        //Bind the current object to the external called onSelectDate method
        _this.onItemChanged = _this.onItemChanged.bind(_this);
        _this.onFilterChanged = _this.onFilterChanged.bind(_this);
        _this.listContainsTag = _this.listContainsTag.bind(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        return _this;
    }
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldTagPickerHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.selectedTags, value);
            return;
        }
        var result = this.props.onGetErrorMessage(value || []);
        if (result !== undefined) {
            if (typeof result === 'string') {
                if (result === undefined || result === '')
                    this.notifyAfterValidate(this.props.selectedTags, value);
                this.setState({ errorMessage: result });
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(_this.props.selectedTags, value);
                    _this.setState({ errorMessage: errorMessage });
                });
            }
        }
        else {
            this.notifyAfterValidate(this.props.selectedTags, value);
        }
    };
    /**
     * @function
     * Notifies the parent Web Part of a property value change
     */
    PropertyFieldTagPickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
        this.props.properties[this.props.targetProperty] = newValue;
        this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
        if (!this.props.disableReactivePropertyChanges && this.props.render != null)
            this.props.render();
    };
    /**
     * @function
     * Called when the component will unmount
     */
    PropertyFieldTagPickerHost.prototype.componentWillUnmount = function () {
        if (this.async !== undefined)
            this.async.dispose();
    };
    /**
     * @function
     * Called when the TagPicker text changed
     * @param filterText
     * @param tagList
     */
    PropertyFieldTagPickerHost.prototype.onFilterChanged = function (filterText, tagList) {
        var _this = this;
        return filterText ? this.props.tags.filter(function (tag) { return tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0; }).filter(function (item) { return !_this.listContainsTag(item, tagList); }) : [];
    };
    /**
     * @function
     * Tests if the selected list contains already the tag
     * @param tag
     * @param tagList
     */
    PropertyFieldTagPickerHost.prototype.listContainsTag = function (tag, tagList) {
        if (!tagList || !tagList.length || tagList.length === 0) {
            return false;
        }
        return tagList.filter(function (compareTag) { return compareTag.key === tag.key; }).length > 0;
    };
    /**
     * @function
     * Occurs when the list of selected items changed
     * @param selectedItems
     */
    PropertyFieldTagPickerHost.prototype.onItemChanged = function (selectedItems) {
        this.delayedValidate(selectedItems);
    };
    /**
     * @function
     * Renders the controls
     */
    PropertyFieldTagPickerHost.prototype.render = function () {
        //Renders content
        return (React.createElement("div", { style: { marginBottom: '8px' } },
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement(Pickers_1.TagPicker, { onResolveSuggestions: this.onFilterChanged, getTextFromItem: function (item) { return item.name; }, defaultSelectedItems: this.props.selectedTags, onChange: this.onItemChanged, pickerSuggestionsProps: {
                    suggestionsHeaderText: this.props.suggestionsHeaderText,
                    noResultsFoundText: this.props.noResultsFoundText,
                    loadingText: this.props.loadingText
                } }),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", null,
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    return PropertyFieldTagPickerHost;
}(React.Component));
exports.default = PropertyFieldTagPickerHost;
//# sourceMappingURL=PropertyFieldTagPickerHost.js.map