import { useEffect, useState } from "react";
import Computer from "../components/Computer";
import GameForm from "../components/GameForm";
import Player from "../components/Player";

const GameContainer = () => {

    const [deckId, setDeckId] = useState('');

    useEffect(() => {
        const fetchDeck = async () => {
            const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            const deckData = await response.json();
            setDeckId(deckData.deck_id);
        }
        fetchDeck();
    }, []);

    const fetchCards = async () => {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
        const cardsData = await response.json();
        return cardsData.cards;
    }

    const [playerCard, setPlayerCard] = useState({});
    const [computerCard, setComputerCard] = useState({});

    const newHand = () => {
        const cards = fetchCards();
        setPlayerCard(cards[0]);
        setComputerCard(cards[1]);
    }

    const [playerStack, setPlayerStack] = useState(500);
    const [computerStack, setComputerStack] = useState(500);

    const newBet = (bet) => {
        if(parseInt(playerCard.value) > parseInt(computerCard.value)) {
            setPlayerStack(playerStack + bet);
            setComputerStack(computerStack - bet);
        } else {
            setPlayerStack(playerStack - bet);
            setComputerStack(computerStack + bet);
        }
    }

    return (
        <div>
            <Computer card={computerCard} stack={computerStack}/>
            <Player card={playerCard} stack={playerStack}/>
            <GameForm drawCards={newHand} newBet={newBet}/>
        </div>
    )

}

export default GameContainer;