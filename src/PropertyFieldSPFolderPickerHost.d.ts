/**
 * @file PropertyFieldSPFolderPickerHost.tsx
 * Renders the controls for PropertyFieldSPFolderPicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldSPFolderPickerPropsInternal } from './PropertyFieldSPFolderPicker';
/**
 * @interface
 * PropertyFieldSPFolderPickerHost properties interface
 *
 */
export interface IPropertyFieldSPFolderPickerHostProps extends IPropertyFieldSPFolderPickerPropsInternal {
}
/**
 * @interface
 * Interface to define the state of the rendering control
 *
 */
export interface IPropertyFieldSPFolderPickerHostState {
    isOpen: boolean;
    loading: boolean;
    currentSPFolder?: string;
    childrenFolders?: ISPFolders;
    selectedFolder?: string;
    confirmFolder?: string;
    errorMessage?: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldSPFolderPicker component
 */
export default class PropertyFieldSPFolderPickerHost extends React.Component<IPropertyFieldSPFolderPickerHostProps, IPropertyFieldSPFolderPickerHostState> {
    private currentPage;
    private pageItemCount;
    private latestValidateValue;
    private async;
    private delayedValidate;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldSPFolderPickerHostProps);
    /**
     * @function
     * Function called when the user wants to browse folders
     */
    private onBrowseClick;
    /**
     * @function
     * Function called when the user erase the current selection
     */
    private onClearSelectionClick;
    /**
     * @function
     * Loads the sub folders from the current
     */
    private LoadChildrenFolders;
    /**
     * @function
     * User clicks on the previous button
     */
    private onClickPrevious;
    /**
     * @function
     * User clicks on the next button
     */
    private onClickNext;
    /**
     * @function
     * User clicks on a sub folder
     */
    private onClickLink;
    /**
     * @function
     * User clicks on the go-to parent button
     */
    private onClickParent;
    /**
     * @function
     * Gets the parent folder server relative url from a folder url
     */
    private getParentFolder;
    /**
     * @function
     * Occurs when the selected folder changed
     */
    private onFolderChecked;
    /**
     * @function
     * User clicks on Select button
     */
    private onClickSelect;
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
     * User close the dialog wihout saving
     */
    private onDismiss;
    /**
     * @function
     * Renders the controls
     */
    render(): JSX.Element;
    /**
     * @function
     * Renders a list cell
     */
    private onRenderCell;
}
/**
 * @interface
 * Defines a collection of SharePoint folders
 */
export interface ISPFolders {
    value: ISPFolder[];
}
/**
 * @interface
 * Defines a SharePoint folder
 */
export interface ISPFolder {
    Name: string;
    ServerRelativeUrl: string;
}
