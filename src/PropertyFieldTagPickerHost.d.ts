/**
 * @file PropertyFieldTagPickerHost.tsx
 * Renders the controls for PropertyFieldTagPicker component
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldTagPickerPropsInternal } from './PropertyFieldTagPicker';
/**
 * @interface
 * PropertyFieldTagPickerHost properties interface
 *
 */
export interface IPropertyFieldTagPickerHostProps extends IPropertyFieldTagPickerPropsInternal {
}
export interface IPropertyFieldTagPickerState {
    errorMessage: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldTagPicker component
 */
export default class PropertyFieldTagPickerHost extends React.Component<IPropertyFieldTagPickerHostProps, IPropertyFieldTagPickerState> {
    private async;
    private delayedValidate;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldTagPickerHostProps);
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
     * Called when the TagPicker text changed
     * @param filterText
     * @param tagList
     */
    private onFilterChanged;
    /**
     * @function
     * Tests if the selected list contains already the tag
     * @param tag
     * @param tagList
     */
    private listContainsTag;
    /**
     * @function
     * Occurs when the list of selected items changed
     * @param selectedItems
     */
    private onItemChanged;
    /**
     * @function
     * Renders the controls
     */
    render(): JSX.Element;
}
