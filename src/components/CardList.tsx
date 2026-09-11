import { useEffect, useState } from "react";
import "./CardList.scss";
import Card from "./Card";
import { getCards} from "../api/cardsApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { set } from "../store/cardsSlice";

export default function CardList() {
    const dispatch = useAppDispatch();
    const storedCards = useAppSelector((state) => state.cards);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!storedCards || storedCards.length === 0) {
            getCards()
            .then((res) => {
                dispatch(set(res));
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false))
        } else setIsLoading(false);
    }, [storedCards, dispatch])

    return (
        <div className="card-list">
        {isLoading 
        ?  (<div className="card-list__loader">card list is loading...</div>)
        : (storedCards.map((card) => <Card key={card.id} card = {card}/>))
        }   
        </div>
    )
}