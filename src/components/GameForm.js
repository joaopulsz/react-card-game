import { useState } from "react";

const GameForm = ({drawCards, newRound}) => {

    const [bet, setBet] = useState(0);

    const handleBetChange = (e) => {
        setBet(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault();
        newRound(bet);
    }

    return (
        <form>
            <label htmlFor="bet">Bet:</label>
            <input type="text" name="bet" value={bet} onChange={handleBetChange} placeholder="Enter bet amount"></input>

            <button type="submit" onClick={handleClick}>Place bet!</button>
        </form>  
    )

}

export default GameForm;