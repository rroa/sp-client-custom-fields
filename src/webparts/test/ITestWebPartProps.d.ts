import { IPropertyFieldPeople } from '../../PropertyFieldPeoplePicker';
import { IPropertyFieldGroup } from '../../PropertyFieldGroupPicker';
import { IPropertyFieldDimension } from '../../PropertyFieldDimensionPicker';
import { IPropertyFieldTag } from '../../PropertyFieldTagPicker';
import { ISPTermSets } from '../../PropertyFieldTermSetPicker';
export interface ITestWebPartProps {
    description: string;
    color: string;
    miniColor: string;
    date: string;
    date2: string;
    datetime: string;
    people: IPropertyFieldPeople[];
    groups: IPropertyFieldGroup[];
    list: string;
    listsCollection: string[];
    folder: string;
    password: string;
    numeric: number;
    font: string;
    fontSize: string;
    phone: string;
    maskedInput: string;
    geolocation: string;
    picture: string;
    icon: string;
    document: string;
    displayMode: string;
    customList: any[];
    query: string;
    align: string;
    dropDownSelect: string[];
    richTextBox: string;
    sliderRange: string;
    dimension: IPropertyFieldDimension;
    sortableList: string[];
    treeView: string[];
    dropDownTreeView: string[];
    tags: IPropertyFieldTag[];
    starRating: number;
    autoSuggest: string;
    searchProperties: string[];
    officeVideo: string;
    termSets: ISPTermSets;
}