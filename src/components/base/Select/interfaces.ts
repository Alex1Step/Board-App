export interface IselectProps {
    type: string;
    options: string[];
    labelForOptions: string[];
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}
