interface Ilink {
    to: string;
    text: string;
    exact: boolean;
}

export interface IpullProps {
    isOpen: boolean;
    onClick: () => void;
    listOfLinks: Ilink[];
}