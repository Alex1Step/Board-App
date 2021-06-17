interface Ilogin {
    password: string;
    username: string;
}

export interface Iprops {
    handler: (values: Ilogin) => void;
    textOnButton: string;
}