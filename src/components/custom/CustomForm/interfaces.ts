interface IFormSettings<T> {
    submit: (values: T) => void;
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

export interface IFormConstructor<T, U> {
    formSettings: IFormSettings<T>;
    itemsSettings: IItemsSettings[];
    validation?: U;
}
