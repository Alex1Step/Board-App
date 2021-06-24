export interface IselectProps {
    type: string;
    options: string[];
    label: string;
    value: string;
    onChange: (event: { target: HTMLInputElement | HTMLSelectElement }) => void;
}
