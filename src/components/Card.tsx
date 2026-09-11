import { useState } from "react";
import "./Card.scss";
import { pick, type CardsState } from "../store/cardsSlice";
import { useAppDispatch } from "../store/hooks";

export default function Card({card} : {card : CardsState}) {
    const dispatch = useAppDispatch();
    const [isPicked, setPicked] = useState(card.picked)
    const handleClick = (id: number) => {
        dispatch(pick({id: id}));
        setPicked((prev) => !prev);
    }

    return (
        <div className={`card${isPicked ? " card--picked" : ""}`}>
            <div className="card__inner">
                <div className="card__face card__face--front">
                    <div className="card__header">{card.wordOfTheDay && "Word of the Day"}</div>
                    <div className="card__word">{card.word}</div>
                    <div className="card__speech">{card.partOfSpeech}</div>
                    <div className="card__example">{card.example}</div>
                    <button className="card__button" onClick={() => handleClick(card.id)}>LEARN MORE</button>
                </div>
                <div className="card__face card__face--back">
                    <div className="card__translation">{card.translation}</div>
                    <button className="card__button" onClick={() => handleClick(card.id)}>GET BACK</button>
                </div>
            </div>
        </div>
    )
}
