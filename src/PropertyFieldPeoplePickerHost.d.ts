/**
 * @file PropertyFieldPeoplePickerHost.tsx
 * Renders the controls for PropertyFieldPeoplePicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
import * as React from 'react';
import { IPropertyFieldPeoplePickerPropsInternal } from './PropertyFieldPeoplePicker';
import { IPropertyFieldPeople } from './PropertyFieldPeoplePicker';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
/**
 * @interface
 * PropertyFieldPeoplePickerHost properties interface
 *
 */
export interface IPropertyFieldPeoplePickerHostProps extends IPropertyFieldPeoplePickerPropsInternal {
}
/**
 * @interface
 * Defines the state of the component
 *
 */
export interface IPeoplePickerState {
    resultsPeople?: Array<IPropertyFieldPeople>;
    resultsPersonas?: Array<IPersonaProps>;
    errorMessage?: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldPeoplePicker component
 */
export default class PropertyFieldPeoplePickerHost extends React.Component<IPropertyFieldPeoplePickerHostProps, IPeoplePickerState> {
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
    constructor(props: IPropertyFieldPeoplePickerHostProps);
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
     * Creates the collection of initial personas from initial IPropertyFieldPeople collection
     */
    private createInitialPersonas;
    /**
     * @function
     * Generates a IPersonaProps object from a IPropertyFieldPeople object
     */
    private getPersonaFromPeople;
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
    /**
     * @function
     * Generate a PersonaInitialsColor from the item position in the collection
     */
    private getRandomInitialsColor;
}
