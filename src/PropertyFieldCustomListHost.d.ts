/**
 * @file PropertyFieldCustomListHost.tsx
 * Renders the controls for PropertyFieldCustomList component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldCustomListPropsInternal } from './PropertyFieldCustomList';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';
/**
 * @interface
 * PropertyFieldCustomListHost properties interface
 *
 */
export interface IPropertyFieldCustomListHostProps extends IPropertyFieldCustomListPropsInternal {
}
export interface IPropertyFieldCustomListHostState {
    data?: any[];
    openPanel?: boolean;
    openListView?: boolean;
    openListAdd?: boolean;
    openListEdit?: boolean;
    selectedIndex?: number;
    hoverColor?: string;
    deleteOpen?: boolean;
    editOpen?: boolean;
    mandatoryOpen?: boolean;
    missingField?: string;
    items: any[];
    columns: any[];
    listKey: string;
    selection: Selection;
}
/**
 * @class
 * Renders the controls for PropertyFieldCustomList component
 */
export default class PropertyFieldCustomListHost extends React.Component<IPropertyFieldCustomListHostProps, IPropertyFieldCustomListHostState> {
    private _key;
    /**
     * @function
     * Contructor
     */
    constructor(props: IPropertyFieldCustomListHostProps);
    private initItems;
    private initColumns;
    /**
     * @function
     * Function called when the ColorPicker Office UI Fabric component selected color changed
     */
    private saveWebPart;
    private onOpenPanel;
    private onCancel;
    private onClickAddItem;
    private onClickDeleteItem;
    private onClickCancel;
    private onClickAdd;
    private onDismissDelete;
    private onClickMoveUp;
    private onClickMoveDown;
    private clickDelete;
    private onClickEdit;
    private onClickUpdate;
    private onPropertyChange;
    private onPropertyChangeJson;
    private onActiveItemChanged;
    /**
     * @function
     * Renders the datepicker controls with Office UI  Fabric
     */
    render(): JSX.Element;
}
