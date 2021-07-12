interface IFormSettings {
    submit: (values: any) => void;
}

export interface ISelectOptions {
    value: string;
    label: string;
}

interface IItemsSettings {
    type: string;
    label: string;
    name: string;
    inputType?: string;
    defaultValue?: string;
    optionsForSelect?: ISelectOptions[];
    dateFormat?: string;
    htmlType?: string;
}

export interface IFormConstructor {
    formSettings: IFormSettings;
    itemsSettings: IItemsSettings[];
    validation?: any;
}
