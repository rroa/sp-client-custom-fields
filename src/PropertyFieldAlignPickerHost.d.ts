/**
 * @file PropertyFieldAlignPickerHost.tsx
 * Renders the controls for PropertyFieldAlignPicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldAlignPickerPropsInternal } from './PropertyFieldAlignPicker';
/**
 * @interface
 * PropertyFieldAlignPickerHost properties interface
 *
 */
export interface IPropertyFieldAlignPickerHostProps extends IPropertyFieldAlignPickerPropsInternal {
}
export interface IPropertyFieldAlignPickerHostState {
    mode?: string;
    overList?: boolean;
    overTiles?: boolean;
    overRight?: boolean;
    errorMessage?: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldAlignPicker component
 */
export default class PropertyFieldAlignPickerHost extends React.Component<IPropertyFieldAlignPickerHostProps, IPropertyFieldAlignPickerHostState> {
    private latestValidateValue;
    private async;
    private delayedValidate;
    private _key;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldAlignPickerHostProps);
    /**
     * @function
     * Function called when the component selected value changed
     */
    private onValueChanged;
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
    private onClickBullets;
    private onClickTiles;
    private onClickRight;
    private mouseListEnterDropDown;
    private mouseListLeaveDropDown;
    private mouseTilesEnterDropDown;
    private mouseTilesLeaveDropDown;
    private mouseRightEnterDropDown;
    private mouseRightLeaveDropDown;
    /**
     * @function
     * Renders the controls
     */
    render(): JSX.Element;
}
