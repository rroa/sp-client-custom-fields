"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file GuidHelper.ts
 * Helper methods to generate unique id (Guid)
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
var GuidHelper = /** @class */ (function () {
    function GuidHelper() {
    }
    /**
     * @function
     * Generates a GUID
     */
    GuidHelper.getGuid = function () {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + this.s4() + this.s4();
    };
    /**
     * @function
     * Generates a GUID part
     */
    GuidHelper.s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return GuidHelper;
}());
exports.default = GuidHelper;
//# sourceMappingURL=GuidHelper.js.map