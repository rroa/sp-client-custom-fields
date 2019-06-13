/**
 * @file PropertyFieldPhoneNumberHost.tsx
 * Renders the controls for PropertyFieldPhoneNumber component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldPhoneNumberPropsInternal } from './PropertyFieldPhoneNumber';
import 'office-ui-fabric-react/lib/components/TextField/TextField.scss';
/**
 * @interface
 * PropertyFieldPhoneNumberHost properties interface
 *
 */
export interface IPropertyFieldPhoneNumberHostProps extends IPropertyFieldPhoneNumberPropsInternal {
}
/**
 * @class
 * Renders the controls for PropertyFieldPhoneNumber component
 */
export default class PropertyFieldPhoneNumberHost extends React.Component<IPropertyFieldPhoneNumberHostProps, {}> {
    private patterns;
    /**
     * @function
     * Contructor
     */
    constructor(props: IPropertyFieldPhoneNumberHostProps);
    /**
     * @function
     * Function called when the the text changed
     */
    private onValueChanged;
    /**
     * @function
     * Renders the datepicker controls with Office UI  Fabric
     */
    render(): JSX.Element;
}
