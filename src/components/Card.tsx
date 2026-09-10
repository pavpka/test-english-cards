import { useState } from "react";
import { pick, type CardsState } from "../store/cardsSlice";
import { useAppDispatch } from "../store/hooks";

export default function Card({card} : {card : CardsState}) {
    const dispatch = useAppDispatch();
    const [isPicked, setPicked] = useState(card.picked)
    const handleClick = (id: number) => {
        console.log(id);
        dispatch(pick({id: id}));
        setPicked((prev) => !prev);
    }

    return (
        <div style={{border: '1px solid white'}}>
            {isPicked ? (<div>translation: {card.translation}</div>) : ( <>
                <div>word: {card.word}</div>
                <div>{card.pathOfSpeech}</div>
                <div>example: {card.example}</div>
                </>)}
            <button onClick={() => handleClick(card.id)}>{isPicked ? "GET BACK" : "LEARN MORE"}</button>
        </div>
    )
}