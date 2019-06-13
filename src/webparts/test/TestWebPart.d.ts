import { BaseClientSideWebPart, IPropertyPaneConfiguration, IWebPartContext } from '@microsoft/sp-webpart-base';
import { Version } from '@microsoft/sp-core-library';
import { ITestWebPartProps } from './ITestWebPartProps';
export default class TestWebPart extends BaseClientSideWebPart<ITestWebPartProps> {
    constructor(context: IWebPartContext);
    render(): void;
    protected readonly disableReactivePropertyChanges: boolean;
    private formatDateIso;
    private testPropertyChanged;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
