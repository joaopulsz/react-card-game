import { useEffect, useState } from "react";

const GameContainer = () => {

    let deckId;

    useEffect(() => {
        const fetchDeck = async () => {
            const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            const deckData = await response.json();
            deckId = deckData.deck_id;
        }
        fetchDeck();
    }, []);

    const getCards = async () => {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
        const cardsData = await response.json();
        return cardsData.cards;
    }

    const [playerCard, setPlayerCard] = useState({});
    const [computerCard, setComputerCard] = useState({});

    const newHand = () => {
        const cards = getCards();
        setPlayerCard(cards[0]);
        setComputerCard(cards[1]);
    }

    

}

export default GameContainer;