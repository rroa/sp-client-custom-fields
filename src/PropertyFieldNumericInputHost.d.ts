/**
 * @file PropertyFieldNumericInputHost.tsx
 * Renders the controls for PropertyFieldNumericInput component
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldNumericInputPropsInternal } from './PropertyFieldNumericInput';
/**
 * @interface
 * PropertyFieldNumericInputHost properties interface
 *
 */
export interface IPropertyFieldNumericInputHostProps extends IPropertyFieldNumericInputPropsInternal {
}
export interface IPropertyFieldNumericInputState {
    currentValue?: number;
    errorMessage: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldNumericInput component
 */
export default class PropertyFieldNumericInputHost extends React.Component<IPropertyFieldNumericInputHostProps, IPropertyFieldNumericInputState> {
    private async;
    private delayedValidate;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldNumericInputHostProps);
    /**
     * @function
     * Function called when the component value changed
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
    /**
     * @function
     * Renders the controls
     */
    render(): JSX.Element;
}
