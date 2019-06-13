/**
 * @file PropertyFieldSPListPickerHost.tsx
 * Renders the controls for PropertyFieldSPListPicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
import * as React from 'react';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IPropertyFieldSPListPickerPropsInternal } from './PropertyFieldSPListPicker';
/**
 * @interface
 * PropertyFieldSPListPickerHost properties interface
 *
 */
export interface IPropertyFieldSPListPickerHostProps extends IPropertyFieldSPListPickerPropsInternal {
}
/**
 * @interface
 * PropertyFieldSPListPickerHost state interface
 *
 */
export interface IPropertyFieldFontPickerHostState {
    results: IDropdownOption[];
    selectedKey: string;
    errorMessage?: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldSPListPicker component
 */
export default class PropertyFieldSPListPickerHost extends React.Component<IPropertyFieldSPListPickerHostProps, IPropertyFieldFontPickerHostState> {
    private options;
    private selectedKey;
    private latestValidateValue;
    private async;
    private delayedValidate;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldSPListPickerHostProps);
    /**
     * @function
     * Loads the list from SharePoint current web site
     */
    private loadLists;
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
     * Renders the SPListpicker controls with Office UI  Fabric
     */
    render(): JSX.Element;
}
