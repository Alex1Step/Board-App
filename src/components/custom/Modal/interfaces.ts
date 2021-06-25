import { ReactElement } from "react";

export interface ImodalProps {
    visible: boolean;
    title: string;
    onClose: () => void;
    children: ReactElement;
}