/**
 * @file PropertyFieldSearchPropertiesPickerHost.tsx
 * Renders the controls for PropertyFieldSearchPropertiesPicker component
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldSearchPropertiesPickerPropsInternal } from './PropertyFieldSearchPropertiesPicker';
import { ITag } from 'office-ui-fabric-react/lib/Pickers';
/**
 * @interface
 * PropertyFieldSearchPropertiesPickerHost properties interface
 *
 */
export interface IPropertyFieldSearchPropertiesPickerHostProps extends IPropertyFieldSearchPropertiesPickerPropsInternal {
}
export interface IPropertyFieldSearchPropertiesPickerState {
    errorMessage: string;
    properties: ITag[];
    selectedProperties: ITag[];
}
/**
 * @class
 * Renders the controls for PropertyFieldSearchPropertiesPicker component
 */
export default class PropertyFieldSearchPropertiesPickerHost extends React.Component<IPropertyFieldSearchPropertiesPickerHostProps, IPropertyFieldSearchPropertiesPickerState> {
    private defaultProperties;
    private async;
    private delayedValidate;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldSearchPropertiesPickerHostProps);
    private getDefaultProperties;
    private getSelectedProperties;
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
