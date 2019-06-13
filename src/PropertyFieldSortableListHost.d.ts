/**
 * @file PropertyFieldSortableListHost.tsx
 * Renders the controls for PropertyFieldSortableList component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
import * as React from 'react';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { IPropertyFieldSortableListPropsInternal } from './PropertyFieldSortableList';
/**
 * @interface
 * PropertyFieldSortableListHost properties interface
 *
 */
export interface IPropertyFieldSortableListHostProps extends IPropertyFieldSortableListPropsInternal {
}
/**
 * @interface
 * PropertyFieldSortableListHost state interface
 *
 */
export interface IPropertyFieldSortableListHostState {
    results: IChoiceGroupOption[];
    selectedKeys: string[];
    errorMessage?: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldSortableList component
 */
export default class PropertyFieldSortableListHost extends React.Component<IPropertyFieldSortableListHostProps, IPropertyFieldSortableListHostState> {
    private async;
    private delayedValidate;
    private _key;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldSortableListHostProps);
    /**
     * Inits the default items checked values
     */
    private initDefaultValue;
    /**
     * Gets the item from key
     * @param key
     */
    private getStateItemFromKey;
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
    private sortDescending;
    private sortAscending;
    /**
     * @function
     * Renders the SPListMultiplePicker controls with Office UI  Fabric
     */
    render(): JSX.Element;
}
