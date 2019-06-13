/**
 * @file PropertyFieldOfficeVideoPickerHost.tsx
 * Renders the controls for PropertyFieldOfficeVideoPicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldOfficeVideoPickerPropsInternal } from './PropertyFieldOfficeVideoPicker';
/**
 * @interface
 * PropertyFieldOfficeVideoPickerHost properties interface
 *
 */
export interface IPropertyFieldOfficeVideoPickerHostProps extends IPropertyFieldOfficeVideoPickerPropsInternal {
}
export interface IPropertyFieldOfficeVideoPickerHostState {
    openPanel?: boolean;
    openRecent?: boolean;
    openSite?: boolean;
    openUpload?: boolean;
    recentImages?: string[];
    selectedVideo: string;
    errorMessage?: string;
    iframeLoaded: boolean;
}
/**
 * @class
 * Renders the controls for PropertyFieldOfficeVideoPicker component
 */
export default class PropertyFieldOfficeVideoPickerHost extends React.Component<IPropertyFieldOfficeVideoPickerHostProps, IPropertyFieldOfficeVideoPickerHostState> {
    private latestValidateValue;
    private async;
    private delayedValidate;
    private guid;
    /**
     * @function
     * Constructor
     */
    constructor(props: IPropertyFieldOfficeVideoPickerHostProps);
    /**
     * @function
     * Save the image value
     *
     */
    private saveVideoProperty;
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
    componentDidUpdate(prevProps: any, prevState: any, prevContext: any): void;
    private iFrameLoaded;
    private iFrameValidation;
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
    /**
     * @function
     * Renders the controls
     */
    render(): JSX.Element;
}
