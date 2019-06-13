/**
 * @file PropertyFieldDatePickerHost.tsx
 * Renders the controls for PropertyFieldDatePicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldDatePickerPropsInternal } from './PropertyFieldDatePicker';
/**
 * @interface
 * PropertyFieldDatePickerHost properties interface
 *
 */
export interface IPropertyFieldDatePickerHostProps extends IPropertyFieldDatePickerPropsInternal {
}
export interface IPropertyFieldDatePickerHostState {
    date?: string;
    errorMessage?: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldDatePicker component
 */
export default class PropertyFieldDatePickerHost extends React.Component<IPropertyFieldDatePickerHostProps, IPropertyFieldDatePickerHostState> {
    private latestValidateValue;
    private async;
    private delayedValidate;
    /**
     * @function
     * Contructor
     */
    constructor(props: IPropertyFieldDatePickerHostProps);
    /**
     * @function
     * Function called when the DatePicker Office UI Fabric component selected date changed
     */
    private onSelectDate;
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
