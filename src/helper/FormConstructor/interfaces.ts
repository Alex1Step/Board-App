interface IFormSettings {
    className: string;
    formName: string;
    submit: (values: { [key: string]: string }) => void;
}

//TODO
// interface IRulesSettings {
// }

export interface ISelectOptions {
    value: string;
    text: string;
}

interface IItemsSettings {
    type: string;
    label: string;
    name: string;
    defaultValue?: string;
    optionsForSelect?: ISelectOptions[];
    dateFormat?: string;
    htmlType?: string;
    onChange?: () => void;
    checkBoxText?: string;
    defaultChecked?: boolean;
}

export interface IFormConstructor {
    formSettings: IFormSettings;
    itemsSettings: IItemsSettings[];
}
