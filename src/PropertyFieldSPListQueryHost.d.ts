/**
 * @file PropertyFieldSPListQueryHost.tsx
 * Renders the controls for PropertyFieldSPListQuery component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
import * as React from 'react';
import { IPropertyFieldSPListQueryPropsInternal } from './PropertyFieldSPListQuery';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
/**
 * @interface
 * PropertyFieldSPListQueryHost properties interface
 *
 */
export interface IPropertyFieldSPListQueryHostProps extends IPropertyFieldSPListQueryPropsInternal {
}
export interface IFilter {
    field?: string;
    operator?: string;
    value?: string;
}
export interface IPropertyFieldSPListQueryHostState {
    lists: IDropdownOption[];
    fields: IDropdownOption[];
    arranged: IDropdownOption[];
    selectedList?: string;
    selectedField?: string;
    selectedArrange?: string;
    max?: number;
    operators?: IDropdownOption[];
    filters?: IFilter[];
    errorMessage?: string;
    loadedList: boolean;
    loadedFields: boolean;
}
/**
 * @class
 * Renders the controls for PropertyFieldSPListQuery component
 */
export default class PropertyFieldSPListQueryHost extends React.Component<IPropertyFieldSPListQueryHostProps, IPropertyFieldSPListQueryHostState> {
    private latestValidateValue;
    private async;
    private delayedValidate;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldSPListQueryHostProps);
    private loadDefaultData;
    /**
     * @function
     * Loads the list from SharePoint current web site
     */
    private loadLists;
    private loadFields;
    private saveState;
    private saveQuery;
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
     * Raises when a list has been selected
     */
    private onChangedList;
    private onChangedField;
    private onChangedArranged;
    private onChangedMax;
    private onClickAddFilter;
    private onClickRemoveFilter;
    private onChangedFilterField;
    private onChangedFilterOperator;
    private onChangedFilterValue;
    /**
     * @function
     * Renders the controls
     */
    render(): JSX.Element;
}
