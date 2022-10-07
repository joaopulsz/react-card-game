const Player = ({card, stack}) => {
    return card.image ?  ( 
        <div>
            <img src={card.image} alt='card'></img>
            <p>Your stack: {stack}</p>
        </div>
    ) : (<div>
    <p>Your stack: {stack}</p>
    </div>
    )
}

export default Player;