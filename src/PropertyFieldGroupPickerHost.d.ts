/**
 * @file PropertyFieldGroupPickerHost.tsx
 * Renders the controls for PropertyFieldGroupPicker component
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 *
 */
import * as React from 'react';
import { IPropertyFieldGroupPickerPropsInternal } from './PropertyFieldGroupPicker';
import { IPropertyFieldGroup } from './PropertyFieldGroupPicker';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
/**
 * @interface
 * PropertyFieldGroupPickerHost properties interface
 *
 */
export interface IPropertyFieldGroupPickerHostProps extends IPropertyFieldGroupPickerPropsInternal {
}
/**
 * @interface
 * Defines the state of the component
 *
 */
export interface IPeoplePickerState {
    resultsPeople?: Array<IPropertyFieldGroup>;
    resultsPersonas?: Array<IPersonaProps>;
    errorMessage?: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldGroupPicker component
 */
export default class PropertyFieldGroupPickerHost extends React.Component<IPropertyFieldGroupPickerHostProps, IPeoplePickerState> {
    private searchService;
    private intialPersonas;
    private resultsPeople;
    private resultsPersonas;
    private selectedPeople;
    private selectedPersonas;
    private async;
    private delayedValidate;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldGroupPickerHostProps);
    /**
     * @function
     * Renders the PeoplePicker controls with Office UI  Fabric
     */
    render(): JSX.Element;
    /**
     * @function
     * A search field change occured
     */
    private onSearchFieldChanged;
    /**
     * @function
     * Remove the duplicates if property allowDuplicate equals false
     */
    private removeDuplicates;
    /**
     * @function
     * Creates the collection of initial personas from initial IPropertyFieldGroup collection
     */
    private createInitialPersonas;
    /**
     * @function
     * Generates a IPersonaProps object from a IPropertyFieldGroup object
     */
    private getPersonaFromGroup;
    /**
     * @function
     * Refreshes the web part properties
     */
    private refreshWebPartProperties;
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
     * Event raises when the user changed people from hte PeoplePicker component
     */
    private onItemChanged;
}
