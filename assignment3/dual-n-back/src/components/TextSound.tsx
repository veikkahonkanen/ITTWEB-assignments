import { useEffect, useState } from "react";

export type TextSound = "C" | "H" | "K" | "L" | "Q" | "S" | "R" | "T" | null;
interface TextSoundProps {
    text: TextSound;
    id: number;
}
export const TextSound = ({ text, id }: TextSoundProps) => {
    const [lastId, setLastId] = useState(-1);

    useEffect(() => {
        if (text != null && (lastId === -1 || lastId !== id)) {
            new Audio(process.env.PUBLIC_URL + `/audio/${text}.mp3`).play()
            setLastId(id);
        }
    }, [id])


    return (null);
}