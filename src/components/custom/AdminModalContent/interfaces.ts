export interface IAdminModalContent {
    isModal: boolean;
    title: string;
    setProjectTitle: React.Dispatch<React.SetStateAction<string>>;
    addAssignee: (values: { name: string; email: string }) => void;
}
