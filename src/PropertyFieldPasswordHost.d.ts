/**
 * @file PropertyFieldPasswordHost.tsx
 * Renders the controls for PropertyFieldPassword component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldPasswordPropsInternal } from './PropertyFieldPassword';
/**
 * @interface
 * PropertyFieldPasswordHost properties interface
 *
 */
export interface IPropertyFieldPasswordHostProps extends IPropertyFieldPasswordPropsInternal {
}
export interface IPropertyFieldPasswordState {
    currentValue?: string;
    errorMessage: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldPassword component
 */
export default class PropertyFieldPasswordHost extends React.Component<IPropertyFieldPasswordHostProps, IPropertyFieldPasswordState> {
    private latestValidateValue;
    private async;
    private delayedValidate;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldPasswordHostProps);
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
