/**
 * @file PropertyFieldFontPickerHost.tsx
 * Renders the controls for PropertyFieldFontPicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldFontPickerPropsInternal } from './PropertyFieldFontPicker';
/**
 * @interface
 * PropertyFieldFontPickerHost properties interface
 *
 */
export interface IPropertyFieldFontPickerHostProps extends IPropertyFieldFontPickerPropsInternal {
}
/**
 * @interface
 * PropertyFieldFontPickerHost state interface
 *
 */
export interface IPropertyFieldFontPickerHostState {
    isOpen: boolean;
    isHoverDropdown?: boolean;
    hoverFont?: string;
    selectedFont?: string;
    safeSelectedFont?: string;
    errorMessage?: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldFontPicker component
 */
export default class PropertyFieldFontPickerHost extends React.Component<IPropertyFieldFontPickerHostProps, IPropertyFieldFontPickerHostState> {
    /**
     * @var
     * Defines the font series
     */
    private fonts;
    private latestValidateValue;
    private async;
    private delayedValidate;
    private _key;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldFontPickerHostProps);
    /**
     * @function
     * Function to refresh the Web Part properties
     */
    private changeSelectedFont;
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
    /**
     * @function
     * User clicked on a font
     */
    private onClickFont;
    /**
     * @function
     * Gets a safe font value from a font name
     */
    private getSafeFont;
    /**
     * @function
     * The font dropdown selected value changed (used when the previewFont property equals false)
     */
    private onFontDropdownChanged;
    /**
     * @function
     * Renders the control
     */
    render(): JSX.Element;
}
