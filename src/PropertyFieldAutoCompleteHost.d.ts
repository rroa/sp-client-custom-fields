/**
 * @file PropertyFieldAutoCompleteHost.tsx
 * Renders the controls for PropertyFieldAutoComplete component
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldAutoCompletePropsInternal } from './PropertyFieldAutoComplete';
/**
 * @interface
 * PropertyFieldAutoCompleteHost properties interface
 *
 */
export interface IPropertyFieldAutoCompleteHostProps extends IPropertyFieldAutoCompletePropsInternal {
}
export interface IPropertyFieldAutoCompleteState {
    currentValue?: string;
    shortCurrentValue?: string;
    suggestions: string[];
    isOpen: boolean;
    hover: string;
    keyPosition: number;
    isHoverDropdown: boolean;
    errorMessage: string;
    guid: string;
    shouldAutoComplete: boolean;
    scrollPosition: number;
}
/**
 * @class
 * Renders the controls for PropertyFieldAutoComplete component
 */
export default class PropertyFieldAutoCompleteHost extends React.Component<IPropertyFieldAutoCompleteHostProps, IPropertyFieldAutoCompleteState> {
    private async;
    private delayedValidate;
    private input;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldAutoCompleteHostProps);
    /**
     * @function
     * Function called when the component value changed
     */
    private onValueChanged;
    componentDidUpdate(prevProps: IPropertyFieldAutoCompleteHostProps, prevState: IPropertyFieldAutoCompleteState, prevContext: any): void;
    private getSuggestions;
    private onInputBlur;
    private onInputKeyPress;
    private onInputKeyDown;
    private automaticScroll;
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
    private onClickItem;
    private onClickInput;
    /**
     * @function
     * Renders the controls
     */
    render(): JSX.Element;
}
