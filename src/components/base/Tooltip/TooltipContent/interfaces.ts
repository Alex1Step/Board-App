export interface ITooltipContent {
    link: string;
    proj: string;
    loadThisBoard: (proj: string) => void;
    deleteCurrentProject?: (proj: string) => void;
}
