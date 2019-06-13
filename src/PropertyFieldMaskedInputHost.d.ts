/**
 * @file PropertyFieldMaskedInputHost.tsx
 * Renders the controls for PropertyFieldMaskedInput component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldMaskedInputPropsInternal } from './PropertyFieldMaskedInput';
import 'office-ui-fabric-react/lib/components/TextField/TextField.scss';
/**
 * @interface
 * PropertyFieldMaskedInputHost properties interface
 *
 */
export interface IPropertyFieldMaskedInputHostProps extends IPropertyFieldMaskedInputPropsInternal {
}
/**
 * @class
 * Renders the controls for PropertyFieldMaskedInput component
 */
export default class PropertyFieldMaskedInputHost extends React.Component<IPropertyFieldMaskedInputHostProps, {}> {
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldMaskedInputHostProps);
    /**
     * @function
     * Function called when the the text changed
     */
    private onValueChanged;
    /**
     * @function
     * Renders the controls
     */
    render(): JSX.Element;
}
