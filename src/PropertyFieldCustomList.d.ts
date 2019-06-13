import { IPropertyPaneField, IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
export declare enum CustomListFieldType {
    string = 0,
    number = 1,
    date = 2,
    boolean = 3,
    dateTime = 4,
    font = 5,
    fontSize = 6,
    color = 7,
    icon = 8,
    password = 9,
    picture = 10,
    document = 11,
    list = 12,
    users = 13,
    folder = 14,
    sharePointGroups = 15,
    securityGroups = 16,
    officeVideo = 17,
    stars = 18,
    colorMini = 19,
    richtext = 20
}
export interface ICustomListField {
    id: string;
    title: string;
    type: CustomListFieldType;
    required?: boolean;
    hidden?: boolean;
}
/**
 * @interface
 * Public properties of the PropertyFieldCustomList custom field
 *
 */
export interface IPropertyFieldCustomListProps {
    /**
     * @var
     * Property field label displayed on top
     */
    label: string;
    /**
     * @var
     * Defines the Panel title
     */
    headerText: string;
    /**
     * @var
     * Defines the fields of the list
     */
    fields: ICustomListField[];
    /**
     * @var
     * Initial value
     */
    value?: any[];
    /**
     * @var
     * Parent web part context
     */
    context: IWebPartContext;
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
}
/**
 * @interface
 * Private properties of the PropertyFieldCustomList custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldCustomList.
 *
 */
export interface IPropertyFieldCustomListPropsInternal extends IPropertyPaneCustomFieldProps {
    label: string;
    fields: ICustomListField[];
    value?: any[];
    headerText: string;
    targetProperty: string;
    context: IWebPartContext;
    onRender(elem: HTMLElement): void;
    onDispose(elem: HTMLElement): void;
    onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
    render(): void;
    disableReactivePropertyChanges?: boolean;
    properties: any;
    disabled?: boolean;
}
/**
 * @function
 * Helper method to create the customer field on the PropertyPane.
 * @param targetProperty - Target property the custom field is associated to.
 * @param properties - Strongly typed custom field properties.
 */
export declare function PropertyFieldCustomList(targetProperty: string, properties: IPropertyFieldCustomListProps): IPropertyPaneField<IPropertyFieldCustomListPropsInternal>;
