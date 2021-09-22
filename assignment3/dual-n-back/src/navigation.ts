import { ListAlt, ShowChart, Sports, SportsEsports, Lock } from "@material-ui/icons";
import { ReactComponentElement } from "react";

export interface NavigationItem{
    name: string;
    url : string;
    icon: any;
}

export const navigation: NavigationItem[] = [
    {
        name: "Play",
        url: "play",
        icon: SportsEsports
    },
    {
        name: "Scores",
        url: "scores",
        icon: ListAlt
    },
]