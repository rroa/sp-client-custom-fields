import { IPropertyPaneField, IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';
/**
 * @interface
 * Describes a treeview Node
 */
export interface ITreeViewNode {
    /**
     * @var
     * Node's ID (must be unique)
     */
    id: string;
    /**
     * @var
     * Node's label
     */
    label: string;
    /**
     * @var
     * Defines if the node is collapsed or not
     */
    collapsed?: boolean;
    /**
     * @var
     * Defines if the node is a leaf
     */
    leaf?: boolean;
    /**
     * @var
     * Array of child nodes
     */
    children?: ITreeViewNode[];
    /**
     * @var
     * Node's picture URL. Note: the image size will be always 18px x 18px.
     */
    pictureUrl?: string;
    /**
     * @var
     * Node's picture URL used when the node is selected. If empty, the pictureUrl will be used. Note: the image size will be always 18px x 18px.
     */
    selectedPictureUrl?: string;
    /**
     * @var
     * Node's picutre URL used when the node is a folder and when the node is expanded. If empty, the pictureUrl will be used. Note: the image size will be always 18px x 18px.
     */
    expandedPictureUrl?: string;
}
/**
 * @interface
 * Public properties of the PropertyFieldTreeView custom field
 *
 */
export interface IPropertyFieldTreeViewProps {
    /**
     * @var
     * Property field label displayed on top
     */
    label: string;
    /**
     * @var
     * Tree root nodes
     */
    tree: ITreeViewNode[];
    /**
     * @var
     * Selected nodes ids
     */
    selectedNodesIDs?: string[];
    /**
     * @var
     * Defines if the user can select multiple nodes or not (default is `false')
     */
    allowMultipleSelections?: boolean;
    /**
     * @var
     * Defines if the user can select a folder or only leaf (default is `true`)
     */
    allowFoldersSelections?: boolean;
    /**
     * @var
     * Defines the nodes padding left. Default value is `20` pixels
     */
    nodesPaddingLeft?: number;
    /**
     * @var
     * Defines if a checkbox is displayed with the item (default is `true`)
     */
    checkboxEnabled?: boolean;
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
    onGetErrorMessage?: (value: string[]) => string | Promise<string>;
    /**
     * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
     * Default value is 200.
     */
    deferredValidationTime?: number;
}
/**
 * @interface
 * Private properties of the PropertyFieldTreeView custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldTreeView.
 *
 */
export interface IPropertyFieldTreeViewPropsInternal extends IPropertyPaneCustomFieldProps {
    label: string;
    tree: ITreeViewNode[];
    selectedNodesIDs?: string[];
    allowMultipleSelections?: boolean;
    allowFoldersSelections?: boolean;
    nodesPaddingLeft?: number;
    checkboxEnabled?: boolean;
    targetProperty: string;
    onRender(elem: HTMLElement): void;
    onDispose(elem: HTMLElement): void;
    onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
    render(): void;
    disableReactivePropertyChanges?: boolean;
    properties: any;
    disabled?: boolean;
    onGetErrorMessage?: (value: string[]) => string | Promise<string>;
    deferredValidationTime?: number;
}
/**
 * @function
 * Helper method to create the customer field on the PropertyPane.
 * @param targetProperty - Target property the custom field is associated to.
 * @param properties - Strongly typed custom field properties.
 */
export declare function PropertyFieldTreeView(targetProperty: string, properties: IPropertyFieldTreeViewProps): IPropertyPaneField<IPropertyFieldTreeViewPropsInternal>;
