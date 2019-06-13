/**
 * @file PropertyFieldSPListMultiplePickerHost.tsx
 * Renders the controls for PropertyFieldSPListMultiplePicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
import * as React from 'react';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { IPropertyFieldSPListMultiplePickerPropsInternal } from './PropertyFieldSPListMultiplePicker';
/**
 * @interface
 * PropertyFieldSPListMultiplePickerHost properties interface
 *
 */
export interface IPropertyFieldSPListMultiplePickerHostProps extends IPropertyFieldSPListMultiplePickerPropsInternal {
}
/**
 * @interface
 * PropertyFieldSPListMultiplePickerHost state interface
 *
 */
export interface IPropertyFieldSPListMultiplePickerHostState {
    results: IChoiceGroupOption[];
    selectedKeys: string[];
    loaded: boolean;
    errorMessage?: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldSPListMultiplePicker component
 */
export default class PropertyFieldSPListMultiplePickerHost extends React.Component<IPropertyFieldSPListMultiplePickerHostProps, IPropertyFieldSPListMultiplePickerHostState> {
    private options;
    private loaded;
    private async;
    private delayedValidate;
    private _key;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldSPListMultiplePickerHostProps);
    /**
     * @function
     * Loads the list from SharePoint current web site
     */
    private loadLists;
    /**
     * @function
     * Remove a string from the selected keys
     */
    private removeSelected;
    /**
     * @function
     * Raises when a list has been selected
     */
    private onChanged;
    /**
     * @function
     * Validates the new custom field value
     */
    private validate;
    /**
     * @function
     * Notifies the parent Web Part of a property value change
     */
    private notifyAfterValidate;
    /**
     * @function
     * Called when the component will unmount
     */
    componentWillUnmount(): void;
    /**
     * @function
     * Renders the SPListMultiplePicker controls with Office UI  Fabric
     */
    render(): JSX.Element;
}
