/**
 * @file PropertyFieldDropDownTreeViewHost.tsx
 * Renders the controls for PropertyFieldDropDownTreeView component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldDropDownTreeViewPropsInternal, IDropDownTreeViewNode } from './PropertyFieldDropDownTreeView';
/**
 * @interface
 * PropertyFieldDropDownTreeViewHost properties interface
 *
 */
export interface IPropertyFieldDropDownTreeViewHostProps extends IPropertyFieldDropDownTreeViewPropsInternal {
}
/**
 * @interface
 * PropertyFieldDropDownTreeViewHost state interface
 *
 */
export interface IPropertyFieldDropDownTreeViewHostState {
    isOpen: boolean;
    isHoverDropdown?: boolean;
    errorMessage?: string;
    tree: IDropDownTreeViewNode[];
    activeNodes: IDropDownTreeViewNode[];
}
/**
 * @class
 * Renders the controls for PropertyFieldDropDownTreeView component
 */
export default class PropertyFieldDropDownTreeViewHost extends React.Component<IPropertyFieldDropDownTreeViewHostProps, IPropertyFieldDropDownTreeViewHostState> {
    private async;
    private delayedValidate;
    private _key;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldDropDownTreeViewHostProps);
    private getDefaultActiveNodesFromTree;
    /**
     * @function
     * Gets the list of activated nodes from the  selectedNodesIDs property
     * @param node
     */
    private getDefaultActiveNodes;
    /**
     * @function
     * Gets the given node position in the active nodes collection
     * @param node
     */
    private getSelectedNodePosition;
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
     * Function to open the dialog
     */
    private onOpenDialog;
    /**
     * @function
     * Mouse is hover the fontpicker
     */
    private mouseEnterDropDown;
    /**
     * @function
     * Mouse is leaving the fontpicker
     */
    private mouseLeaveDropDown;
    /**
     * clicks on a node
     * @param node
     */
    private onClickNode;
    /**
     * Saves the selected nodes
     */
    private saveSelectedNodes;
    /**
     * @function
     * Renders the given node
     * @param node
     */
    private renderNode;
    /**
     * Handles tree changes
     * @param rootNode
     * @param index
     */
    private handleTreeChange;
    /**
     * @function
     * Renders the control
     */
    render(): JSX.Element;
}
