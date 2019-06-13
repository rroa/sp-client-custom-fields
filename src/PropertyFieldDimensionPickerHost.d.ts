/**
 * @file PropertyFieldDimensionPickerHost.tsx
 * Renders the controls for PropertyFieldDimensionPicker component
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldDimensionPickerPropsInternal } from './PropertyFieldDimensionPicker';
/**
 * @interface
 * PropertyFieldDimensionPickerHost properties interface
 *
 */
export interface IPropertyFieldDimensionPickerHostProps extends IPropertyFieldDimensionPickerPropsInternal {
}
export interface IPropertyFieldDimensionPickerState {
    width?: number;
    height?: number;
    widthUnit?: string;
    heightUnit?: string;
    conserveRatio?: boolean;
    errorMessage: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldDimensionPicker component
 */
export default class PropertyFieldDimensionPickerHost extends React.Component<IPropertyFieldDimensionPickerHostProps, IPropertyFieldDimensionPickerState> {
    private async;
    private delayedValidate;
    private _key;
    private units;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldDimensionPickerHostProps);
    /**
     * @function
     * Function called to load data from the initialValue
     */
    private loadDefaultData;
    /**
     * @function
     * Function called when the width changed
     */
    private onWidthChanged;
    /**
     * @function
     * Function called when the height changed
     */
    private onHeightChanged;
    /**
     * @function
     * Function called when the width unit changed
     */
    private onWidthUnitChanged;
    /**
     * @function
     * Function called when the height unit changed
     */
    private onHeightUnitChanged;
    /**
     * @function
     * Function called when the ratio changed
     */
    private onRatioChanged;
    /**
     * @function
     * Saves the dimension
     */
    private saveDimension;
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
