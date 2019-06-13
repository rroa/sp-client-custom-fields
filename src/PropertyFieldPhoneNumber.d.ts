import { IPropertyPaneField, IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';
export declare enum IPhoneNumberFormat {
    UnitedStates = 0,
    UK = 1,
    France = 2,
    Mexico = 3,
    Australia = 4,
    Denmark = 6,
    Iceland = 7,
    Canada = 8,
    Quebec = 9,
    NorwayLandLine = 10,
    NorwayMobile = 11,
    Portugal = 12,
    PolandLandLine = 13,
    PolandMobile = 14,
    Spain = 15,
    Switzerland = 16,
    Turkey = 17,
    Russian = 18,
    Germany = 19,
    BelgiumLandLine = 20,
    BelgiumMobile = 21,
    Pakistan = 22,
    IndiaLandLine = 23,
    IndiaMobile = 24,
    ChinaLandLine = 25,
    ChinaMobile = 26,
    HongKong = 27,
    Japan = 28,
    Malaysia = 29,
    Philippines = 30,
    Singapore = 31,
    TaiwanLandLine = 32,
    TaiwanMobile = 33,
    SouthKoreaMobile = 34,
    NewZealand = 35,
    CostaRica = 36,
    ElSalvador = 37,
    Guatemala = 38,
    HondurasLandLine = 39,
    HondurasMobile = 40,
    BrazilLandLine = 41,
    BrazilMobile = 42,
    Peru = 43
}
/**
 * @interface
 * Public properties of the PropertyFieldPhoneNumber custom field
 *
 */
export interface IPropertyFieldPhoneNumberProps {
    /**
     * @var
     * Property field label displayed on top
     */
    label: string;
    /**
     * @var
     * Initial value
     */
    initialValue?: string;
    /**
     * @var
     * Phone number format
     */
    phoneNumberFormat?: IPhoneNumberFormat;
    /**
     * @function
     * Defines a onPropertyChange function to raise when the selected Color changed.
     * Normally this function must be always defined with the 'this.onPropertyChange'
     * method of the web part object.
     */
    onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
    /**
     * @function
     * This API is called to render the web part.
     * Normally this function must be always defined with the 'this.render.bind(this)'
     * method of the web part object.
     */
    render(): void;
    /**
     * This property is used to indicate the web part's PropertyPane interaction mode: Reactive or NonReactive.
     * The default behaviour is Reactive.
     */
    disableReactivePropertyChanges?: boolean;
    /**
     * @var
     * Parent Web Part properties
     */
    properties: any;
    /**
     * @var
     * An UNIQUE key indicates the identity of this control
     */
    key?: string;
    /**
     * Whether the property pane field is enabled or not.
     */
    disabled?: boolean;
    /**
     * The method is used to get the validation error message and determine whether the input value is valid or not.
     *
     *   When it returns string:
     *   - If valid, it returns empty string.
     *   - If invalid, it returns the error message string and the text field will
     *     show a red border and show an error message below the text field.
     *
     *   When it returns Promise<string>:
     *   - The resolved value is display as error message.
     *   - The rejected, the value is thrown away.
     *
     */
    onGetErrorMessage?: (value: string) => string | Promise<string>;
    /**
     * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
     * Default value is 200.
     */
    deferredValidationTime?: number;
}
/**
 * @interface
 * Private properties of the PropertyFieldPhoneNumber custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldPhoneNumber.
 *
 */
export interface IPropertyFieldPhoneNumberPropsInternal extends IPropertyPaneCustomFieldProps {
    label: string;
    initialValue?: string;
    phoneNumberFormat?: IPhoneNumberFormat;
    targetProperty: string;
    onRender(elem: HTMLElement): void;
    onDispose(elem: HTMLElement): void;
    onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
    render(): void;
    disableReactivePropertyChanges?: boolean;
    properties: any;
    disabled?: boolean;
    onGetErrorMessage?: (value: string) => string | Promise<string>;
    deferredValidationTime?: number;
}
/**
 * @function
 * Helper method to create the customer field on the PropertyPane.
 * @param targetProperty - Target property the custom field is associated to.
 * @param properties - Strongly typed custom field properties.
 */
export declare function PropertyFieldPhoneNumber(targetProperty: string, properties: IPropertyFieldPhoneNumberProps): IPropertyPaneField<IPropertyFieldPhoneNumberPropsInternal>;
