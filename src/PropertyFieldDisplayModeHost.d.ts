/**
 * @file PropertyFieldDisplayModeHost.tsx
 * Renders the controls for PropertyFieldDisplayMode component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldDisplayModePropsInternal } from './PropertyFieldDisplayMode';
/**
 * @interface
 * PropertyFieldDisplayModeHost properties interface
 *
 */
export interface IPropertyFieldDisplayModeHostProps extends IPropertyFieldDisplayModePropsInternal {
}
export interface IPropertyFieldDisplayModeHostState {
    mode?: string;
    overList?: boolean;
    overTiles?: boolean;
    errorMessage?: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldDisplayMode component
 */
export default class PropertyFieldDisplayModeHost extends React.Component<IPropertyFieldDisplayModeHostProps, IPropertyFieldDisplayModeHostState> {
    private latestValidateValue;
    private async;
    private delayedValidate;
    private _key;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldDisplayModeHostProps);
    /**
     * @function
     * Function called when the selected value changed
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
    private mouseListEnterDropDown;
    private mouseListLeaveDropDown;
    private mouseTilesEnterDropDown;
    private mouseTilesLeaveDropDown;
    /**
     * @function
     * Renders the control
     */
    render(): JSX.Element;
}
