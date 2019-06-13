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
 * @file PropertyFieldSliderRangeHost.tsx
 * Renders the controls for PropertyFieldSliderRange component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
/**
 * @class
 * Renders the controls for PropertyFieldSliderRange component
 */
var PropertyFieldSliderRangeHost = /** @class */ (function (_super) {
    __extends(PropertyFieldSliderRangeHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldSliderRangeHost(props) {
        return _super.call(this, props) || this;
        //Bind the current object to the external called onSelectDate method
    }
    /**
     * @function
     * Renders the controls
     */
    PropertyFieldSliderRangeHost.prototype.render = function () {
        //Renders content
        return (React.createElement("div", null,
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement("table", { style: { paddingTop: '8px', paddingBottom: '10px', width: "100%" }, cellPadding: "0", cellSpacing: "10" },
                React.createElement("tbody", null, this.props.showValue == false ?
                    React.createElement("tr", null,
                        React.createElement("td", { width: "100%" },
                            React.createElement("div", { id: this.props.guid + '-slider' })))
                    :
                        this.props.orientation == 'vertical' ?
                            React.createElement("tr", null,
                                React.createElement("td", { width: "100%" },
                                    React.createElement("div", { className: "ms-Label", style: { marginBottom: '8px' }, id: this.props.guid + '-max' }, (this.props.initialValue != null && this.props.initialValue != '' && this.props.initialValue.split(",").length == 2) ? this.props.initialValue.split(",")[1] : '0'),
                                    React.createElement("div", { id: this.props.guid + '-slider' }),
                                    React.createElement("div", { className: "ms-Label", style: { marginTop: '8px' }, id: this.props.guid + '-min' }, (this.props.initialValue != null && this.props.initialValue != '' && this.props.initialValue.split(",").length == 2) ? this.props.initialValue.split(",")[0] : '0')))
                            :
                                React.createElement("tr", null,
                                    React.createElement("td", { width: "35" },
                                        React.createElement("div", { className: "ms-Label", id: this.props.guid + '-min' }, (this.props.initialValue != null && this.props.initialValue != '' && this.props.initialValue.split(",").length == 2) ? this.props.initialValue.split(",")[0] : '0')),
                                    React.createElement("td", { width: "220" },
                                        React.createElement("div", { id: this.props.guid + '-slider' })),
                                    React.createElement("td", { width: "35", style: { textAlign: 'right' } },
                                        React.createElement("div", { className: "ms-Label", id: this.props.guid + '-max' }, (this.props.initialValue != null && this.props.initialValue != '' && this.props.initialValue.split(",").length == 2) ? this.props.initialValue.split(",")[1] : '0'))))),
            React.createElement("div", null,
                React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' },
                    React.createElement("span", { id: this.props.guid + '-errorMssg1' })),
                React.createElement("span", null,
                    React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' },
                        React.createElement("span", { id: this.props.guid + '-errorMssg2' }))))));
    };
    return PropertyFieldSliderRangeHost;
}(React.Component));
exports.default = PropertyFieldSliderRangeHost;
//# sourceMappingURL=PropertyFieldSliderRangeHost.js.map