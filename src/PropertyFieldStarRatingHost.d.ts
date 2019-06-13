/**
 * @file PropertyFieldStarRatingHost.tsx
 * Renders the controls for PropertyFieldStarRating component
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldStarRatingPropsInternal } from './PropertyFieldStarRating';
/**
 * @interface
 * PropertyFieldStarRatingHost properties interface
 *
 */
export interface IPropertyFieldStarRatingHostProps extends IPropertyFieldStarRatingPropsInternal {
}
export interface IPropertyFieldStarRatingState {
    currentValue?: number;
    errorMessage: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldStarRating component
 */
export default class PropertyFieldStarRatingHost extends React.Component<IPropertyFieldStarRatingHostProps, IPropertyFieldStarRatingState> {
    private async;
    private delayedValidate;
    private _key;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldStarRatingHostProps);
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
    private onStarClick;
    /**
     * @function
     * Renders the controls
     */
    render(): JSX.Element;
}
