/**
 * @file PropertyFieldTreeViewHost.tsx
 * Renders the controls for PropertyFieldTreeView component
 *
 * @copyright 2017 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldTreeViewPropsInternal, ITreeViewNode } from './PropertyFieldTreeView';
/**
 * @interface
 * PropertyFieldTreeViewHost properties interface
 *
 */
export interface IPropertyFieldTreeViewHostProps extends IPropertyFieldTreeViewPropsInternal {
}
export interface IPropertyFieldTreeViewState {
    errorMessage: string;
    tree: ITreeViewNode[];
    activeNodes: ITreeViewNode[];
}
/**
 * @class
 * Renders the controls for PropertyFieldTreeView component
 */
export default class PropertyFieldTreeViewHost extends React.Component<IPropertyFieldTreeViewHostProps, IPropertyFieldTreeViewState> {
    private async;
    private delayedValidate;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldTreeViewHostProps);
    private getDefaultActiveNodesFromTree;
    /**
     * @function
     * Gets the list of activated nodes from the  selectedNodesIDs property
     * @param node
     */
    private getDefaultActiveNodes;
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
     * Gets the given node position in the active nodes collection
     * @param node
     */
    private getSelectedNodePosition;
    /**
     * @function
     * Renders the given node
     * @param node
     */
    private renderNode;
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
     * Handles tree changes
     * @param rootNode
     * @param index
     */
    private handleTreeChange;
    /**
     * @function
     * Renders the controls
     */
    render(): JSX.Element;
}
