/**
 * @file PropertyFieldColorPickerMiniHost.tsx
 * Renders the controls for PropertyFieldColorPickerMini component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldColorPickerMiniPropsInternal } from './PropertyFieldColorPickerMini';
/**
 * @interface
 * PropertyFieldColorPickerMiniHost properties interface
 *
 */
export interface IPropertyFieldColorPickerMiniHostProps extends IPropertyFieldColorPickerMiniPropsInternal {
}
export interface IPropertyFieldColorPickerMiniHostState {
    color?: string;
    calloutVisible: boolean;
    isHover: boolean;
    errorMessage?: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldColorPickerMini component
 */
export default class PropertyFieldColorPickerMiniHost extends React.Component<IPropertyFieldColorPickerMiniHostProps, IPropertyFieldColorPickerMiniHostState> {
    private latestValidateValue;
    private async;
    private delayedValidate;
    private menuButtonElement;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldColorPickerMiniHostProps);
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
     * Called when the color button is clicked
     */
    private onClickButton;
    private onMouseEnterButton;
    private onMouseLeaveButton;
    /**
     * @function
     * Renders the control
     */
    render(): JSX.Element;
}
