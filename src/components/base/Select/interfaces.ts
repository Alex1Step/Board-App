export interface IselectProps {
    type: string;
    label: string;
    value: string;
    onChange: (event: { target: HTMLInputElement | HTMLSelectElement }) => void;
}
