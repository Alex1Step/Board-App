export interface IinputProps {
    withWrap?: boolean;
    type: string;
    label: string;
    value: string;
    onChange: (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) => void;
    withoutSubstitution?: boolean;
}
