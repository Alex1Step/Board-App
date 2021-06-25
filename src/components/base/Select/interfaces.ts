export interface IselectProps {
    type: string;
    options: string[];
    labelForOptions: string[];
    label: string;
    value: string;
    onChange: (event: { target: HTMLInputElement | HTMLSelectElement }) => void;
}
