export interface IAssignee {
    name: string;
    email: string;
}

export interface IAdminPanel {
    setData: React.Dispatch<React.SetStateAction<boolean>>;
}
