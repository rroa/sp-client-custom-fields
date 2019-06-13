/**
 * @file PropertyFieldDateTimePickerHost.tsx
 * Renders the controls for PropertyFieldDateTimePicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldDateTimePickerPropsInternal } from './PropertyFieldDateTimePicker';
/**
 * @interface
 * PropertyFieldDateTimePickerHost properties interface
 *
 */
export interface IPropertyFieldDateTimePickerHostProps extends IPropertyFieldDateTimePickerPropsInternal {
}
export interface IPropertyFieldDateTimePickerHostPropsState {
    day?: Date;
    hours?: number;
    minutes?: number;
    seconds?: number;
    errorMessage?: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldDateTimePicker component
 */
export default class PropertyFieldDateTimePickerHost extends React.Component<IPropertyFieldDateTimePickerHostProps, IPropertyFieldDateTimePickerHostPropsState> {
    private latestValidateValue;
    private async;
    private delayedValidate;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldDateTimePickerHostProps);
    /**
     * @function
     * Function called when the DatePicker Office UI Fabric component selected date changed
     */
    private onSelectDate;
    private dropdownHoursChanged;
    private dropdownMinutesChanged;
    private dropdownSecondsChanged;
    private saveDate;
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
