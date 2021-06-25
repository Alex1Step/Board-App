export interface IinputProps {
    type: string;
    label: string;
    value: string;
    onChange: (event: { target: HTMLInputElement | HTMLSelectElement }) => void;
    withoutSubstitution?: boolean;
}
