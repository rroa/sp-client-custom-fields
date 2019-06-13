/**
 * @file PropertyFieldMapPickerHost.tsx
 * Renders the controls for PropertyFieldMapPicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldMapPickerPropsInternal } from './PropertyFieldMapPicker';
import 'office-ui-fabric-react/lib/components/TextField/TextField.scss';
/**
 * @interface
 * PropertyFieldMapPickerHost properties interface
 *
 */
export interface IPropertyFieldMapPickerHostProps extends IPropertyFieldMapPickerPropsInternal {
}
export interface IPropertyFieldMapPickerHostState {
    longitude: string;
    latitude: string;
    isOpen: boolean;
    errorMessage?: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldMapPicker component
 */
export default class PropertyFieldMapPickerHost extends React.Component<IPropertyFieldMapPickerHostProps, IPropertyFieldMapPickerHostState> {
    private latestValidateValue;
    private async;
    private delayedValidate;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldMapPickerHostProps);
    private onClickChevron;
    private onGetCurrentLocation;
    private showPosition;
    private onLongitudeChange;
    private onLatitudeChange;
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
