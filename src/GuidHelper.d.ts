/**
 * @file GuidHelper.ts
 * Helper methods to generate unique id (Guid)
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
export default class GuidHelper {
    /**
     * @function
     * Generates a GUID
     */
    static getGuid(): string;
    /**
     * @function
     * Generates a GUID part
     */
    private static s4;
}
