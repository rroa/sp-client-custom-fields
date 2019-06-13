/**
 * @file PropertyFieldColorPickerHost.tsx
 * Renders the controls for PropertyFieldColorPicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldColorPickerPropsInternal } from './PropertyFieldColorPicker';
/**
 * @interface
 * PropertyFieldColorPickerHost properties interface
 *
 */
export interface IPropertyFieldColorPickerHostProps extends IPropertyFieldColorPickerPropsInternal {
}
export interface IPropertyFieldColorPickerHostState {
    color?: string;
    errorMessage?: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldColorPicker component
 */
export default class PropertyFieldColorPickerHost extends React.Component<IPropertyFieldColorPickerHostProps, IPropertyFieldColorPickerHostState> {
    private latestValidateValue;
    private async;
    private delayedValidate;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldColorPickerHostProps);
    /**
     * @function
     * Function called when the ColorPicker Office UI Fabric component selected color changed
     */
    private onColorChanged;
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
     * Renders the control
     */
    render(): JSX.Element;
}
