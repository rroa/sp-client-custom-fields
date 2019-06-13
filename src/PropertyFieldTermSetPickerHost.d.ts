/**
 * @file PropertyFieldTermSetPickerHost.tsx
 * Renders the controls for PropertyFieldTermSetPicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
import * as React from 'react';
import { IPropertyFieldTermSetPickerPropsInternal, ISPTermStores, ISPTermSets } from './PropertyFieldTermSetPicker';
/**
 * @interface
 * PropertyFieldTermSetPickerHost properties interface
 *
 */
export interface IPropertyFieldTermSetPickerHostProps extends IPropertyFieldTermSetPickerPropsInternal {
}
/**
 * @interface
 * PropertyFieldTermSetPickerHost state interface
 *
 */
export interface IPropertyFieldFontPickerHostState {
    termStores: ISPTermStores;
    errorMessage?: string;
    openPanel: boolean;
    loaded: boolean;
    activeNodes: ISPTermSets;
}
/**
 * @class
 * Renders the controls for PropertyFieldTermSetPicker component
 */
export default class PropertyFieldTermSetPickerHost extends React.Component<IPropertyFieldTermSetPickerHostProps, IPropertyFieldFontPickerHostState> {
    private async;
    private delayedValidate;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldTermSetPickerHostProps);
    /**
     * @function
     * Loads the list from SharePoint current web site
     */
    private loadTermStores;
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
     * Open the right Panel
     */
    private onOpenPanel;
    /**
     * @function
     * Close the panel
     */
    private onClosePanel;
    /**
     * clicks on a node
     * @param node
     */
    private onClickNode;
    /**
     * @function
     * Gets the given node position in the active nodes collection
     * @param node
     */
    private getSelectedNodePosition;
    /**
     * @function
     * Called when the component will unmount
     */
    componentWillUnmount(): void;
    /**
     * @function
     * Renders the given node
     * @param node
     */
    private renderNode;
    /**
     * @function
     * Renders the SPListpicker controls with Office UI  Fabric
     */
    render(): JSX.Element;
}
