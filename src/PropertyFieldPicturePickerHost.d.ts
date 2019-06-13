/**
 * @file PropertyFieldPicturePickerHost.tsx
 * Renders the controls for PropertyFieldPicturePicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldPicturePickerPropsInternal } from './PropertyFieldPicturePicker';
/**
 * @interface
 * PropertyFieldPicturePickerHost properties interface
 *
 */
export interface IPropertyFieldPicturePickerHostProps extends IPropertyFieldPicturePickerPropsInternal {
}
export interface IPropertyFieldPicturePickerHostState {
    openPanel?: boolean;
    openRecent?: boolean;
    openSite?: boolean;
    openUpload?: boolean;
    recentImages?: string[];
    selectedImage: string;
    errorMessage?: string;
}
/**
 * @class
 * Renders the controls for PropertyFieldPicturePicker component
 */
export default class PropertyFieldPicturePickerHost extends React.Component<IPropertyFieldPicturePickerHostProps, IPropertyFieldPicturePickerHostState> {
    private latestValidateValue;
    private async;
    private delayedValidate;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldPicturePickerHostProps);
    /**
     * @function
     * Save the image value
     *
     */
    private saveImageProperty;
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
     * Click on erase button
     *
     */
    private onEraseButton;
    /**
     * @function
     * Open the panel
     *
     */
    private onOpenPanel;
    /**
     * @function
     * The text field value changed
     *
     */
    private onTextFieldChanged;
    /**
    * @function
    * Close the panel
    *
    */
    private onClosePanel;
    private onClickRecent;
    /**
    * @function
    * Intercepts the iframe onedrive messages
    *
    */
    private handleIframeData;
    /**
    * @function
    * When component is mount, attach the iframe event watcher
    *
    */
    componentDidMount(): void;
    /**
    * @function
    * Releases the watcher
    *
    */
    componentWillUnmount(): void;
    private onClickSite;
    private onClickUpload;
    /**
     * @function
     * Renders the controls
     */
    render(): JSX.Element;
}
