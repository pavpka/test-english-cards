import { useEffect, useState } from "react";
import "./CardList.scss";
import Card from "./Card";
import { getCards } from "../api/cardsApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { set } from "../store/cardsSlice";

export default function CardList() {
    const dispatch = useAppDispatch();
    const storedCards = useAppSelector((state) => state.cards);
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setIsLoading(false);
            return;
        }

        if (!storedCards || storedCards.length === 0) {
            setIsLoading(true);
            getCards()
            .then((res) => {
                dispatch(set(res));
            })
            .catch((err) => {
                console.error(err);
                setIsError(true);
            })
            .finally(() => setIsLoading(false))
        } else setIsLoading(false);
    }, [isAuthenticated, storedCards, dispatch])

    return (
        <div className="card-list">
        {!isAuthenticated
        ?  (<div className="card-list__empty">авторизуйтесь для просмотра карточек</div>)
        : isLoading 
        ?  (<div className="card-list__loader">загрузка карточек...</div>)
        : isError
        ?  (<div className="card-list__empty">не удалось загрузить карточки</div>)
        : (storedCards.map((card) => <Card key={card.id} card = {card}/>))
        }   
    </div>
    )
}
