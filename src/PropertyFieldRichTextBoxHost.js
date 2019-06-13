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
 * @file PropertyFieldRichTextBoxHost.tsx
 * Renders the controls for PropertyFieldRichTextBox component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
var React = require("react");
var Label_1 = require("office-ui-fabric-react/lib/Label");
/**
 * @class
 * Renders the controls for PropertyFieldRichTextBox component
 */
var PropertyFieldRichTextBoxHost = /** @class */ (function (_super) {
    __extends(PropertyFieldRichTextBoxHost, _super);
    /**
     * @function
     * Constructor
     */
    function PropertyFieldRichTextBoxHost(props) {
        return _super.call(this, props) || this;
        //Bind the current object to the external called onSelectDate method
    }
    /**
     * @function
     * Renders the controls
     */
    PropertyFieldRichTextBoxHost.prototype.render = function () {
        //Renders content
        var minHeight = 100;
        if (this.props.minHeight != null)
            minHeight = this.props.minHeight;
        return (React.createElement("div", null,
            React.createElement(Label_1.Label, null, this.props.label),
            React.createElement("div", { style: { border: '1px solid #c8c8c8', minHeight: minHeight + 'px' } },
                React.createElement("textarea", { disabled: this.props.disabled, name: this.props.keyCopy + '-' + this.props.context.instanceId + '-editor', id: this.props.keyCopy + '-' + this.props.context.instanceId + '-editor', defaultValue: this.props.initialValue })),
            React.createElement("div", null,
                React.createElement("div", { "aria-live": 'assertive', className: 'ms-u-screenReaderOnly', "data-automation-id": 'error-message' },
                    React.createElement("span", { id: this.props.keyCopy + '-' + this.props.context.instanceId + '-errorMssg1' })),
                React.createElement("span", null,
                    React.createElement("p", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' },
                        React.createElement("span", { id: this.props.keyCopy + '-' + this.props.context.instanceId + '-errorMssg2' }))))));
    };
    return PropertyFieldRichTextBoxHost;
}(React.Component));
exports.default = PropertyFieldRichTextBoxHost;
//# sourceMappingURL=PropertyFieldRichTextBoxHost.js.map