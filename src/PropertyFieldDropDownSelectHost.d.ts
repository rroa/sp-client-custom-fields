/**
 * @file PropertyFieldDropDownSelectHost.tsx
 * Renders the controls for PropertyFieldDropDownSelect component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldDropDownSelectPropsInternal } from './PropertyFieldDropDownSelect';
/**
 * @interface
 * PropertyFieldDropDownSelectHost properties interface
 *
 */
export interface IPropertyFieldDropDownSelectHostProps extends IPropertyFieldDropDownSelectPropsInternal {
}
/**
 * @interface
 * PropertyFieldDropDownSelectHost state interface
 *
 */
export interface IPropertyFieldDropDownSelectHostState {
    isOpen: boolean;
    isHoverDropdown?: boolean;
    hoverFont?: string;
    selectedFont?: string[];
    safeSelectedFont?: string[];
    errorMessage?: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldDropDownSelect component
 */
export default class PropertyFieldDropDownSelectHost extends React.Component<IPropertyFieldDropDownSelectHostProps, IPropertyFieldDropDownSelectHostState> {
    private async;
    private delayedValidate;
    private _key;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldDropDownSelectHostProps);
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
     * Function to open the dialog
     */
    private onOpenDialog;
    /**
     * @function
     * Mouse is hover a font
     */
    private toggleHover;
    /**
     * @function
     * Mouse is leaving a font
     */
    private toggleHoverLeave;
    /**
     * @function
     * Mouse is hover the fontpicker
     */
    private mouseEnterDropDown;
    /**
     * @function
     * Mouse is leaving the fontpicker
     */
    private mouseLeaveDropDown;
    private saveOptions;
    /**
     * @function
     * User clicked on a font
     */
    private onClickFont;
    private getOption;
    /**
     * @function
     * Renders the control
     */
    render(): JSX.Element;
}
