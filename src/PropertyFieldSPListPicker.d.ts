import { IPropertyPaneField, IWebPartContext } from '@microsoft/sp-webpart-base';
export declare enum PropertyFieldSPListPickerOrderBy {
    Id = 0,
    Title = 1
}
/**
 * @interface
 * Public properties of the PropertyFieldSPListPicker custom field
 *
 */
export interface IPropertyFieldSPListPickerProps {
    /**
     * @var
     * Property field label displayed on top
     */
    label: string;
    context: IWebPartContext;
    selectedList?: string;
    baseTemplate?: number;
    includeHidden?: boolean;
    orderBy?: PropertyFieldSPListPickerOrderBy;
    /**
     * @function
     * Defines a onPropertyChange function to raise when the selected value changed.
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
 * Private properties of the PropertyFieldSPListPicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldSPListPicker.
 *
 */
export interface IPropertyFieldSPListPickerPropsInternal extends IPropertyFieldSPListPickerProps {
    label: string;
    targetProperty: string;
    context: IWebPartContext;
    selectedList?: string;
    baseTemplate?: number;
    orderBy?: PropertyFieldSPListPickerOrderBy;
    includeHidden?: boolean;
    onRender(elem: HTMLElement): void;
    onDispose(elem: HTMLElement): void;
    onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
    render(): void;
    disableReactivePropertyChanges?: boolean;
    properties: any;
    key: string;
    disabled?: boolean;
    onGetErrorMessage?: (value: string) => string | Promise<string>;
    deferredValidationTime?: number;
}
/**
 * @function
 * Helper method to create a SPList Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint list picker is associated to.
 * @param properties - Strongly typed SPList Picker properties.
 */
export declare function PropertyFieldSPListPicker(targetProperty: string, properties: IPropertyFieldSPListPickerProps): IPropertyPaneField<IPropertyFieldSPListPickerPropsInternal>;
