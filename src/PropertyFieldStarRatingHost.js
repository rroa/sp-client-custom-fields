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
 * @file PropertyFieldStarRatingHost.tsx
 * Renders the controls for PropertyFieldStarRating component
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
//import StarRatingComponent from 'react-star-rating-component';
var GuidHelper_1 = require("./GuidHelper");
var StarRatingComponent = require('react-star-rating-component/dist/react-star-rating-component');
/**
 * @class
 * Renders the controls for PropertyFieldStarRating component
 */
var PropertyFieldStarRatingHost = /** @class */ (function (_super) {
    __extends(PropertyFieldStarRatingHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldStarRatingHost(props) {
        var _this = _super.call(this, props) || this;
        _this._key = GuidHelper_1.default.getGuid();
        _this.async = new Utilities_1.Async(_this);
        _this.state = {
            errorMessage: '',
            currentValue: _this.props.initialValue !== undefined ? _this.props.initialValue : 0
        };
        //Bind the current object to the external called onSelectDate method
        _this.onStarClick = _this.onStarClick.bind(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        return _this;
    }
    /**
     * @function
     * Validates the new custom field value
     */
    PropertyFieldStarRatingHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.initialValue, value);
            return;
        }
        var result = this.props.onGetErrorMessage(value || 0);
        if (result !== undefined) {
            if (typeof result === 'string') {
                if (result === undefined || result === '')
                    this.notifyAfterValidate(this.props.initialValue, value);
                this.setState({ errorMessage: result });
            }
            else {
                result.then(function (errorMessage) {
                    if (errorMessage === undefined || errorMessage === '')
                        _this.notifyAfterValidate(_this.props.initialValue, value);
                    _this.setState({ errorMessage: errorMessage });
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
    PropertyFieldStarRatingHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
        this.props.properties[this.props.targetProperty] = newValue;
        this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
        if (!this.props.disableReactivePropertyChanges && this.props.render != null)
            this.props.render();
    };
    /**
     * @function
     * Called when the component will unmount
     */
    PropertyFieldStarRatingHost.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    PropertyFieldStarRatingHost.prototype.onStarClick = function (nextValue, prevValue, name) {
        this.state.currentValue = nextValue;
        this.setState(this.state);
        this.delayedValidate(nextValue);
    };
    /**
     * @function
     * Renders the controls
     */
    PropertyFieldStarRatingHost.prototype.render = function () {
        //Renders content
        return (React.createElement("div", { style: { marginBottom: '8px' } },
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement("div", { style: { fontSize: this.props.starSize } },
                React.createElement(StarRatingComponent, { name: this._key, starCount: this.props.starCount, starColor: this.props.starColor, emptyStarColor: this.props.emptyStarColor, value: this.state.currentValue, editing: !this.props.disabled, onStarClick: this.onStarClick, renderStarIcon: null, renderStarIconHalf: null })),
            this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
                React.createElement("div", null,
                    React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' }, this.state.errorMessage),
                    React.createElement("span", null,
                        React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' }, this.state.errorMessage)))
                : ''));
    };
    return PropertyFieldStarRatingHost;
}(React.Component));
exports.default = PropertyFieldStarRatingHost;
//# sourceMappingURL=PropertyFieldStarRatingHost.js.map