import { useEffect, useState } from "react";
import Computer from "../components/Computer";
import GameForm from "../components/GameForm";
import Player from "../components/Player";

const GameContainer = () => {

    const [deckId, setDeckId] = useState('');

    useEffect(() => {
        const fetchDeck = async () => {
            const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?cards=2H,2S,2C,2D,3H,3S,3C,3D,4H,4S,4C,4D,5H,5S,5C,5D,6H,6S,6C,6D,7H,7S,7C,7D,8H,8S,8C,8D,9H,9S,9C,9D,10H,10S,10C,10D");
            const deckData = await response.json();
            setDeckId(deckData.deck_id);
        }
        fetchDeck();
    }, []);

    const [playerCard, setPlayerCard] = useState({});
    const [computerCard, setComputerCard] = useState({});
    const [playerStack, setPlayerStack] = useState(500);
    const [computerStack, setComputerStack] = useState(500);

    const handleBetAndNewHand = async (bet) => {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
        const cardsData = await response.json();
        const cards = await cardsData.cards;
        
        setPlayerCard(cards[0]);
        setComputerCard(cards[1]);

        const player = cards[0];
        const comp = cards[1];

        if (parseInt(player.value) > parseInt(comp.value)) {
            setPlayerStack(playerStack + parseInt(bet));
            setComputerStack(computerStack - parseInt(bet));
        } else if (parseInt(player.value) === parseInt(comp.value)) {
            return;
        } else {
            setPlayerStack(playerStack - parseInt(bet));
            setComputerStack(computerStack + parseInt(bet));
        }

    }

    return playerStack <= 0 || computerStack <= 0 ? (
        <main>
            <h2>GAME OVER!</h2>
        </main>
    ) : (
        <main>
            <div id="game-div">
                <Computer card={computerCard} stack={computerStack}/>
                <Player card={playerCard} stack={playerStack}/>
            </div>
            <div id="betting-form">
                <GameForm newRound={handleBetAndNewHand}/>
            </div>
        </main>
    )

}

export default GameContainer;